"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { database } from "../lib/firebase";
import { ref, onValue, update, push, get, increment } from "firebase/database";
import { TARGET_LOCATIONS, CLUSTER_NAMES, CLUSTER_CLUES, POI_CLUES, TargetLocation } from "../lib/locations";

// Haversine formula to calculate distance between two coordinates in meters
function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const toRadians = (deg: number): number => (deg * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// (TargetLocation, TARGET_LOCATIONS, CLUSTER_NAMES, CLUSTER_CLUES imported from lib/locations.ts)

const WIN_RADIUS = 15; // Success within 15 meters

type MissionStatus = 'pending' | 'approved' | 'rejected' | null;

// PIN Mapping
const TEAM_PINS: Record<number, string> = {
  1: "67676767",
  2: "verystrongpassword",
  3: "iforgotmypassword",
  4: "RyanCoolestEP",
  5: "JiongXiHenHandsome",
};

export default function Home() {
  // Authentication State
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [pendingTeam, setPendingTeam] = useState<number | null>(null);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);
  
  // Game State
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [globalActiveCluster, setGlobalActiveCluster] = useState<number>(1);
  const [completedPOIs, setCompletedPOIs] = useState<number[]>([]);
  const [missionStatus, setMissionStatus] = useState<MissionStatus>(null);

  // Tracking State
  const [latestCoords, setLatestCoords] = useState<{lat: number, lng: number} | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Clue Economy State
  const [activeTab, setActiveTab] = useState<'tracker' | 'inventory'>('tracker');
  const [unlockedClues, setUnlockedClues] = useState<Record<string, boolean>>({});
  const [revealedClue, setRevealedClue] = useState<{ text: string } | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const lastGpsUpdateRef = useRef<number>(0);

  // --- DERIVED STATE: Auto-Targeting ---
  const { activeTarget, minDistance, clusterTargets } = useMemo(() => {
    let target: TargetLocation | null = null;
    let distance: number | null = null;
    let targets: TargetLocation[] = [];

    if (selectedTeam !== null) {
      targets = TARGET_LOCATIONS.filter(t => t.cluster === globalActiveCluster);
      const uncompletedTargets = targets.filter(t => !completedPOIs.includes(t.id));

      if (uncompletedTargets.length > 0 && latestCoords) {
        let closest = uncompletedTargets[0];
        let closestDist = getDistanceInMeters(latestCoords.lat, latestCoords.lng, closest.lat, closest.lng);

        for (let i = 1; i < uncompletedTargets.length; i++) {
          const d = getDistanceInMeters(latestCoords.lat, latestCoords.lng, uncompletedTargets[i].lat, uncompletedTargets[i].lng);
          if (d < closestDist) {
            closest = uncompletedTargets[i];
            closestDist = d;
          }
        }

        target = closest;
        distance = closestDist;
      }
    }
    return { activeTarget: target, minDistance: distance, clusterTargets: targets };
  }, [selectedTeam, globalActiveCluster, completedPOIs, latestCoords]);

  const activeTargetId = activeTarget?.id || null;


  // --- FIREBASE LISTENERS ---
  
  // 1. Global Game State
  useEffect(() => {
    if (selectedTeam === null) return;
    const gameStateRef = ref(database, "gameState/activeCluster");
    const unsubscribe = onValue(gameStateRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setGlobalActiveCluster(val);
    });
    return () => unsubscribe();
  }, [selectedTeam]);

  // 2. Team Tokens & Completed POIs
  useEffect(() => {
    if (selectedTeam === null) return;
    
    // Tokens
    const teamTokensRef = ref(database, `teams/${selectedTeam}/token_count`);
    const unsubTokens = onValue(teamTokensRef, (snapshot) => {
      const data = snapshot.val();
      setTokenCount(data !== null ? data : 0);
    });

    // Completed POIs
    const completedRef = ref(database, `teams/${selectedTeam}/completedPOIs`);
    const unsubCompleted = onValue(completedRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (Array.isArray(data)) {
          setCompletedPOIs(data.filter(Boolean));
        } else {
          setCompletedPOIs(Object.values(data));
        }
      } else {
        setCompletedPOIs([]);
      }
    });

    return () => {
      unsubTokens();
      unsubCompleted();
    };
  }, [selectedTeam]);

  // 2b. Unlocked Clues
  useEffect(() => {
    if (selectedTeam === null) return;
    const cluesRef = ref(database, `teams/${selectedTeam}/unlockedClues`);
    const unsub = onValue(cluesRef, (snapshot) => {
      const data = snapshot.val();
      setUnlockedClues(data ? data : {});
    });
    return () => unsub();
  }, [selectedTeam]);

  // 3. Mission Status Queue
  useEffect(() => {
    if (selectedTeam === null || activeTargetId === null) {
      setMissionStatus(null);
      return;
    }

    const missionsRef = ref(database, 'missions');
    const unsubscribe = onValue(missionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Find missions for this team and POI
        const missions = Object.entries(data).map(([key, val]: [string, any]) => ({
          id: key,
          ...val
        }));
        
        const relevantMissions = missions.filter(m => 
          m.teamId === selectedTeam && 
          m.poiId === activeTargetId
        );

        if (relevantMissions.length > 0) {
          // Sort descending by timestamp
          relevantMissions.sort((a, b) => b.timestamp - a.timestamp);
          setMissionStatus(relevantMissions[0].status);
        } else {
          setMissionStatus(null);
        }
      } else {
        setMissionStatus(null);
      }
    });

    return () => unsubscribe();
  }, [selectedTeam, activeTargetId]);

  // 4. GPS Tracking Logic
  useEffect(() => {
    if (selectedTeam !== null) {
      if (!("geolocation" in navigator)) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          const now = Date.now();
          if (now - lastGpsUpdateRef.current < 1000) return; // Throttle: max 1 update/sec
          lastGpsUpdateRef.current = now;
          setLatestCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setError(null);
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [selectedTeam]);


  // --- ACTIONS ---

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingTeam && pinInput === TEAM_PINS[pendingTeam]) {
      setSelectedTeam(pendingTeam);
      setPendingTeam(null);
      setPinInput("");
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const submitMission = async () => {
    if (selectedTeam && activeTarget && minDistance !== null && minDistance <= WIN_RADIUS) {
      try {
        const missionsRef = ref(database, 'missions');
        await push(missionsRef, {
          teamId: selectedTeam,
          poiId: activeTarget.id,
          poiName: activeTarget.name,
          clusterId: globalActiveCluster,
          status: 'pending',
          timestamp: Date.now()
        });
      } catch (err) {
        console.error("Error submitting mission:", err);
      }
    }
  };

  const handleLogout = () => {
    setSelectedTeam(null);
    setLatestCoords(null);
    setActiveTab('tracker');
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Buy the clue for the nearest unclaimed POI in the active cluster
  const buyClue = useCallback(async () => {
    if (!selectedTeam || isBuying || tokenCount < 1) return;
    setIsBuying(true);
    try {
      // All POIs in this cluster that have a clue defined
      const clusterPOIs = TARGET_LOCATIONS.filter(
        t => t.cluster === globalActiveCluster && POI_CLUES[t.id]
      );

      // Filter to those whose clue has NOT been unlocked yet
      const available = clusterPOIs.filter(t => !unlockedClues[POI_CLUES[t.id].id]);

      if (available.length === 0) {
        // All clues already unlocked — do not deduct a token
        setIsBuying(false);
        return;
      }

      // Find the nearest available POI using current GPS position.
      // If GPS is unavailable, fall back to the first available POI.
      let targetPOI = available[0];
      if (latestCoords) {
        let minDist = getDistanceInMeters(
          latestCoords.lat, latestCoords.lng,
          available[0].lat, available[0].lng
        );
        for (let i = 1; i < available.length; i++) {
          const d = getDistanceInMeters(
            latestCoords.lat, latestCoords.lng,
            available[i].lat, available[i].lng
          );
          if (d < minDist) {
            minDist = d;
            targetPOI = available[i];
          }
        }

        // Movement-lock guard: find the overall nearest clueable POI
        // (regardless of unlock status). If that POI's clue is already
        // owned, the player hasn't moved — abort without spending a token.
        const overallNearest = clusterPOIs.reduce((nearest, poi) => {
          const dN = getDistanceInMeters(latestCoords.lat, latestCoords.lng, nearest.lat, nearest.lng);
          const dC = getDistanceInMeters(latestCoords.lat, latestCoords.lng, poi.lat, poi.lng);
          return dC < dN ? poi : nearest;
        });
        if (overallNearest.id !== targetPOI.id) {
          // Standing closest to a POI already owned — movement lock active
          setIsBuying(false);
          return;
        }
      }

      const clueForPOI = POI_CLUES[targetPOI.id];

      // Atomic Firebase update: deduct 1 token + save clue
      const teamRef = ref(database, `teams/${selectedTeam}`);
      await update(teamRef, {
        token_count: increment(-1),
        [`unlockedClues/${clueForPOI.id}`]: true,
      });

      // Open modal face-down — user must tap the card to flip it
      setRevealedClue({ text: clueForPOI.text });
      setIsCardFlipped(false);
    } catch (err) {
      console.error("Error buying clue:", err);
    } finally {
      setIsBuying(false);
    }
  }, [selectedTeam, isBuying, tokenCount, globalActiveCluster, unlockedClues, latestCoords]);

  // --- UI: LOGIN ---
  if (selectedTeam === null) {
    return (
      <main className="min-h-[100dvh] topo-bg relative flex flex-col items-center justify-center p-6 bg-forest-950 overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-800/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blaze-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full expedition-card p-8">
          {pendingTeam === null ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-forest-800 tracking-tight mb-2">
                  Select Team
                </h1>
                <p className="text-forest-600/70 font-medium">Choose your group to begin</p>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((teamId) => (
                  <button
                    key={teamId}
                    onClick={() => {
                      setPendingTeam(teamId);
                      setPinError(false);
                      setPinInput("");
                    }}
                    className="group w-full bg-forest-900/10 hover:bg-blaze-500/10 text-forest-800 font-semibold text-lg py-4 px-6 rounded-2xl transition-all duration-300 border border-forest-600/15 hover:border-blaze-500/40 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(255,111,26,0.1)]"
                  >
                    <span className="tracking-wide">Group {teamId}</span>
                    <span className="text-forest-600/40 group-hover:text-blaze-500 transition-colors duration-300 transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-forest-800 tracking-tight mb-2">
                  Group {pendingTeam}
                </h1>
                <p className="text-forest-600/70 font-medium">Enter your password</p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-6">
                <div>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    className={`w-full bg-forest-900/8 rounded-2xl text-center text-2xl text-forest-800 font-bold tracking-widest py-4 focus:outline-none transition-all duration-300 ${
                      pinError 
                        ? 'border-2 border-red-500/50 bg-red-50 placeholder:text-red-300/50' 
                        : 'border border-forest-600/20 focus:border-blaze-500/50 focus:bg-blaze-500/5 placeholder:text-forest-600/30'
                    }`}
                    placeholder="Password"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-red-600 text-sm font-medium mt-3">Incorrect password. Please try again.</p>
                  )}
                </div>

                <div className="flex space-x-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPendingTeam(null);
                      setPinInput("");
                      setPinError(false);
                    }}
                    className="flex-1 bg-forest-900/8 hover:bg-forest-900/15 text-forest-800 font-medium py-4 rounded-xl transition-all duration-300 border border-forest-600/15 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-blaze py-4 rounded-xl text-lg active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                    disabled={pinInput.length === 0}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    );
  }

  // --- UI: TRACKING ---
  
  // Dynamic Background and Glow Logic
  let bgGradient = "from-forest-950 to-forest-900"; 
  let glowColor = "bg-forest-600/20";
  let distanceAnimateClass = "";

  if (activeTarget && minDistance !== null) {
    if (minDistance > 1000) {
      bgGradient = "from-forest-950 to-forest-900";
      glowColor = "bg-emerald-700/20";
    } else if (minDistance > 500) {
      bgGradient = "from-forest-900 to-forest-950";
      glowColor = "bg-yellow-600/20";
    } else if (minDistance > WIN_RADIUS) {
      bgGradient = "from-forest-800 to-forest-950";
      glowColor = "bg-blaze-500/20";
    } else {
      bgGradient = "from-forest-800 to-forest-950";
      glowColor = "bg-emerald-500/30";
      distanceAnimateClass = "animate-pulse";
    }
  } else if (!activeTarget) {
     // Cluster Complete theme
     bgGradient = "from-forest-800 to-forest-950";
     glowColor = "bg-emerald-500/30";
  }

  return (
    <main className={`min-h-[100dvh] topo-bg relative flex flex-col items-center p-6 bg-gradient-to-br transition-colors duration-1000 overflow-hidden ${bgGradient}`}>
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ${glowColor}`}></div>

      {/* TOP STATUS BANNER (Game Master Lockdown) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
        <div className="bg-forest-900/90 backdrop-blur-xl border border-cream-200/20 rounded-2xl py-2 px-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center space-x-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blaze-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blaze-500"></span>
          </span>
          <span className="text-cream-100 font-bold text-sm tracking-widest uppercase">
            Active Phase: {CLUSTER_NAMES[globalActiveCluster]}
          </span>
        </div>
      </div>

      {/* Persistent Team & Tokens Header — z-[60] keeps it above tracker card & checklist */}
      <div className="fixed top-20 left-0 right-0 px-6 z-[60] flex justify-center">
        <div className="bg-forest-900/90 backdrop-blur-xl border border-cream-200/15 rounded-2xl py-3 px-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center space-x-5">
          <span className="text-cream-200 font-bold uppercase tracking-widest text-xs">
            Group {selectedTeam}
          </span>
          <div className="h-4 w-px bg-cream-200/15"></div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">🪙</span>
            <span className="text-blaze-400 font-extrabold text-lg tabular-nums tracking-tight">{tokenCount}</span>
          </div>
        </div>
      </div>

      {/* === TAB: TRACKER === */}
      {activeTab === 'tracker' && (
        <>
          {/* FLOATING CHECKLIST UI (Mobile: Top, Desktop: Side) */}
          <div className="relative z-40 mt-36 md:fixed md:top-32 md:right-8 w-full max-w-sm md:w-80 expedition-card p-5 flex-shrink-0">
            <h3 className="section-header mb-4">
              {CLUSTER_NAMES[globalActiveCluster]} POI
            </h3>
            <div className="space-y-3">
              {clusterTargets.map(poi => {
                const isCompleted = completedPOIs.includes(poi.id);
                const isActive = activeTarget?.id === poi.id;
                
                let statusClasses = "opacity-40 text-forest-700";
                let icon = "⚪";
                
                if (isCompleted) {
                  statusClasses = "line-through opacity-40 text-forest-600";
                  icon = "✅";
                } else if (isActive) {
                  statusClasses = "opacity-100 font-bold text-forest-900 bg-blaze-500/10 rounded-xl px-3 py-2 -ml-3 border border-blaze-500/30 shadow-[0_0_12px_rgba(255,111,26,0.08)]";
                  icon = "📍";
                }

                return (
                  <div key={poi.id} className={`flex items-center space-x-3 text-sm transition-all duration-500 ${statusClasses}`}>
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="truncate">{poi.name}</span>
                    {isActive && minDistance !== null && (
                      <span className="ml-auto flex-shrink-0 text-xs text-blaze-500 font-mono font-bold animate-pulse">
                        {minDistance}m
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRACKING CENTER CARD */}
          <div className="relative z-10 max-w-md w-full expedition-card p-8 mt-8 md:mt-auto md:mb-auto">
            
            {activeTarget ? (
              <div className="p-6 bg-forest-800/10 rounded-2xl border border-forest-600/15 text-center">
                <h2 className="text-blaze-500 text-xs uppercase tracking-[0.2em] font-extrabold mb-2 animate-pulse">
                  Active Target
                </h2>
                <p className={`text-2xl font-extrabold text-forest-900 tracking-tight`}>
                  {activeTarget.name}
                </p>
              </div>
            ) : (
              <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-center">
                <p className="text-2xl font-bold text-emerald-700 tracking-tight">{CLUSTER_NAMES[globalActiveCluster]} Complete!</p>
              </div>
            )}

            {activeTarget && minDistance !== null ? (
              <div className={`py-4 text-center ${distanceAnimateClass}`}>
                <p className="text-forest-600/60 text-xs uppercase tracking-[0.2em] font-extrabold mb-2">
                  Distance
                </p>
                <div className="flex items-baseline justify-center space-x-1">
                  <p className="text-7xl font-extrabold text-blaze-500 tracking-tighter tabular-nums drop-shadow-lg" style={{ minWidth: '3ch' }}>
                    {Math.round(minDistance)}
                  </p>
                  <span className="text-2xl font-bold text-forest-700 tabular-nums">
                    m
                  </span>
                </div>
              </div>
            ) : activeTarget ? (
              <div className="py-12 text-center flex flex-col items-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blaze-500 mb-4"></div>
                 <p className="text-forest-600 font-medium">Acquiring GPS...</p>
              </div>
            ) : (
              <div className="py-8 text-center">
                 <span className="text-6xl block mb-4">🎉</span>
                 <p className="text-forest-600 font-medium">Await further instructions from HQ.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold border border-red-200 mb-4">
                {error}
              </div>
            )}

            {/* CONTROLS */}
            <div className="space-y-4 mt-6">
              {activeTarget && minDistance !== null && (
                <>
                  {missionStatus === 'pending' ? (
                    <div className="w-full bg-blaze-500/15 text-blaze-600 border border-blaze-500/30 font-bold text-lg py-5 px-8 rounded-2xl flex justify-center items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blaze-500"></div>
                      <span>Waiting for Admin...</span>
                    </div>
                  ) : missionStatus === 'rejected' ? (
                    <button
                      onClick={submitMission}
                      disabled={minDistance > WIN_RADIUS}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-lg py-5 px-8 rounded-2xl active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:active:scale-100"
                    >
                      Mission Rejected! Try Again
                    </button>
                  ) : (
                    <button
                      onClick={submitMission}
                      disabled={minDistance > WIN_RADIUS}
                      className={`w-full font-bold text-lg py-5 px-8 rounded-2xl active:scale-95 transition-all duration-300 ${
                        minDistance <= WIN_RADIUS
                          ? "btn-blaze"
                          : "bg-forest-700/20 text-forest-600/50 border border-forest-600/15 cursor-not-allowed opacity-50 active:scale-100"
                      }`}
                    >
                      {minDistance <= WIN_RADIUS ? "Submit Mission to Boss" : `Get closer to interact (${minDistance}m)`}
                    </button>
                  )}
                </>
              )}

              {/* BUY CLUE BUTTON — Movement Lock System */}
              {(() => {
                // All POIs in this cluster that have a clue defined
                const clusterPOIs = TARGET_LOCATIONS.filter(
                  t => t.cluster === globalActiveCluster && POI_CLUES[t.id]
                );

                // Count how many clues are still locked (for allUnlocked fallback)
                const unlockedCount = clusterPOIs.filter(
                  t => unlockedClues[POI_CLUES[t.id].id]
                ).length;
                const allUnlocked = unlockedCount === clusterPOIs.length;

                // Find the physically nearest POI (with a clue) to the player right now.
                // This is the "movement lock" anchor — independent of mission completion.
                let nearestClueablePOI: typeof clusterPOIs[0] | null = null;
                if (latestCoords && clusterPOIs.length > 0) {
                  nearestClueablePOI = clusterPOIs.reduce((nearest, poi) => {
                    const dNearest = getDistanceInMeters(
                      latestCoords.lat, latestCoords.lng, nearest.lat, nearest.lng
                    );
                    const dCurrent = getDistanceInMeters(
                      latestCoords.lat, latestCoords.lng, poi.lat, poi.lng
                    );
                    return dCurrent < dNearest ? poi : nearest;
                  });
                }

                // Movement lock: nearest POI's clue already in inventory?
                const nearestAlreadyUnlocked =
                  nearestClueablePOI !== null &&
                  !!unlockedClues[POI_CLUES[nearestClueablePOI.id].id];

                // Button is locked if: no tokens, all done, currently buying,
                // or the nearest POI's clue is already owned (movement lock).
                const isLocked =
                  tokenCount < 1 || allUnlocked || isBuying || nearestAlreadyUnlocked;

                return (
                  <button
                    onClick={buyClue}
                    disabled={isLocked}
                    className={`w-full font-bold text-lg py-5 px-8 rounded-2xl active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 ${
                      !isLocked
                        ? "btn-blaze"
                        : "bg-forest-700/20 text-forest-600/50 border border-forest-600/15 cursor-not-allowed opacity-50 active:scale-100"
                    }`}
                  >
                    {isBuying ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Finding nearest clue...</span>
                      </>
                    ) : allUnlocked ? (
                      <span>All Clues Unlocked for this Area ✨</span>
                    ) : nearestAlreadyUnlocked ? (
                      <span>Move to next POI to unlock 🚶</span>
                    ) : (
                      <>
                        <span>🪙</span>
                        <span>Unlock Nearest Clue (1 Token)</span>
                      </>
                    )}
                  </button>
                );
              })()}

              <button
                onClick={handleLogout}
                className="w-full bg-forest-800/10 hover:bg-forest-800/20 text-forest-700 font-semibold text-lg py-5 px-8 rounded-2xl active:scale-95 transition-all duration-300 border border-forest-600/15"
              >
                Log Out
              </button>
            </div>

          </div>
        </>
      )}

      {/* === TAB: INVENTORY === */}
      {activeTab === 'inventory' && (
        <div className="relative z-10 mt-36 max-w-lg w-full space-y-6 pb-28">
          <div className="text-center mb-2">
            <h2 className="text-3xl font-extrabold text-cream-100 tracking-tight">📦 CLUE INVENTORY</h2>
            <p className="text-cream-200/60 text-sm font-medium mt-1">Your team&apos;s collected intelligence</p>
          </div>

          {Object.entries(CLUSTER_NAMES).map(([clusterKey, clusterName]) => {
            const clusterNum = Number(clusterKey);
            const clues = CLUSTER_CLUES[clusterNum] || [];

            return (
              <div key={clusterNum} className="expedition-card p-6">
                <h3 className="section-header mb-4 flex items-center space-x-2">
                  <span>{clusterNum === 1 ? '🏛️' : '🏙️'}</span>
                  <span>{clusterName}</span>
                  <span className="ml-auto text-xs text-forest-600 font-bold normal-case tracking-normal">
                    {clues.filter(c => unlockedClues[c.id]).length}/{clues.length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {clues.map((clue) => {
                    const isUnlocked = !!unlockedClues[clue.id];
                    return (
                      <div
                        key={clue.id}
                        className={`rounded-xl border transition-all duration-300 ${
                          isUnlocked
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-forest-800/5 border-forest-600/10 opacity-40"
                        }`}
                      >
                        {isUnlocked ? (
                          <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                            <span className="text-2xl">🔓</span>
                            <p className="text-forest-900 text-sm font-semibold leading-relaxed">{clue.text}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-5 space-y-1">
                            <span className="text-xl">🔒</span>
                            <p className="text-forest-600 text-xs font-medium italic">Locked — Purchase to reveal</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full bg-forest-900/60 hover:bg-forest-900/80 text-cream-100 font-semibold text-lg py-5 px-8 rounded-2xl active:scale-95 transition-all duration-300 border border-cream-200/10"
          >
            Log Out
          </button>
        </div>
      )}

      {/* CARD FLIP OVERLAY — 3-step: pop out face-down → tap to flip → close */}
      {revealedClue && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-forest-950/85 backdrop-blur-md">
          <div className="animate-fade-in-scale w-full max-w-sm flex flex-col items-center">

            {/* Instruction label */}
            <p className={`text-cream-200/70 text-xs font-bold uppercase tracking-widest mb-4 transition-opacity duration-500 ${
              isCardFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              Tap the card to reveal your clue
            </p>

            {/* Flippable card — clicking it triggers the flip */}
            <div
              className={`perspective-container w-full cursor-pointer select-none ${isCardFlipped ? 'card-flipped' : ''}`}
              onClick={() => { if (!isCardFlipped) setIsCardFlipped(true); }}
              role="button"
              aria-label={isCardFlipped ? 'Clue revealed' : 'Tap to reveal clue'}
            >
              <div className="card-inner" style={{ minHeight: '300px' }}>

                {/* FRONT — Face-down mystery card */}
                <div className="card-front bg-gradient-to-br from-blaze-500 via-blaze-400 to-yellow-400 flex flex-col items-center justify-center p-8 border-2 border-yellow-300/40 shadow-[0_8px_40px_rgba(255,111,26,0.35)]">
                  {/* Topo-style pattern on card face */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(ellipse 120px 50px at 30% 40%, transparent 48%, rgba(255,255,255,0.8) 48.5%, transparent 49%), radial-gradient(ellipse 90px 38px at 70% 60%, transparent 44%, rgba(255,255,255,0.6) 44.5%, transparent 45%)'
                  }} />
                  <div className="relative w-20 h-20 rounded-full bg-white/25 flex items-center justify-center mb-5 border-2 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <span className="text-4xl">❓</span>
                  </div>
                  <p className="relative text-white font-extrabold text-xl tracking-tight drop-shadow-md">Mystery Clue</p>
                  <p className="relative text-white/70 text-sm font-semibold mt-2 tracking-wide">↑ Tap to flip ↑</p>
                </div>

                {/* BACK — Revealed clue on cream card */}
                <div className="card-back bg-cream-50 flex flex-col items-center justify-center p-8 border-2 border-cream-300 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5 border-2 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                    <span className="text-3xl">🔓</span>
                  </div>
                  <p className="text-forest-600/60 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-3">Clue Unlocked</p>
                  <p className="text-forest-900 text-center font-semibold leading-relaxed text-base px-2">
                    {revealedClue.text}
                  </p>
                </div>

              </div>
            </div>

            {/* Close button — only shown after flip */}
            <div className={`w-full mt-6 transition-all duration-500 ${
              isCardFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
              <button
                onClick={() => { setRevealedClue(null); setIsCardFlipped(false); }}
                className="w-full btn-blaze text-lg py-4 rounded-2xl active:scale-95 transition-all duration-300 font-bold"
              >
                Store in Inventory ✓
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="bg-forest-900/95 backdrop-blur-xl border-t border-cream-200/10 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
          <div className="max-w-lg mx-auto flex">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex-1 flex flex-col items-center py-3 pt-4 transition-all duration-300 ${
                activeTab === 'tracker'
                  ? 'text-blaze-400'
                  : 'text-cream-200/40 hover:text-cream-200/70'
              }`}
            >
              <span className="text-xl mb-0.5">📍</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Tracker</span>
              {activeTab === 'tracker' && (
                <div className="w-1 h-1 rounded-full bg-blaze-400 mt-1"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 flex flex-col items-center py-3 pt-4 transition-all duration-300 ${
                activeTab === 'inventory'
                  ? 'text-blaze-400'
                  : 'text-cream-200/40 hover:text-cream-200/70'
              }`}
            >
              <span className="text-xl mb-0.5">📦</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Inventory</span>
              {activeTab === 'inventory' && (
                <div className="w-1 h-1 rounded-full bg-blaze-400 mt-1"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-8 mb-20 text-cream-200/30 text-xs font-medium text-center px-6 max-w-sm">
        Location permissions required.
      </p>
    </main>
  );
}
