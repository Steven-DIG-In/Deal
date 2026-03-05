'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
    { label: 'New Deal', href: '/deal-input' },
    { label: 'Deal History', href: '/deal-history' },
]

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()

    async function handleLogout() {
        await fetch('/api/auth', { method: 'DELETE' })
        router.push('/login')
        router.refresh()
    }

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/deal-input" className="flex items-center gap-2.5">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg className="size-5 text-white" fill="none" viewBox="0 0 48 48">
                                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="text-primary font-bold text-lg tracking-tight">DealIQ</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${pathname === item.href
                                        ? 'bg-primary/8 text-primary'
                                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 hidden sm:block">Aspect Advisory</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-slate-500 hover:text-primary font-medium transition-colors"
                    >
                        Sign out
                    </button>
                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">ST</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
