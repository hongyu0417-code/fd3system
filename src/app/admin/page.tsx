"use client";

import { useState, useEffect } from "react";
import { database } from "../../lib/firebase";
import { ref, onValue, update, get, set, increment } from "firebase/database";
import Leaderboard from "../../components/Leaderboard";

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
      <main className="min-h-[100dvh] relative flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden">
        {/* Glowing background */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2">
              Admin Access
            </h1>
            <p className="text-slate-400 font-medium">Enter passcode to continue</p>
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
                className={`w-full bg-black/20 backdrop-blur-md rounded-2xl text-center text-3xl text-white font-bold tracking-widest py-4 focus:outline-none transition-all duration-300 shadow-inner ${passcodeError
                    ? 'border border-red-500/50 bg-red-500/10'
                    : 'border border-white/10 focus:border-white/30 focus:bg-white/10'
                  }`}
                placeholder="••••••••"
                autoFocus
              />
              {passcodeError && (
                <p className="text-red-400 text-sm font-medium mt-3 text-center">Access Denied</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 text-white relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[50vh] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">HQ Command</h1>
            <p className="text-slate-400 font-medium mt-1">Live Game State Management</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all"
          >
            Lock Terminal
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Controls */}
          <div className="space-y-8">

            {/* Game State Controls */}
            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center space-x-2">
                <span className="text-2xl">🌍</span>
                <span>Active Cluster</span>
              </h2>
              <div className="flex space-x-3">
                {[1, 2, 3].map((clusterNum) => (
                  <button
                    key={clusterNum}
                    onClick={() => handleClusterChange(clusterNum)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 border ${
                      activeCluster === clusterNum
                        ? "bg-blue-500/30 text-blue-200 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105"
                        : "bg-black/20 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Cluster {clusterNum}
                  </button>
                ))}
              </div>
            </section>

            {/* Token Management Section */}
            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center space-x-2">
                <span className="text-2xl">🪙</span>
                <span>Token Bank</span>
              </h2>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl"></div>)}
                </div>
              ) : (
                <div className="space-y-3">
                  {teams.map((team) => (
                    <div key={team.team_id} className="flex items-center justify-between bg-black/20 border border-white/5 p-3 rounded-2xl">
                      <span className="font-semibold px-2">Group {team.team_id}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold tabular-nums w-8 text-center">{team.token_count}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTokenChange(team.firebaseKey, -1)}
                            className="w-10 h-10 flex items-center justify-center bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-full border border-red-500/30 transition-all active:scale-95"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => handleTokenChange(team.firebaseKey, 1)}
                            className="w-10 h-10 flex items-center justify-center bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-full border border-emerald-500/30 transition-all active:scale-95"
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
            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl flex flex-col">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center space-x-3">
                <span className="text-2xl">📡</span>
                <span>Mission Queue</span>
                {pendingMissions.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    {pendingMissions.length}
                  </span>
                )}
              </h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {pendingMissions.length === 0 ? (
                  <div className="text-center text-sm font-medium text-slate-500 py-8 border border-dashed border-white/10 rounded-2xl bg-black/10">
                    No pending missions in the queue.
                  </div>
                ) : (
                  pendingMissions.map((mission) => (
                    <div key={mission.id} className="bg-black/20 border border-white/5 p-4 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      <div className="flex justify-between items-start mb-4 pl-2">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Group {mission.teamId}</span>
                          <h3 className="font-semibold text-lg text-white mt-1">{mission.poiName}</h3>
                        </div>
                        <span className="text-xs font-medium bg-white/5 text-slate-300 px-2 py-1 rounded-md border border-white/10">
                          {Math.max(0, Math.floor((Date.now() - mission.timestamp) / 60000))}m ago
                        </span>
                      </div>
                      <div className="flex space-x-3 pl-2">
                        <button
                          onClick={() => handleApprove(mission)}
                          className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold transition-all active:scale-95"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(mission.id)}
                          className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-xl font-bold transition-all active:scale-95"
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
            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl h-full">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center space-x-2">
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
