'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

interface Deal {
    borrowerName: string
    sector: string
    dealSize: string
    currency: string
    facilityType: string
    tenor: string
    ltv: string
    riskRating: string
    interestRate: string
    purpose: string
    collateral: string[]
    internalRiskFlag: boolean
}

// Deterministic "AI" result generated from form inputs (for demo)
function generateResult(deal: Deal) {
    const size = parseFloat(deal.dealSize) || 0
    const ltv = parseFloat(deal.ltv) || 60
    const rate = parseFloat(deal.interestRate) || 5.5
    const riskNum = parseInt(deal.riskRating) || 5

    let baseScore = 80
    if (ltv > 70) baseScore -= 15
    else if (ltv > 65) baseScore -= 8
    if (riskNum > 7) baseScore -= 20
    else if (riskNum > 5) baseScore -= 10
    if (deal.internalRiskFlag) baseScore -= 10
    if (deal.collateral.includes('Government Guarantee')) baseScore += 8
    if (deal.collateral.includes('Unsecured')) baseScore -= 12

    const score = Math.min(95, Math.max(25, baseScore))
    const margin = (rate - 2.5).toFixed(2)
    const allInRate = (rate + 0.35).toFixed(2)
    const roe = ((score / 100) * 18).toFixed(1)

    let verdict: 'PROCEED' | 'PROCEED WITH CONDITIONS' | 'DECLINE'
    let verdictColor: string
    if (score >= 70) { verdict = 'PROCEED'; verdictColor = 'success' }
    else if (score >= 45) { verdict = 'PROCEED WITH CONDITIONS'; verdictColor = 'warning' }
    else { verdict = 'DECLINE'; verdictColor = 'danger' }

    const riskFlags = []
    if (ltv > 65) riskFlags.push(`LTV of ${ltv}% above preferred threshold (65%)`)
    if (riskNum > 6) riskFlags.push(`Elevated borrower risk rating (${deal.riskRating})`)
    if (deal.internalRiskFlag) riskFlags.push('Internal risk flag raised by analyst')
    if (deal.sector === 'Real Estate') riskFlags.push('Sector concentration risk: Real Estate')
    if (!deal.collateral.length || deal.collateral.includes('Unsecured')) riskFlags.push('No tangible collateral provided')

    const strengths = []
    if (rate > 6) strengths.push('Strong margin relative to benchmark')
    if (deal.collateral.includes('Government Guarantee')) strengths.push('Government guarantee significantly reduces credit risk')
    if (deal.collateral.includes('Real Estate')) strengths.push('Real estate collateral provides tangible security')
    if (riskNum <= 4) strengths.push('Strong borrower credit profile')
    if (size < 5000000) strengths.push('Deal size within standard appetite parameters')
    if (!strengths.length) strengths.push('Relationship-driven opportunity with existing client')

    const conditions = []
    if (ltv > 65) conditions.push('Cap LTV to 65% or provide additional collateral')
    if (!deal.collateral.includes('Government Guarantee') && riskNum > 5) conditions.push('Obtain independent borrower financial statements (2 years audited)')
    if (deal.sector === 'Real Estate') conditions.push('Independent property valuation required prior to drawdown')
    if (deal.internalRiskFlag) conditions.push('Risk flag to be reviewed and signed off by senior credit officer')
    if (!conditions.length) conditions.push('Standard KYC documentation and covenant package to be agreed')

    return { score, verdict, verdictColor, margin, allInRate, roe, riskFlags, strengths, conditions }
}

const verdictStyles: Record<string, string> = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
}

