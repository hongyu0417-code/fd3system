"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { database } from "../lib/firebase";
import { ref, onValue, update, push, get, increment } from "firebase/database";
import { TARGET_LOCATIONS, CLUSTER_NAMES, CLUSTER_CLUES, TargetLocation } from "../lib/locations";

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

  // Buy a random clue from the current cluster
  const buyClue = useCallback(async () => {
    if (!selectedTeam || isBuying || tokenCount < 1) return;
    setIsBuying(true);
    try {
      const cluesForCluster = CLUSTER_CLUES[globalActiveCluster] || [];
      const available = cluesForCluster.filter(c => !unlockedClues[c.id]);
      if (available.length === 0) { setIsBuying(false); return; }

      const randomClue = available[Math.floor(Math.random() * available.length)];

      // Atomic Firebase update: deduct 1 token + save clue
      const teamRef = ref(database, `teams/${selectedTeam}`);
      await update(teamRef, {
        token_count: increment(-1),
        [`unlockedClues/${randomClue.id}`]: true,
      });

      // Trigger card flip reveal
      setRevealedClue({ text: randomClue.text });
      setIsCardFlipped(false);
      // Slight delay then flip
      setTimeout(() => setIsCardFlipped(true), 100);
    } catch (err) {
      console.error("Error buying clue:", err);
    } finally {
      setIsBuying(false);
    }
  }, [selectedTeam, isBuying, tokenCount, globalActiveCluster, unlockedClues]);

  // --- UI: LOGIN ---
  if (selectedTeam === null) {
    return (
      <main className="min-h-[100dvh] relative flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden">
        {/* Subtle glowing background mesh */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
          {pendingTeam === null ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2">
                  Select Team
                </h1>
                <p className="text-slate-400 font-medium">Choose your group to begin</p>
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
                    className="group w-full bg-white/5 hover:bg-white/10 text-white font-medium text-lg py-4 px-6 rounded-3xl transition-all duration-300 border border-white/5 hover:border-white/20 flex justify-between items-center shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
                  >
                    <span className="tracking-wide">Group {teamId}</span>
                    <span className="text-slate-500 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2">
                  Group {pendingTeam}
                </h1>
                <p className="text-slate-400 font-medium">Enter your password</p>
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
                    className={`w-full bg-black/20 backdrop-blur-md rounded-2xl text-center text-2xl text-white font-bold tracking-widest py-4 focus:outline-none transition-all duration-300 shadow-inner ${
                      pinError 
                        ? 'border border-red-500/50 bg-red-500/10 placeholder:text-red-300/50' 
                        : 'border border-white/10 focus:border-white/30 focus:bg-white/10 placeholder:text-white/20'
                    }`}
                    placeholder="Password"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-red-400 text-sm font-medium mt-3">Incorrect password. Please try again.</p>
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
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-full transition-all duration-300 border border-white/10 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-white text-black font-bold py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
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
  let bgGradient = "from-slate-950 to-slate-900"; 
  let glowColor = "bg-slate-500/20";
  let distanceAnimateClass = "";

  if (activeTarget && minDistance !== null) {
    if (minDistance > 1000) {
      bgGradient = "from-blue-950 to-slate-950";
      glowColor = "bg-blue-500/30";
    } else if (minDistance > 500) {
      bgGradient = "from-yellow-950 to-slate-950";
      glowColor = "bg-yellow-500/30";
    } else if (minDistance > WIN_RADIUS) {
      bgGradient = "from-orange-950 to-slate-950";
      glowColor = "bg-orange-500/30";
    } else {
      bgGradient = "from-emerald-950 to-slate-950";
      glowColor = "bg-emerald-500/40";
      distanceAnimateClass = "animate-pulse";
    }
  } else if (!activeTarget) {
     // Cluster Complete theme
     bgGradient = "from-emerald-950 to-slate-950";
     glowColor = "bg-emerald-500/40";
  }

  return (
    <main className={`min-h-[100dvh] relative flex flex-col items-center p-6 bg-gradient-to-br transition-colors duration-1000 overflow-hidden ${bgGradient}`}>
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ${glowColor}`}></div>

      {/* TOP STATUS BANNER (Game Master Lockdown) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
        <div className="bg-black/20 backdrop-blur-3xl border border-white/10 rounded-full py-2 px-6 shadow-2xl flex items-center space-x-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-white font-bold text-sm tracking-wide">
            Active Phase: {CLUSTER_NAMES[globalActiveCluster]}
          </span>
        </div>
      </div>

      {/* Persistent Team & Tokens Header */}
      <div className="fixed top-20 left-0 right-0 px-6 z-40 flex justify-center">
        <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-6 shadow-2xl flex items-center space-x-5">
          <span className="text-slate-300 font-semibold uppercase tracking-widest text-xs">
            Group {selectedTeam}
          </span>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">🪙</span>
            <span className="text-white font-bold text-lg tabular-nums tracking-tight">{tokenCount}</span>
          </div>
        </div>
      </div>

      {/* === TAB: TRACKER === */}
      {activeTab === 'tracker' && (
        <>
          {/* FLOATING CHECKLIST UI (Mobile: Top, Desktop: Side) */}
          <div className="relative z-40 mt-36 md:fixed md:top-32 md:right-8 w-full max-w-sm md:w-80 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-5 shadow-2xl flex-shrink-0">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 opacity-80">
              {CLUSTER_NAMES[globalActiveCluster]} POI
            </h3>
            <div className="space-y-3">
              {clusterTargets.map(poi => {
                const isCompleted = completedPOIs.includes(poi.id);
                const isActive = activeTarget?.id === poi.id;
                
                let statusClasses = "opacity-40 text-slate-400";
                let icon = "⚪";
                
                if (isCompleted) {
                  statusClasses = "line-through opacity-40 text-slate-500";
                  icon = "✅";
                } else if (isActive) {
                  statusClasses = "opacity-100 font-bold text-white bg-white/10 rounded-xl px-3 py-2 -ml-3 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]";
                  icon = "📍";
                }

                return (
                  <div key={poi.id} className={`flex items-center space-x-3 text-sm transition-all duration-500 ${statusClasses}`}>
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="truncate">{poi.name}</span>
                    {isActive && minDistance !== null && (
                      <span className="ml-auto flex-shrink-0 text-xs text-blue-300 font-mono font-bold animate-pulse">
                        {minDistance}m
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRACKING CENTER CARD */}
          <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10 mt-8 md:mt-auto md:mb-auto">
            
            {activeTarget ? (
              <div className="p-6 bg-black/20 backdrop-blur-md rounded-3xl border border-white/5 shadow-inner text-center">
                <h2 className="text-blue-300 text-xs uppercase tracking-widest font-bold mb-2 animate-pulse">
                  Active Target
                </h2>
                <p className={`text-2xl font-bold text-white tracking-tight`}>
                  {activeTarget.name}
                </p>
              </div>
            ) : (
              <div className="p-6 bg-emerald-500/20 backdrop-blur-md rounded-3xl border border-emerald-500/50 shadow-inner text-center">
                <p className="text-2xl font-bold text-emerald-300 tracking-tight">{CLUSTER_NAMES[globalActiveCluster]} Complete!</p>
              </div>
            )}

            {activeTarget && minDistance !== null ? (
              <div className={`py-4 text-center ${distanceAnimateClass}`}>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">
                  Distance
                </p>
                <div className="flex items-baseline justify-center space-x-1">
                  <p className="text-7xl font-bold text-white tracking-tighter tabular-nums drop-shadow-lg" style={{ minWidth: '3ch' }}>
                    {minDistance > 1000 ? (minDistance / 1000).toFixed(1) : Math.round(minDistance)}
                  </p>
                  <span className="text-2xl font-medium text-slate-400 tabular-nums">
                    {minDistance > 1000 ? "km" : "m"}
                  </span>
                </div>
              </div>
            ) : activeTarget ? (
              <div className="py-12 text-center flex flex-col items-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                 <p className="text-slate-400 font-medium">Acquiring GPS...</p>
              </div>
            ) : (
              <div className="py-8 text-center">
                 <span className="text-6xl block mb-4">🎉</span>
                 <p className="text-slate-400 font-medium">Await further instructions from HQ.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 backdrop-blur-xl text-red-200 p-4 rounded-2xl text-sm font-medium border border-red-500/30 mb-4">
                {error}
              </div>
            )}

            {/* CONTROLS */}
            <div className="space-y-4 mt-6">
              {activeTarget && minDistance !== null && (
                <>
                  {missionStatus === 'pending' ? (
                    <div className="w-full bg-blue-500/20 text-blue-200 border border-blue-500/50 font-bold text-lg py-5 px-8 rounded-full flex justify-center items-center space-x-3 shadow-inner">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-200"></div>
                      <span>Waiting for Admin...</span>
                    </div>
                  ) : missionStatus === 'rejected' ? (
                    <button
                      onClick={submitMission}
                      disabled={minDistance > WIN_RADIUS}
                      className="w-full bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/50 font-bold text-lg py-5 px-8 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.2)] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:active:scale-100"
                    >
                      Mission Rejected! Try Again
                    </button>
                  ) : (
                    <button
                      onClick={submitMission}
                      disabled={minDistance > WIN_RADIUS}
                      className={`w-full font-bold text-lg py-5 px-8 rounded-full active:scale-95 transition-all duration-300 ${
                        minDistance <= WIN_RADIUS
                          ? "bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-200 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                          : "bg-slate-800/50 text-slate-400 border border-slate-700 cursor-not-allowed opacity-50 active:scale-100"
                      }`}
                    >
                      {minDistance <= WIN_RADIUS ? "Submit Mission to Boss" : `Get closer to interact (${minDistance}m)`}
                    </button>
                  )}
                </>
              )}

              {/* BUY CLUE BUTTON */}
              {(() => {
                const cluesForCluster = CLUSTER_CLUES[globalActiveCluster] || [];
                const availableCount = cluesForCluster.filter(c => !unlockedClues[c.id]).length;
                const allUnlocked = availableCount === 0;

                return (
                  <button
                    onClick={buyClue}
                    disabled={tokenCount < 1 || allUnlocked || isBuying}
                    className={`w-full font-bold text-lg py-5 px-8 rounded-full active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 ${
                      tokenCount >= 1 && !allUnlocked
                        ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                        : "bg-slate-800/50 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50 active:scale-100"
                    }`}
                  >
                    {isBuying ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-200"></div>
                        <span>Opening...</span>
                      </>
                    ) : allUnlocked ? (
                      <span>All Clues Unlocked ✨</span>
                    ) : (
                      <>
                        <span>🪙</span>
                        <span>Buy Clue (1 Token)</span>
                        <span className="text-sm opacity-60">({availableCount} left)</span>
                      </>
                    )}
                  </button>
                );
              })()}

              <button
                onClick={handleLogout}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-medium text-lg py-5 px-8 rounded-full active:scale-95 transition-all duration-300 border border-white/10"
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
            <h2 className="text-3xl font-extrabold text-white tracking-tight">📦 Clue Inventory</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">Your team&apos;s collected intelligence</p>
          </div>

          {Object.entries(CLUSTER_NAMES).map(([clusterKey, clusterName]) => {
            const clusterNum = Number(clusterKey);
            const clues = CLUSTER_CLUES[clusterNum] || [];

            return (
              <div key={clusterNum} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center space-x-2">
                  <span>{clusterNum === 1 ? '🏛️' : '🏙️'}</span>
                  <span>{clusterName}</span>
                  <span className="ml-auto text-xs text-slate-400 font-medium normal-case tracking-normal">
                    {clues.filter(c => unlockedClues[c.id]).length}/{clues.length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {clues.map((clue) => {
                    const isUnlocked = !!unlockedClues[clue.id];
                    return (
                      <div
                        key={clue.id}
                        className={`p-4 rounded-2xl border transition-all duration-300 ${
                          isUnlocked
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-black/20 border-white/5 opacity-40"
                        }`}
                      >
                        {isUnlocked ? (
                          <div className="flex items-start space-x-3">
                            <span className="text-lg flex-shrink-0 mt-0.5">🔓</span>
                            <p className="text-white text-sm font-medium leading-relaxed">{clue.text}</p>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <span className="text-lg flex-shrink-0">🔒</span>
                            <p className="text-slate-500 text-sm font-medium italic">Locked — Purchase to reveal</p>
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
            className="w-full bg-white/5 hover:bg-white/10 text-white font-medium text-lg py-5 px-8 rounded-full active:scale-95 transition-all duration-300 border border-white/10"
          >
            Log Out
          </button>
        </div>
      )}

      {/* CARD FLIP OVERLAY */}
      {revealedClue && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
          <div className="animate-fade-in-scale w-full max-w-sm">
            <div className={`perspective-container ${isCardFlipped ? 'card-flipped' : ''}`}>
              <div className="card-inner" style={{ minHeight: '280px' }}>
                {/* FRONT — Mystery Card */}
                <div className="card-front bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 flex flex-col items-center justify-center p-8 border-2 border-amber-300/50 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
                    <span className="text-4xl">❓</span>
                  </div>
                  <p className="text-amber-950 font-extrabold text-xl tracking-tight">Mystery Clue</p>
                  <p className="text-amber-800 text-sm font-medium mt-1">Flipping...</p>
                </div>
                {/* BACK — Revealed Clue */}
                <div className="card-back bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 border-2 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
                    <span className="text-3xl">🔓</span>
                  </div>
                  <p className="text-white text-center font-medium leading-relaxed text-sm px-2">
                    {revealedClue.text}
                  </p>
                </div>
              </div>
            </div>
            {isCardFlipped && (
              <button
                onClick={() => { setRevealedClue(null); setIsCardFlipped(false); }}
                className="w-full mt-6 bg-white text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                Got it!
              </button>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="bg-black/40 backdrop-blur-3xl border-t border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
          <div className="max-w-lg mx-auto flex">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex-1 flex flex-col items-center py-3 pt-4 transition-all duration-300 ${
                activeTab === 'tracker'
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="text-xl mb-0.5">📍</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Tracker</span>
              {activeTab === 'tracker' && (
                <div className="w-1 h-1 rounded-full bg-white mt-1"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 flex flex-col items-center py-3 pt-4 transition-all duration-300 ${
                activeTab === 'inventory'
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="text-xl mb-0.5">📦</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Inventory</span>
              {activeTab === 'inventory' && (
                <div className="w-1 h-1 rounded-full bg-white mt-1"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-8 mb-20 text-slate-500 text-xs font-medium text-center px-6 max-w-sm">
        Location permissions required.
      </p>
    </main>
  );
}
