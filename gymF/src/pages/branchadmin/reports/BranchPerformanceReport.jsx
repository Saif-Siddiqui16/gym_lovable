import React, { useState } from 'react';
import { Activity, Download, Users, TrendingUp, IndianRupee, BarChart3, ShoppingBag, Package, ArrowUpRight } from 'lucide-react';
import '../../../styles/GlobalDesign.css';

// ─── ORIGINAL IMPORTS KEPT FOR REFERENCE (COMMENTED OUT) ───
// import { useState, useEffect } from 'react';
// import { Filter, Search, Calendar, Zap, Target, ArrowDownRight, Loader2 } from 'lucide-react';
// import apiClient from '../../../api/apiClient';

const BranchPerformanceReport = () => {
    const [activeOrderTab, setActiveOrderTab] = useState('New');

    const earningsMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const earningsValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const handleExport = () => {
        const headers = ['Month', 'Revenue (₹k)', 'Status'];
        const rows = earningsMonths.map((month, i) => [month, earningsValues[i], 'Demo']);
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', 'gym_analytics_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ─── ORIGINAL STATE & LOGIC (SAFELY COMMENTED OUT) ───
    /*
    const getToday = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getToday());
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState([
        { label: 'Revenue vs Expense', value: '0%', icon: TrendingUp, bg: 'bg-indigo-50', color: 'text-indigo-600', trend: 'up' },
        { label: 'Lead Conv. Rate', value: '0%', icon: Target, bg: 'bg-purple-50', color: 'text-purple-600', trend: 'up' },
        { label: 'Member Retention', value: '0%', icon: Activity, bg: 'bg-emerald-50', color: 'text-emerald-600', trend: 'up' },
    ]);
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/branch-admin/reports/performance', {
                params: { date: selectedDate }
            });
            const iconMap = { TrendingUp, Target, Activity };
            setStats(response.data.stats.map(s => ({ ...s, icon: iconMap[s.icon] || Activity })));
            setPerformanceData(response.data.performanceData);
        } catch (error) {
            console.error('Failed to fetch performance report:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReport(); }, [selectedDate]);

    const handleExport = () => {
        if (performanceData.length === 0) { alert("No data available to export."); return; }
        const headers = ["Month", "Revenue", "Expense", "Profit", "Margin", "Status"];
        const csvContent = [headers.join(","), ...performanceData.map(row =>
            [`"${row.month}"`, `"${row.revenue}"`, `"${row.expense}"`, `"${row.profit}"`, `"${row.margin}"`, `"${row.status}"`].join(",")
        )].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", `performance_report_${selectedDate}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    */

    const weeklyDays = ['Tue', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyValues = [0, 0, 0, 0, 0];
    const orderTabs = ['New', 'Processing', 'Completed'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-6">

            {/* ── Header ── */}
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl blur-2xl opacity-10 animate-pulse pointer-events-none"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                                <BarChart3 size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                                    Gym Analytics
                                </h1>
                                <p className="text-slate-600 text-sm mt-1">Complete business performance insights</p>
                            </div>
                        </div>
                        <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-indigo-500/30 self-start sm:self-auto relative z-10">
                            <Download size={18} />
                            Export Data
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Top KPI Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Members', value: '0', icon: Users, from: 'from-violet-500', to: 'to-purple-600' },
                    { label: 'Total Revenue', value: '₹0k', icon: IndianRupee, from: 'from-emerald-500', to: 'to-emerald-600' },
                    { label: 'Collection Rate', value: '0%', icon: TrendingUp, from: 'from-blue-500', to: 'to-blue-600' },
                    { label: 'Pending Dues', value: '₹0k', icon: Activity, from: 'from-fuchsia-500', to: 'to-fuchsia-600' },
                ].map((kpi, i) => (
                    <div key={i} className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-600 mb-2">{kpi.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 mb-2">{kpi.value}</h3>
                                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                    <ArrowUpRight size={14} className="text-emerald-500" />
                                    0% from last month
                                </p>
                            </div>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${kpi.from} ${kpi.to} flex items-center justify-center text-white shadow-lg transition-transform duration-300`}>
                                <kpi.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* ── Earning Reports Chart ── */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-2">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <BarChart3 className="text-indigo-600" size={18} />
                            Earning Reports
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">Revenue trends over the last 12 months</p>
                    </div>
                    <div className="h-52 flex items-end justify-between gap-1.5 px-2 pb-6 mt-6 border-b border-slate-100">
                        {earningsMonths.map((month, i) => {
                            const h = earningsValues[i] * 20;
                            return (
                                <div key={month} className="w-full bg-indigo-50 rounded-t-lg relative group/bar">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-500 cursor-pointer"
                                        style={{ height: `${h || 2}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                            ₹{earningsValues[i]}k
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 w-full text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                        {month}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Earnings Summary Cards */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        {[
                            { label: 'Earnings', value: '₹0', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                            { label: 'Profit', value: '₹0', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'Expenses', value: '₹0', color: 'text-rose-600', bg: 'bg-rose-50' },
                        ].map((item) => (
                            <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Member Retention ── */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Users className="text-violet-600" size={18} />
                            Member Retention
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">Membership status distribution</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                            <Users size={24} />
                        </div>
                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">No membership data yet</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* ── Weekly Earnings Chart ── */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-2">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <TrendingUp className="text-emerald-600" size={18} />
                            Weekly Earnings
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">This week's daily revenue</p>
                    </div>
                    <div className="h-36 flex items-end justify-between gap-2 px-2 pb-6 mt-6 border-b border-slate-100">
                        {weeklyDays.map((day, i) => {
                            const h = weeklyValues[i] * 20;
                            return (
                                <div key={day} className="w-full bg-emerald-50 rounded-t-lg relative group/bar">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all duration-500 cursor-pointer"
                                        style={{ height: `${h || 2}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                            ₹{weeklyValues[i]}k
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 w-full text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                        {day}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Net Profit ── */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="text-blue-600" size={18} />
                            Net Profit
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">Weekly income - expenses</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-28 h-28 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                            <p className="text-3xl font-black text-slate-900">₹0</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="bg-emerald-50 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Income</p>
                            <p className="text-base font-black text-emerald-600">₹0</p>
                            <p className="text-[9px] text-slate-400 font-medium">Payments collected</p>
                        </div>
                        <div className="bg-rose-50 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Expenses</p>
                            <p className="text-base font-black text-rose-600">₹0</p>
                            <p className="text-[9px] text-slate-400 font-medium">Approved expenses</p>
                        </div>
                    </div>
                </div>

                {/* ── Popular Products ── */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <ShoppingBag className="text-fuchsia-600" size={18} />
                            Popular Products
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">Total 0 items sold</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                            <Package size={24} />
                        </div>
                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">No product sales yet</p>
                    </div>
                </div>
            </div>

            {/* ── Recent Store Orders ── */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-8 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/30">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Package className="text-slate-600" size={18} />
                            Recent Store Orders
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">POS & store sales overview</p>
                    </div>
                    <div className="flex gap-2">
                        {orderTabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveOrderTab(tab)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeOrderTab === tab
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-16 bg-white">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-3">
                        <Package size={28} />
                    </div>
                    <p className="text-slate-500 font-black text-sm italic">No {activeOrderTab.toLowerCase()} orders</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ── Membership Growth ── */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <TrendingUp className="text-violet-600" size={18} />
                            Membership Growth
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">New and total members over time</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                            <Users size={24} />
                        </div>
                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">No member data yet</p>
                    </div>
                </div>

                {/* ── Revenue by Plan ── */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <IndianRupee className="text-emerald-600" size={18} />
                            Revenue by Plan
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">Top performing membership plans</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                            <Activity size={24} />
                        </div>
                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">No membership data yet</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BranchPerformanceReport;
