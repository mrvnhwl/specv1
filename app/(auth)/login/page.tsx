'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuth = async () => {
    setLoading(true);

    if (isSignup) {
      // SIGN UP
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        alert(error.message);
      } else {
        alert('Account created! You can now log in.');
        setIsSignup(false);
      }

    } else {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        alert(error.message);
      } else {
        router.push('/dashboard');
      }
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 py-12">
      <div className="grid w-full gap-8 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <section className="rounded-[2rem] border border-line bg-panel/80 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">Authentication</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            {isSignup ? 'Create your account' : 'Log in to sync devices'}
          </h1>
          <p className="mt-4 max-w-xl text-soft">
            {isSignup
              ? 'Sign up to start using the app.'
              : 'Log in to continue and sync your data.'}
          </p>
        </section>

        {/* FORM */}
        <section className="rounded-[2rem] border border-line bg-panel/80 p-8 shadow-glow">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
          >

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-line bg-bg px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-line bg-bg px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

            {/* MAIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-accent to-cyan px-5 py-4 font-semibold text-slate-950"
            >
              {loading
                ? 'Processing...'
                : isSignup
                ? 'Create Account'
                : 'Continue'}
            </button>

            {/* GOOGLE LOGIN (only for login mode) */}
            {!isSignup && (
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full rounded-2xl border border-line bg-white/5 px-5 py-4 font-semibold text-white"
              >
                Continue with Google
              </button>
            )}

            {/* TOGGLE */}
            <p className="text-center text-sm text-slate-400">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-cyan hover:underline"
              >
                {isSignup ? 'Log in' : 'Sign up'}
              </button>
            </p>

          </form>
        </section>
      </div>
    </main>
  );
}