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
          let bgStyle = "bg-forest-800/6 border-forest-600/10 hover:bg-forest-800/10";
          let textStyle = "text-forest-800";

          if (isFirstPlace) {
            medal = "🥇";
            bgStyle = "bg-blaze-500/10 border-blaze-500/30 shadow-[0_0_16px_rgba(255,111,26,0.1)]";
            textStyle = "text-blaze-600 font-bold";
          } else if (isSecondPlace) {
            medal = "🥈";
            bgStyle = "bg-forest-800/8 border-forest-600/15";
          } else if (isThirdPlace) {
            medal = "🥉";
            bgStyle = "bg-forest-800/6 border-forest-600/10";
          }

          return (
            <div
              key={team.firebaseKey}
              className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-500 ${bgStyle}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-800/10 border border-forest-600/10 font-bold text-forest-700">
                  {medal ? medal : `#${index + 1}`}
                </div>
                <div>
                  <h3 className={`text-lg tracking-wide ${textStyle}`}>
                    {team.team_name || `Group ${team.team_id}`}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-forest-800/8 px-4 py-2 rounded-xl border border-forest-600/10">
                <span className="text-xl">🪙</span>
                <span className={`text-xl tabular-nums tracking-tight ${isFirstPlace ? 'text-blaze-500 font-black' : 'text-forest-800 font-bold'}`}>
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
