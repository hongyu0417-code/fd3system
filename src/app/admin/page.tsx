"use client";

import { useState, useEffect } from "react";
import { database } from "../../lib/firebase";
import { ref, onValue, update, get, set, increment } from "firebase/database";
import Leaderboard from "../../components/Leaderboard";
import { CLUSTER_NAMES } from "../../lib/locations";

const ADMIN_PASSCODE = "admin123";

interface Team {
  firebaseKey: string;
  team_id: number;
  team_name: string;
  token_count: number;
  current_cluster: number;
  completedPOIs?: number[];
}

interface Mission {
  id: string;
  teamId: number;
  poiId: number;
  poiName: string;
  clusterId: number;
  status: string;
  timestamp: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCluster, setActiveCluster] = useState<number>(1);
  const [pendingMissions, setPendingMissions] = useState<Mission[]>([]);

  // Authentication Flow
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setPasscodeInput("");
    }
  };

  // 1. Fetch teams
  useEffect(() => {
    if (!isAuthenticated) return;

    const teamsRef = ref(database, "teams");
    const unsubscribe = onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const teamsArray: Team[] = Object.entries(data).map(([key, val]: [string, any]) => ({
          firebaseKey: key,
          team_id: val.team_id !== undefined ? val.team_id : Number(key),
          ...val
        })).filter(t => !isNaN(t.team_id));
        // Sort by ID so the list is consistent
        teamsArray.sort((a, b) => a.team_id - b.team_id);
        setTeams(teamsArray);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // 2. Fetch active cluster
  useEffect(() => {
    if (!isAuthenticated) return;
    const gameStateRef = ref(database, "gameState/activeCluster");
    const unsubscribe = onValue(gameStateRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setActiveCluster(val);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // 3. Fetch Pending Missions
  useEffect(() => {
    if (!isAuthenticated) return;
    const missionsRef = ref(database, 'missions');
    const unsubscribe = onValue(missionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const missionsArray: Mission[] = Object.entries(data).map(([key, val]: [string, any]) => ({
          id: key,
          ...val
        }));
        const pending = missionsArray.filter(m => m.status === 'pending');
        // Sort oldest first for queue
        pending.sort((a, b) => a.timestamp - b.timestamp); 
        setPendingMissions(pending);
      } else {
        setPendingMissions([]);
      }
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // Token Management Logic
  const handleTokenChange = async (firebaseKey: string, change: number) => {
    try {
      const teamRef = ref(database, `teams/${firebaseKey}`);
      
      // If we are deducting, make sure we don't go below 0
      if (change < 0) {
        const snapshot = await get(teamRef);
        if (snapshot.exists() && snapshot.val().token_count <= 0) {
          return;
        }
      }

      await update(teamRef, {
        token_count: increment(change)
      });
    } catch (error) {
      console.error("Error updating tokens:", error);
      alert('Failed to update tokens. Check Firebase Security Rules or console.');
    }
  };

  const handleClusterChange = async (cluster: number) => {
    try {
      await set(ref(database, "gameState/activeCluster"), cluster);
    } catch (error) {
      console.error("Error setting active cluster:", error);
    }
  };

  // Mission Approval Logic
  const handleApprove = async (mission: Mission) => {
    try {
      // 1. Mark mission approved
      await update(ref(database, `missions/${mission.id}`), { status: 'approved' });

      // 2. Add POI to team's completedPOIs
      const teamRef = ref(database, `teams/${mission.teamId}`);
      const teamSnap = await get(teamRef);
      if (teamSnap.exists()) {
        const teamData = teamSnap.val();
        const completed = teamData.completedPOIs || [];
        if (!completed.includes(mission.poiId)) {
          await update(teamRef, { completedPOIs: [...completed, mission.poiId] });
        }
      }
    } catch (error) {
      console.error("Error approving mission:", error);
    }
  };

  const handleReject = async (missionId: string) => {
    try {
      await update(ref(database, `missions/${missionId}`), { status: 'rejected' });
    } catch (error) {
      console.error("Error rejecting mission:", error);
    }
  };


  if (!isAuthenticated) {
    return (
      <main className="min-h-[100dvh] topo-bg relative flex flex-col items-center justify-center p-6 bg-forest-950 overflow-hidden">
        {/* Glowing background */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-800/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blaze-500/8 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full expedition-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-forest-800 tracking-tight mb-2">
              Admin Access
            </h1>
            <p className="text-forest-600/70 font-medium">Enter passcode to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError(false);
                }}
                className={`w-full bg-forest-900/8 rounded-2xl text-center text-3xl text-forest-800 font-bold tracking-widest py-4 focus:outline-none transition-all duration-300 ${passcodeError
                    ? 'border-2 border-red-500/50 bg-red-50'
                    : 'border border-forest-600/20 focus:border-blaze-500/50 focus:bg-blaze-500/5'
                  }`}
                placeholder="••••••••"
                autoFocus
              />
              {passcodeError && (
                <p className="text-red-600 text-sm font-medium mt-3 text-center">Access Denied</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full btn-blaze text-lg py-4 rounded-xl active:scale-95 transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] topo-bg bg-forest-950 p-6 md:p-12 text-cream-100 relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[50vh] bg-emerald-800/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream-200/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-[0.08em] uppercase text-cream-100">Jiong Xi and Ryan is GOAT</h1>
            <p className="text-cream-200/50 font-medium mt-1">Live Game State Management</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-2 bg-forest-800/60 hover:bg-forest-800/80 border border-cream-200/10 rounded-xl text-sm font-semibold text-cream-200 transition-all"
          >
            Lock Terminal
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Controls */}
          <div className="space-y-8">

            {/* Game State Controls */}
            <section className="expedition-card p-6">
              <h2 className="text-xl font-extrabold tracking-[0.1em] uppercase text-forest-800 mb-6 flex items-center space-x-2">
                <span className="text-2xl">🌍</span>
                <span>Active Cluster</span>
              </h2>
              <div className="flex space-x-3">
                {[1, 2].map((clusterNum) => (
                  <button
                    key={clusterNum}
                    onClick={() => handleClusterChange(clusterNum)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 border ${
                      activeCluster === clusterNum
                        ? "btn-blaze scale-105"
                        : "bg-forest-800/8 text-forest-700 border-forest-600/15 hover:bg-blaze-500/10 hover:text-forest-900"
                    }`}
                  >
                    {CLUSTER_NAMES[clusterNum] || `Cluster ${clusterNum}`}
                  </button>
                ))}
              </div>
            </section>

            {/* Token Management Section */}
            <section className="expedition-card p-6">
              <h2 className="text-xl font-extrabold tracking-[0.1em] uppercase text-forest-800 mb-6 flex items-center space-x-2">
                <span className="text-2xl">🪙</span>
                <span>Token Bank</span>
              </h2>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-forest-800/8 rounded-2xl"></div>)}
                </div>
              ) : (
                <div className="space-y-3">
                  {teams.map((team) => (
                    <div key={team.team_id} className="flex items-center justify-between bg-forest-800/6 border border-forest-600/10 p-3 rounded-xl">
                      <span className="font-bold text-forest-800 px-2">Group {team.team_id}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-extrabold tabular-nums w-8 text-center text-blaze-500">{team.token_count}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTokenChange(team.firebaseKey, -1)}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-xl border border-red-200 font-bold transition-all active:scale-95"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => handleTokenChange(team.firebaseKey, 1)}
                            className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl border border-emerald-200 font-bold transition-all active:scale-95"
                          >
                            +1
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Pending Missions Queue */}
            <section className="expedition-card p-6 flex flex-col">
              <h2 className="text-xl font-extrabold tracking-[0.1em] uppercase text-forest-800 mb-6 flex items-center space-x-3">
                <span className="text-2xl">📡</span>
                <span>Mission Queue</span>
                {pendingMissions.length > 0 && (
                  <span className="bg-blaze-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,111,26,0.4)]">
                    {pendingMissions.length}
                  </span>
                )}
              </h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {pendingMissions.length === 0 ? (
                  <div className="text-center text-sm font-semibold text-forest-600/50 py-8 border border-dashed border-forest-600/15 rounded-xl bg-forest-800/4">
                    No pending missions in the queue.
                  </div>
                ) : (
                  pendingMissions.map((mission) => (
                    <div key={mission.id} className="bg-forest-800/6 border border-forest-600/10 p-4 rounded-xl relative overflow-hidden group hover:border-blaze-500/30 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blaze-500 shadow-[0_0_8px_rgba(255,111,26,0.4)]"></div>
                      <div className="flex justify-between items-start mb-4 pl-2">
                        <div>
                          <span className="text-xs font-extrabold uppercase tracking-widest text-blaze-500">Group {mission.teamId}</span>
                          <h3 className="font-bold text-lg text-forest-900 mt-1">{mission.poiName}</h3>
                        </div>
                        <span className="text-xs font-bold bg-forest-800/8 text-forest-600 px-2 py-1 rounded-lg border border-forest-600/10">
                          {Math.max(0, Math.floor((Date.now() - mission.timestamp) / 60000))}m ago
                        </span>
                      </div>
                      <div className="flex space-x-3 pl-2">
                        <button
                          onClick={() => handleApprove(mission)}
                          className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold transition-all active:scale-95"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(mission.id)}
                          className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold transition-all active:scale-95"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Leaderboard */}
          <div className="space-y-8">
            <section className="expedition-card p-6 h-full">
              <h2 className="text-xl font-extrabold tracking-[0.1em] uppercase text-forest-800 mb-6 flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <span>Live Leaderboard</span>
              </h2>
              <Leaderboard />
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
