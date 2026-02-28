import React, { useState } from 'react';
import {
    Banknote,
    TrendingUp,
    Calendar,
    Users,
    FileText,
    Info,
    ChevronRight,
    Search,
    Download,
    Clock,
    X,
    Printer
} from 'lucide-react';
import StatsCard from '../../modules/dashboard/components/StatsCard';
import DashboardGrid from '../../modules/dashboard/components/DashboardGrid';
import Card from '../../components/ui/Card';

// Component for the printable document (hidden on screen, visible during print)
const PrintablePayslip = () => {
    return (
        <div className="hidden print:block printable-payslip-content p-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-[#484fa2] mb-1 tracking-tight">Main Branch</h1>
                <p className="text-slate-500 font-bold text-sm">Pay Period: February 2026</p>
            </div>

            <div className="w-full h-px bg-[#484fa2]/30 mb-10" />

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-12">
                <div className="flex justify-between text-sm">
                    <span className="font-black text-[#484fa2]">Employee:</span>
                    <span className="text-slate-700 font-bold">Demo Trainer</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-black text-[#484fa2]">Code:</span>
                    <span className="text-slate-700 font-bold">mock-tra</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-black text-[#484fa2]">Department:</span>
                    <span className="text-slate-700 font-bold">Training</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-black text-[#484fa2]">Position:</span>
                    <span className="text-slate-700 font-bold">Personal Trainer</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-black text-[#484fa2]">Days Present:</span>
                    <span className="text-slate-700 font-bold">0 / 26</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-black text-[#484fa2]">Base Salary:</span>
                    <span className="text-slate-700 font-bold">₹0</span>
                </div>
            </div>

            <table className="w-full mb-12 border-collapse">
                <thead>
                    <tr className="border-b-2 border-slate-100">
                        <th className="py-4 text-left font-black text-[#484fa2] uppercase tracking-wider text-xs">Component</th>
                        <th className="py-4 text-right font-black text-[#484fa2] uppercase tracking-wider text-xs">Amount (₹)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    <tr>
                        <td className="py-4 text-sm font-bold text-slate-600">Pro-rated Base Pay</td>
                        <td className="py-4 text-right text-sm font-black text-slate-900">0</td>
                    </tr>
                    <tr>
                        <td className="py-4 text-sm font-bold text-slate-600">PT Session Commission</td>
                        <td className="py-4 text-right text-sm font-black text-slate-900">0</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                        <td className="py-4 text-sm font-black text-slate-900">Gross Pay</td>
                        <td className="py-4 text-right text-sm font-black text-slate-900">0</td>
                    </tr>
                    <tr>
                        <td className="py-4 text-sm font-bold text-red-500">PF Deduction (12%)</td>
                        <td className="py-4 text-right text-sm font-black text-red-500">-0</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="border-t-2 border-[#484fa2]">
                        <td className="py-5 text-lg font-black text-[#484fa2]">Net Pay</td>
                        <td className="py-5 text-right text-xl font-black text-slate-900 tracking-tight">₹0</td>
                    </tr>
                </tfoot>
            </table>

            <div className="text-center mt-20 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Generated on 28/2/2026 • This is a computer-generated payslip
                </p>
            </div>
        </div>
    );
};

const TrainerEarnings = () => {
    const [activeMonth, setActiveMonth] = useState('Feb 2026');
    const [loading, setLoading] = useState(false);

    const months = ['Feb 2026', 'Jan 2026', 'Dec 2025'];

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 min-h-screen bg-slate-50">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium tracking-tight">Loading your earnings...</p>
        </div>
    );

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="saas-container space-y-8 fade-in h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent relative">

            {/* Printable Payslip Structure */}
            <PrintablePayslip />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100 print:hidden">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                        My Earnings
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Trainer Portal</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Track your sessions and earnings
                        </p>
                    </div>
                </div>
            </div>

            {/* Month Selector Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100/50 rounded-2xl w-fit print:hidden">
                {months.map((month) => (
                    <button
                        key={month}
                        onClick={() => setActiveMonth(month)}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMonth === month
                            ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-500/10'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {month}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="print:hidden">
                <DashboardGrid>
                    <StatsCard
                        title="Completed Sessions (0)"
                        value="February 2026"
                        icon={Calendar}
                        color="primary"
                        isEarningsLayout={true}
                    />
                    <StatsCard
                        title="Session Rate (₹500)"
                        value="Per session"
                        icon={Banknote}
                        color="success"
                        isEarningsLayout={true}
                    />
                    <StatsCard
                        title="Estimated Earnings (₹0)"
                        value="From sessions"
                        icon={TrendingUp}
                        color="info"
                        isEarningsLayout={true}
                    />
                    <StatsCard
                        title="Commissions (₹0)"
                        value="Package sales"
                        icon={Users}
                        color="warning"
                        isEarningsLayout={true}
                    />
                </DashboardGrid>
            </div>

            {/* Total Section & Payslip */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start print:hidden">
                <Card className="lg:col-span-2 !p-8 space-y-8 border-2 border-slate-100 shadow-2xl shadow-slate-100/20">
                    <div className="flex items-center justify-between text-left">
                        <div className="space-y-1 pl-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                                Total Estimated Earnings — February 2026
                            </h3>
                            <p className="text-5xl font-black text-slate-900 tracking-tighter italic">₹0</p>
                        </div>
                    </div>
                    <div className="pt-8 border-t-2 border-slate-50 text-left pl-4">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Breakdown</h4>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm text-slate-600 leading-relaxed text-left flex items-center">
                                <span>Base: <span className="text-slate-900">₹0</span> +
                                    Sessions: <span className="text-slate-900">₹0</span> +
                                    Commission: <span className="text-slate-900">₹0</span> −
                                    PF: <span className="text-red-500 font-black">₹0</span></span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-col items-center text-center p-8 border-2 border-indigo-100 shadow-2xl shadow-indigo-100/20 bg-gradient-to-br from-white to-indigo-50/30">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-lg border border-indigo-50 mb-6 transform hover:scale-110 transition-transform">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Monthly Statement</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 px-4">Detailed breakdown of your monthly payouts</p>
                    <button
                        onClick={handlePrint}
                        className="w-full h-12 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
                    >
                        Download Payslip
                    </button>
                </Card>
            </div>

            {/* Completed Sessions Section */}
            <div className="space-y-6 print:hidden">
                <div className="flex items-center gap-3 px-1 text-left pl-4">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Clock size={16} />
                    </div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Completed Sessions — February 2026</h2>
                </div>

                <Card className="py-24 flex flex-col items-center justify-center text-slate-400 bg-white border-2 border-dashed border-slate-100 rounded-[2rem]">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110">
                        <Calendar size={32} strokeWidth={1} className="opacity-20" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 px-6 text-center">No session records found for the selected period</p>
                </Card>
            </div>

            {/* Information Card */}
            <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 text-left print:hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-inner flex-shrink-0">
                        <Info size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight mb-2">Earnings Calculation</h3>
                        <p className="text-xs text-white/70 font-bold leading-relaxed max-w-4xl uppercase tracking-wider">
                            Earnings shown are estimates based on completed sessions and base salary. Final payment may vary based on commission structure, deductions, and company policies. Download your payslip for detailed breakdown.
                        </p>
                    </div>
                </div>
            </div>

            {/* Typography & Custom Print standard mapping */}
            {/* Custom Print styles */}
            <style>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    .saas-container {
                        overflow: visible !important;
                        height: auto !important;
                        padding: 0 !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default TrainerEarnings;
