import Leaderboard from "../../components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <main className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 text-white relative overflow-x-hidden flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[80%] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Live Rankings</h1>
          <p className="text-slate-400 font-medium">Top teams by tokens collected</p>
        </header>

        <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
          <Leaderboard />
        </section>

        <div className="text-center pt-4">
          <a href="/" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full font-medium transition-all active:scale-95">
            &larr; Back to Tracker
          </a>
        </div>
      </div>
    </main>
  );
}
