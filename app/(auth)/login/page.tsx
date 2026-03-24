export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 py-12">
      <div className="grid w-full gap-8 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-line bg-panel/80 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">Authentication</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Log in to sync devices and recommendations</h1>
          <p className="mt-4 max-w-xl text-soft">This starter app includes the full auth-ready UI. Connect it to Supabase Auth for email/password or social login.</p>
        </section>

        <section className="rounded-[2rem] border border-line bg-panel/80 p-8 shadow-glow">
          <form className="space-y-4">
            <input type="email" placeholder="Email address" className="w-full rounded-2xl border border-line bg-bg px-4 py-4 text-white outline-none placeholder:text-slate-500" />
            <input type="password" placeholder="Password" className="w-full rounded-2xl border border-line bg-bg px-4 py-4 text-white outline-none placeholder:text-slate-500" />
            <button type="button" className="w-full rounded-2xl bg-gradient-to-r from-accent to-cyan px-5 py-4 font-semibold text-slate-950">Continue</button>
            <button type="button" className="w-full rounded-2xl border border-line bg-white/5 px-5 py-4 font-semibold text-white">Continue with Google</button>
            <button type="button" className="w-full rounded-2xl border border-line bg-white/5 px-5 py-4 font-semibold text-white">Connect Steam later</button>
          </form>
        </section>
      </div>
    </main>
  );
}
