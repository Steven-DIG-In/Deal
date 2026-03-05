'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.error || 'Login failed.')
            } else {
                router.push('/deal-input')
                router.refresh()
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex font-display bg-bg-light">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-[40%] bg-primary relative flex-col justify-between p-12 overflow-hidden">
                <div className="absolute inset-0 financial-grid opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f2041] via-[#0f2041] to-[#1a2e5a] opacity-90" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                            <svg className="size-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight">DealIQ</span>
                            <span className="text-xs font-medium text-white/60 tracking-wider uppercase">By Aspect Advisory</span>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 mb-20">
                    <h1 className="text-white text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight max-w-md">
                        Real-time deal profitability for bank sales teams
                    </h1>
                    <div className="mt-8 h-1 w-20 bg-white/20 rounded-full" />
                    <p className="mt-8 text-white/70 text-lg max-w-sm">
                        Unlock advanced AI-driven insights to optimize every transaction and maximize your portfolio performance.
                    </p>
                </div>
                <div className="relative z-10">
                    <p className="text-white/50 text-xs font-medium tracking-tight">
                        © 2025 Aspect Advisory · aspectadvisory.eu · All outputs are indicative only
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center items-center p-6 sm:p-12 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                        <svg className="size-6 text-white" fill="none" viewBox="0 0 48 48">
                            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h2 className="text-primary text-xl font-bold">DealIQ</h2>
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white p-8 sm:p-10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
                        <div className="mb-8">
                            <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight">Welcome back</h2>
                            <p className="text-neutral-slate mt-2">Enter your credentials to access your account.</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@bank-domain.com"
                                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                                    <a href="#" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="block w-full px-4 pr-12 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? '🙈' : '👁'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                    className="h-4 w-4 text-primary border-slate-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-slate-600 cursor-pointer">
                                    Keep me signed in for 30 days
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Signing in…' : 'Sign In →'}
                            </button>
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-white text-neutral-slate font-medium">or continue with</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-3"
                            >
                                <svg className="size-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h23v23H0z" fill="#f3f3f3" />
                                    <path d="M1 1h10v10H1z" fill="#f35325" />
                                    <path d="M12 1h10v10H12z" fill="#81bc06" />
                                    <path d="M1 12h10v10H1z" fill="#05a6f0" />
                                    <path d="M12 12h10v10H12z" fill="#ffba08" />
                                </svg>
                                Sign in with Microsoft
                            </button>
                        </form>
                    </div>
                    <p className="mt-8 text-center text-sm text-neutral-slate">
                        New to DealIQ?{' '}
                        <a href="mailto:info@aspectadvisory.eu" className="font-bold text-primary hover:underline">
                            Contact your administrator
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
