'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const sectors = ['Banking', 'Manufacturing', 'Agriculture', 'Real Estate', 'Energy', 'Infrastructure', 'Other']
const facilityTypes = ['Term Loan', 'Revolving Credit', 'Trade Finance', 'Project Finance', 'Syndicated Loan']
const collateralOptions = ['Real Estate', 'Equipment', 'Government Guarantee', 'Cash Deposit', 'Unsecured']
const riskRatings = ['1 (Excellent)', '2', '3', '4', '5 (Moderate)', '6', '7', '8', '9', '10 (High Risk)']
const currencies = ['EUR', 'USD', 'GBP']

export default function DealInputPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        borrowerName: '', sector: '', country: '', riskRating: '',
        dealSize: '', currency: 'EUR', facilityType: '', tenor: '',
        collateral: [] as string[], ltv: '', interestRate: '',
        purpose: '', internalRiskFlag: false,
    })
    const [loading, setLoading] = useState(false)

    function set(field: string, value: string | boolean | string[]) {
        setForm(f => ({ ...f, [field]: value }))
    }

    function toggleCollateral(opt: string) {
        set('collateral', form.collateral.includes(opt)
            ? form.collateral.filter(c => c !== opt)
            : [...form.collateral, opt])
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        // Store deal in session to show on results page
        sessionStorage.setItem('dealiq_deal', JSON.stringify(form))
        router.push('/results')
    }

    return (
        <div className="min-h-screen bg-bg-light font-display">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
                {/* Main Form */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">New Deal Assessment</h1>
                        <p className="text-neutral-slate mt-1">
                            Enter deal parameters below to receive an instant AI-powered profitability analysis.{' '}
                            <span className="italic">All outputs are indicative.</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section A */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">A — Borrower Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Borrower Name</label>
                                    <input type="text" required value={form.borrowerName} onChange={e => set('borrowerName', e.target.value)}
                                        placeholder="e.g. Meridian Capital Partners"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Sector / Industry</label>
                                    <select required value={form.sector} onChange={e => set('sector', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                        <option value="">Select sector</option>
                                        {sectors.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Country / Jurisdiction</label>
                                    <input type="text" value={form.country} onChange={e => set('country', e.target.value)}
                                        placeholder="e.g. Netherlands"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Borrower Risk Rating</label>
                                    <select value={form.riskRating} onChange={e => set('riskRating', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                        <option value="">Select rating (1–10)</option>
                                        {riskRatings.map(r => <option key={r}>{r}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section B */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">B — Deal Structure</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Deal Size</label>
                                    <div className="flex">
                                        <select value={form.currency} onChange={e => set('currency', e.target.value)}
                                            className="px-3 py-2.5 border border-r-0 border-slate-200 rounded-l-lg bg-slate-50 text-sm font-semibold outline-none">
                                            {currencies.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                        <input type="number" required value={form.dealSize} onChange={e => set('dealSize', e.target.value)}
                                            placeholder="0"
                                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-r-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Facility Type</label>
                                    <select required value={form.facilityType} onChange={e => set('facilityType', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                        <option value="">Select facility</option>
                                        {facilityTypes.map(f => <option key={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tenor / Term (months)</label>
                                    <input type="number" value={form.tenor} onChange={e => set('tenor', e.target.value)}
                                        placeholder="e.g. 60"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">LTV %</label>
                                    <div className="relative">
                                        <input type="number" value={form.ltv} onChange={e => set('ltv', e.target.value)}
                                            placeholder="e.g. 65"
                                            className="w-full px-4 py-2.5 pr-8 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">%</span>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Collateral Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {collateralOptions.map(opt => (
                                            <button key={opt} type="button" onClick={() => toggleCollateral(opt)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${form.collateral.includes(opt)
                                                        ? 'bg-primary text-white border-primary'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary'
                                                    }`}>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section C */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">C — Pricing & Purpose</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Proposed Interest Rate %</label>
                                    <div className="relative">
                                        <input type="number" step="0.01" value={form.interestRate} onChange={e => set('interestRate', e.target.value)}
                                            placeholder="e.g. 5.50"
                                            className="w-full px-4 py-2.5 pr-8 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">%</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pt-6">
                                    <label className="text-sm font-semibold text-slate-700">Internal Risk Flag</label>
                                    <button type="button" onClick={() => set('internalRiskFlag', !form.internalRiskFlag)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${form.internalRiskFlag ? 'bg-warning' : 'bg-slate-300'}`}>
                                        <span className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow transition-transform ${form.internalRiskFlag ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-neutral-slate">{form.internalRiskFlag ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Deal Purpose</label>
                                    <textarea value={form.purpose} onChange={e => set('purpose', e.target.value)}
                                        rows={3} placeholder="Brief description of the deal purpose and use of proceeds…"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 -mx-6 px-6 py-4">
                            <button type="button" onClick={() => setForm(f => ({ ...f, borrowerName: '', sector: '', country: '', riskRating: '', dealSize: '', facilityType: '', tenor: '', collateral: [], ltv: '', interestRate: '', purpose: '' }))}
                                className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm">
                                Clear Form
                            </button>
                            <button type="submit" disabled={loading}
                                className="px-8 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 text-sm flex items-center gap-2">
                                {loading ? 'Running analysis…' : 'Run AI Assessment →'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar */}
                <div className="hidden xl:block w-72 shrink-0">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-24">
                        <h3 className="font-bold text-slate-800 mb-4">What happens next?</h3>
                        <ol className="space-y-4">
                            {[
                                { n: '1', title: 'AI analysis runs', desc: 'Claude analyses your deal parameters against pricing and credit benchmarks.' },
                                { n: '2', title: 'Verdict in seconds', desc: 'Profitability score, all-in rate, ROE and recommendation returned instantly.' },
                                { n: '3', title: 'Export as PDF', desc: 'Clean report suitable for internal credit committee discussion.' },
                            ].map(step => (
                                <li key={step.n} className="flex gap-3">
                                    <span className="size-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step.n}</span>
                                    <div>
                                        <p className="font-semibold text-slate-800 text-sm">{step.title}</p>
                                        <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-400 italic">All outputs are indicative and for discussion purposes only. Not a formal credit decision.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
