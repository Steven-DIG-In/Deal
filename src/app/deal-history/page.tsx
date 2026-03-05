'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const SAMPLE_DEALS = [
    { id: 1, borrower: 'Meridian Capital Partners', sector: 'Real Estate', size: '€8.5M', facility: 'Term Loan', score: 72, verdict: 'CONDITIONS', analyst: 'S. Thomson', date: '04 Mar 2025', ref: '#D-998210' },
    { id: 2, borrower: 'Abuja Infrastructure Fund', sector: 'Infrastructure', size: '$24M', facility: 'Project Finance', score: 61, verdict: 'CONDITIONS', analyst: 'A. Osei', date: '03 Mar 2025', ref: '#D-998197' },
    { id: 3, borrower: 'Nordic Agri Holdings', sector: 'Agriculture', size: '€3.2M', facility: 'Revolving Credit', score: 84, verdict: 'PROCEED', analyst: 'S. Thomson', date: '01 Mar 2025', ref: '#D-997882' },
    { id: 4, borrower: 'Hartwell Ventures', sector: 'Manufacturing', size: '£7.1M', facility: 'Syndicated Loan', score: 38, verdict: 'DECLINE', analyst: 'M. Dupont', date: '28 Feb 2025', ref: '#D-997640' },
    { id: 5, borrower: 'Cape Verde DFI', sector: 'Energy', size: '€15M', facility: 'Project Finance', score: 77, verdict: 'PROCEED', analyst: 'A. Osei', date: '26 Feb 2025', ref: '#D-997501' },
    { id: 6, borrower: 'Brussels Trade & Commerce', sector: 'Trade Finance', size: '€1.8M', facility: 'Trade Finance', score: 90, verdict: 'PROCEED', analyst: 'S. Thomson', date: '24 Feb 2025', ref: '#D-997308' },
    { id: 7, borrower: 'Nairobi Growth Fund II', sector: 'Infrastructure', size: '$8.4M', facility: 'Term Loan', score: 55, verdict: 'CONDITIONS', analyst: 'A. Osei', date: '21 Feb 2025', ref: '#D-997101' },
    { id: 8, borrower: 'Iberian Renewable Energy', sector: 'Energy', size: '€22M', facility: 'Project Finance', score: 81, verdict: 'PROCEED', analyst: 'M. Dupont', date: '19 Feb 2025', ref: '#D-996890' },
]

const verdictConfig: Record<string, { label: string; className: string }> = {
    PROCEED: { label: 'PROCEED', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    CONDITIONS: { label: 'CONDITIONS', className: 'bg-amber-50 text-amber-700 border border-amber-200' },
    DECLINE: { label: 'DECLINE', className: 'bg-red-50 text-red-700 border border-red-200' },
}

const scoreColor = (score: number) =>
    score >= 70 ? 'text-emerald-700' : score >= 45 ? 'text-amber-600' : 'text-red-600'

export default function DealHistoryPage() {
    const total = SAMPLE_DEALS.length
    const proceed = SAMPLE_DEALS.filter(d => d.verdict === 'PROCEED').length
    const declined = SAMPLE_DEALS.filter(d => d.verdict === 'DECLINE').length

    return (
        <div className="min-h-screen bg-bg-light font-display">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Deal History</h1>
                        <p className="text-neutral-slate mt-1">All AI deal assessments run by your team. Click any deal to view the full analysis.</p>
                    </div>
                    <Link href="/deal-input"
                        className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 text-sm">
                        + New Deal Assessment
                    </Link>
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Total Deals', value: total, color: 'text-gray-900' },
                        { label: `Proceed (${Math.round((proceed / total) * 100)}%)`, value: proceed, color: 'text-emerald-700' },
                        { label: `Declined (${Math.round((declined / total) * 100)}%)`, value: declined, color: 'text-red-600' },
                    ].map(stat => (
                        <div key={stat.label} className="bg-white rounded-xl border border-slate-100 shadow-sm px-6 py-4">
                            <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider">{stat.label}</p>
                            <p className={`text-3xl font-extrabold mt-1 ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-6 py-4 mb-4 flex flex-wrap items-center gap-4">
                    <input type="text" placeholder="Search by borrower or sector…"
                        className="flex-1 min-w-48 px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm outline-none">
                        <option>Verdict: All</option>
                        <option>PROCEED</option>
                        <option>CONDITIONS</option>
                        <option>DECLINE</option>
                    </select>
                    <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm outline-none">
                        <option>All Sectors</option>
                        <option>Real Estate</option>
                        <option>Infrastructure</option>
                        <option>Energy</option>
                    </select>
                    <button className="text-sm text-accent font-semibold hover:underline">Clear Filters</button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                {['Borrower', 'Sector', 'Deal Size', 'Facility', 'Score', 'Verdict', 'Analyst', 'Date', ''].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-bold text-neutral-slate uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {SAMPLE_DEALS.map(deal => (
                                <tr key={deal.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-gray-900">{deal.borrower}</p>
                                        <p className="text-xs text-neutral-slate">{deal.ref}</p>
                                    </td>
                                    <td className="px-5 py-4 text-neutral-slate">{deal.sector}</td>
                                    <td className="px-5 py-4 font-semibold text-gray-900">{deal.size}</td>
                                    <td className="px-5 py-4 text-neutral-slate">{deal.facility}</td>
                                    <td className="px-5 py-4">
                                        <span className={`font-bold text-base ${scoreColor(deal.score)}`}>{deal.score}</span>
                                        <span className="text-neutral-slate text-xs">/100</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${verdictConfig[deal.verdict].className}`}>
                                            {verdictConfig[deal.verdict].label}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-neutral-slate">{deal.analyst}</td>
                                    <td className="px-5 py-4 text-neutral-slate">{deal.date}</td>
                                    <td className="px-5 py-4">
                                        <Link href="/results" className="text-accent font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                                            View →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-sm text-neutral-slate">Showing 1–8 of 24 deals</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">← Previous</button>
                            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">Next →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