export default function ResultsPage() {
    const [deal, setDeal] = useState<Deal | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem('dealiq_deal')
        if (stored) setDeal(JSON.parse(stored))
    }, [])

    if (!deal) {
        return (
            <div className="min-h-screen bg-bg-light font-display">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <p className="text-neutral-slate text-lg">No deal loaded. <Link href="/deal-input" className="text-accent font-semibold hover:underline">Start a new assessment →</Link></p>
                </div>
            </div>
        )
    }

    const r = generateResult(deal)
    const scoreColor = r.verdictColor === 'success' ? '#059669' : r.verdictColor === 'warning' ? '#f59e0b' : '#dc2626'
    const circumference = 2 * Math.PI * 38
    const dashOffset = circumference - (r.score / 100) * circumference

    return (
        <div className="min-h-screen bg-bg-light font-display">
            <Navbar />
            <div className="max-w-5xl mx-auto px-6 py-10 pb-32">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-neutral-slate mb-6">
                    <Link href="/deal-input" className="hover:text-primary transition-colors">New Deal</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">Results</span>
                </div>

                {/* Deal Summary Strip */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 mb-6">
                    <div className="flex flex-wrap items-center gap-6">
                        <div>
                            <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider">Borrower</p>
                            <p className="text-lg font-bold text-gray-900 mt-0.5">{deal.borrowerName || 'Unnamed Borrower'}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                        <div>
                            <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider">Facility Amount</p>
                            <p className="text-lg font-bold text-gray-900 mt-0.5">{deal.currency} {Number(deal.dealSize).toLocaleString()}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                        <div>
                            <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider">Structure</p>
                            <p className="text-lg font-bold text-gray-900 mt-0.5">{deal.facilityType || '—'}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                        <div>
                            <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider">Sector</p>
                            <p className="text-lg font-bold text-gray-900 mt-0.5">{deal.sector || '—'}</p>
                        </div>
                    </div>
                </div>

                {/* Verdict Hero */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 mb-6 text-center">
                    <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full border font-bold text-lg tracking-wide mb-8 ${verdictStyles[r.verdictColor]}`}>
                        {r.verdict === 'PROCEED' ? '✓' : r.verdict === 'PROCEED WITH CONDITIONS' ? '⚠' : '✗'} {r.verdict}
                    </div>
                    <div className="flex items-center justify-center gap-16">
                        <div className="flex flex-col items-center">
                            <svg width="100" height="100" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke={scoreColor} strokeWidth="8"
                                    strokeDasharray={circumference} strokeDashoffset={dashOffset}
                                    strokeLinecap="round" transform="rotate(-90 50 50)" />
                                <text x="50" y="46" textAnchor="middle" fontSize="22" fontWeight="800" fill="#111827">{r.score}</text>
                                <text x="50" y="60" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7280">/100</text>
                            </svg>
                            <p className="text-xs font-bold text-neutral-slate uppercase tracking-wider mt-1">Profitability Score</p>
                        </div>
                        <div className="flex gap-12">
                            <div>
                                <p className="text-3xl font-extrabold text-gray-900">{r.allInRate}%</p>
                                <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider mt-1">All-in Rate</p>
                            </div>
                            <div>
                                <p className="text-3xl font-extrabold text-gray-900">{r.roe}%</p>
                                <p className="text-xs font-semibold text-neutral-slate uppercase tracking-wider mt-1">Target ROE</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3-col cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Pricing */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Indicative Pricing</h3>
                        <dl className="space-y-3">
                            {[
                                ['Margin over benchmark', `${r.margin}%`],
                                ['Arrangement Fee', '1.00%'],
                                ['All-in Rate', `${r.allInRate}%`],
                                ['Target ROE', `${r.roe}%`],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between">
                                    <dt className="text-sm text-neutral-slate">{label}</dt>
                                    <dd className="text-sm font-bold text-gray-900">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    {/* Risk Flags */}
                    <div className="bg-white rounded-xl border-l-4 border-l-warning border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Risk Flags</h3>
                        {r.riskFlags.length === 0 ? (
                            <p className="text-sm text-neutral-slate">No significant risk flags identified.</p>
                        ) : (
                            <ul className="space-y-2">
                                {r.riskFlags.map(flag => (
                                    <li key={flag} className="flex gap-2 text-sm text-slate-700">
                                        <span className="text-warning mt-0.5">⚠</span> {flag}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Strengths */}
                    <div className="bg-white rounded-xl border-l-4 border-l-success border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Deal Strengths</h3>
                        <ul className="space-y-2">
                            {r.strengths.map(s => (
                                <li key={s} className="flex gap-2 text-sm text-slate-700">
                                    <span className="text-success mt-0.5">✓</span> {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Conditions */}
                {r.conditions.length > 0 && (
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 mb-6">
                        <h3 className="font-bold text-gray-900 mb-4">Conditions to Proceed</h3>
                        <ol className="space-y-2">
                            {r.conditions.map((c, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-700">
                                    <span className="size-5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    {c}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Executive Summary */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Executive Summary</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {deal.borrowerName || 'The borrower'} has requested a {deal.facilityType?.toLowerCase() || 'credit facility'} of {deal.currency} {Number(deal.dealSize).toLocaleString()} for a term of {deal.tenor || 'N/A'} months in the {deal.sector || 'unspecified'} sector.
                        The AI assessment returns a profitability score of <strong>{r.score}/100</strong> with a verdict of <strong>{r.verdict}</strong>.
                        The indicative all-in rate of <strong>{r.allInRate}%</strong> and target return on equity of <strong>{r.roe}%</strong> reflect the
                        {riskFlags(deal, r)} profile of this transaction.{' '}
                        {r.conditions.length > 0
                            ? `The bank should proceed subject to the ${r.conditions.length} condition(s) listed above being satisfied prior to credit approval.`
                            : 'Standard documentation and covenant requirements apply.'}
                    </p>
                    <p className="text-xs text-slate-400 italic mt-4 pt-4 border-t border-slate-100">
                        For discussion purposes only — indicative analysis generated by DealIQ AI. This does not constitute a formal credit approval or commitment.
                    </p>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 px-6 py-4 flex items-center justify-between z-50">
                <Link href="/deal-input" className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm">
                    ← New Assessment
                </Link>
                <div className="flex gap-3">
                    <Link href="/deal-history" className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm">
                        Save to History
                    </Link>
                    <button onClick={() => window.print()}
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 text-sm">
                        Export PDF →
                    </button>
                </div>
            </div>
        </div>
    )
}

function riskFlags(deal: Deal, r: ReturnType<typeof generateResult>): string {
    if (r.riskFlags.length === 0) return ' generally favourable credit'
    return ` risk-adjusted credit`
}
