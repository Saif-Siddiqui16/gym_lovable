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
    const [activeMonth, setActiveMonth] = useState('Mar 2026');
    const [loading, setLoading] = useState(false);

    const months = ['Mar 2026', 'Feb 2026', 'Jan 2026'];

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
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 print:hidden">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                        My Earnings
                    </h1>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-indigo-100">Trainer Portal</span>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                            Track your sessions and earnings
                        </p>
                    </div>
                </div>
            </div>

            {/* Month Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/50 rounded-2xl w-full sm:w-fit print:hidden overflow-x-auto no-scrollbar scrollbar-hide">
                {months.map((month) => (
                    <button
                        key={month}
                        onClick={() => setActiveMonth(month)}
                        className={`flex-1 sm:flex-none px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeMonth === month
                            ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100'
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
                        title="Completed Sessions"
                        value="0"
                        subtitle={activeMonth === 'Mar 2026' ? "March 2026" : activeMonth}
                        icon={Calendar}
                        color="primary"
                    />
                    <StatsCard
                        title="Session Rate"
                        value="₹500"
                        subtitle="Per session"
                        icon={Banknote}
                        color="success"
                    />
                    <StatsCard
                        title="Estimated Earnings"
                        value="₹0"
                        subtitle="From sessions"
                        icon={TrendingUp}
                        color="info"
                    />
                    <StatsCard
                        title="Commissions"
                        value="₹0"
                        subtitle="Package sales"
                        icon={Users}
                        color="warning"
                    />
                </DashboardGrid>
            </div>

            {/* Total Section & Payslip */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start print:hidden">
                <Card className="lg:col-span-2 p-6 md:p-8 space-y-6 md:space-y-8 border-2 border-slate-100 shadow-xl shadow-slate-100/20">
                    <div className="text-left">
                        <div className="space-y-2">
                            <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Total Estimated Earnings — {activeMonth === 'Mar 2026' ? "March 2026" : activeMonth}
                            </h3>
                            <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic">₹0</p>
                        </div>
                    </div>
                    <div className="pt-6 md:pt-8 border-t-2 border-slate-50 text-left">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Breakdown</h4>
                            <div className="p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 font-bold text-[11px] md:text-sm text-slate-600 leading-relaxed text-left flex items-center overflow-x-auto no-scrollbar whitespace-nowrap">
                                <span>Base: <span className="text-slate-900">₹0</span> +
                                    Sessions: <span className="text-slate-900">₹0</span> +
                                    Commission: <span className="text-slate-900">₹0</span> −
                                    PF: <span className="text-red-500 font-black">₹0</span></span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-col items-center text-center p-6 md:p-8 border-2 border-indigo-100 shadow-xl shadow-indigo-100/20 bg-gradient-to-br from-white to-indigo-50/10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-indigo-600 shadow-lg border border-indigo-50 mb-4 md:mb-6 transform hover:scale-110 transition-transform">
                        <FileText size={28} className="md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-[11px] md:text-sm font-black text-slate-900 uppercase tracking-widest mb-1 md:mb-2">Payslip</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 md:mb-8 px-2 md:px-4">Detailed breakdown of your monthly payouts</p>
                    <button
                        onClick={handlePrint}
                        className="w-full h-11 md:h-12 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
                    >
                        Download Payslip
                    </button>
                </Card>
            </div>

            {/* Completed Sessions Section */}
            <div className="space-y-4 md:space-y-6 print:hidden">
                <div className="flex items-center gap-3 px-1 text-left">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Clock size={16} />
                    </div>
                    <h2 className="text-[11px] md:text-sm font-black text-slate-900 uppercase tracking-widest">Completed Sessions — {activeMonth === 'Mar 2026' ? "March 2026" : activeMonth}</h2>
                </div>

                <Card className="py-16 md:py-24 flex flex-col items-center justify-center text-slate-400 bg-white border-2 border-dashed border-slate-100 rounded-2xl md:rounded-[2rem]">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110">
                        <Calendar size={24} strokeWidth={1} className="md:w-8 md:h-8 opacity-20" />
                    </div>
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 px-6 text-center">No completed sessions this month</p>
                </Card>
            </div>

            {/* Information Card */}
            <div className="p-6 md:p-8 bg-indigo-50 rounded-2xl md:rounded-[2rem] border border-indigo-100 text-left print:hidden shadow-sm">
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 shrink-0">
                        <Info size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm md:text-lg font-black text-indigo-900 tracking-tight mb-1 md:mb-2 uppercase">Earnings Calculation</h3>
                        <p className="text-[9px] md:text-xs text-indigo-600/80 font-bold leading-relaxed max-w-4xl uppercase tracking-widest">
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
