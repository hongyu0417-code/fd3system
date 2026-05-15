"use client";

import { useState, useEffect } from "react";
import { database } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

interface Team {
  firebaseKey: string;
  team_id: number;
  team_name: string;
  token_count: number;
  current_cluster: number;
}

export default function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamsRef = ref(database, "teams");

    const unsubscribe = onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Firebase objects with numeric keys might come back as arrays or objects.
        // We'll normalize it to an array and filter out nulls (if index 0 is empty).
        const teamsArray: Team[] = Object.entries(data).map(([key, val]: [string, any]) => ({
          firebaseKey: key,
          team_id: val.team_id !== undefined ? val.team_id : Number(key),
          ...val
        })).filter(t => !isNaN(t.team_id));
        
        // Sort by token_count descending
        teamsArray.sort((a, b) => b.token_count - a.token_count);
        
        setTeams(teamsArray);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-4">
        {teams.map((team, index) => {
          const isFirstPlace = index === 0;
          const isSecondPlace = index === 1;
          const isThirdPlace = index === 2;

          let medal = "";
          let bgStyle = "bg-white/5 border-white/10 hover:bg-white/10";
          let textStyle = "text-white";

          if (isFirstPlace) {
            medal = "🥇";
            bgStyle = "bg-amber-500/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]";
            textStyle = "text-amber-200 font-bold";
          } else if (isSecondPlace) {
            medal = "🥈";
            bgStyle = "bg-slate-300/20 border-slate-300/40";
          } else if (isThirdPlace) {
            medal = "🥉";
            bgStyle = "bg-orange-700/20 border-orange-700/40";
          }

          return (
            <div
              key={team.firebaseKey}
              className={`flex items-center justify-between p-5 rounded-3xl border backdrop-blur-md transition-all duration-500 ${bgStyle}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border border-white/10 font-bold text-white/80">
                  {medal ? medal : `#${index + 1}`}
                </div>
                <div>
                  <h3 className={`text-lg tracking-wide ${textStyle}`}>
                    {team.team_name || `Group ${team.team_id}`}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                <span className="text-xl">🪙</span>
                <span className={`text-xl tabular-nums tracking-tight ${isFirstPlace ? 'text-amber-300 font-black' : 'text-white font-bold'}`}>
                  {team.token_count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
