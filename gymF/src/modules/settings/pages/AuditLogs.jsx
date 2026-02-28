import React from 'react';
import {
    Shield,
    Activity,
    RefreshCw,
    Download,
    Search,
    Calendar,
    Filter,
    Clock,
    User,
    Table as TableIcon,
    ChevronDown,
    ClipboardList
} from 'lucide-react';

const AuditLogs = () => {
    const stats = [
        { label: 'Total Logs', value: '0', color: 'slate', icon: Shield },
        { label: "Today's Activity", value: '0', color: 'indigo', icon: Activity },
        { label: 'Most Active', value: 'N/A', color: 'violet', icon: User },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50/30 min-h-screen p-6 md:p-8 font-sans pb-24 text-slate-800">
            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                            <div className={`w-12 h-12 bg-${card.color}-50 text-${card.color}-600 rounded-xl flex items-center justify-center`}>
                                <card.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{card.label}</p>
                                <h3 className="text-2xl font-black text-slate-800">{card.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination & Header info removed Page 1 / 1 */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Audit Logs</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                            <RefreshCw size={18} />
                            Refresh
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-violet-500/30 transition-all shadow-md active:scale-95">
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Filter size={18} className="text-slate-800" />
                        <h3 className="text-sm font-black text-slate-800 tracking-tight">Filters</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Search</label>
                            <div className="relative group">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Actor, table, record..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Action Dropdown */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Action</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 appearance-none focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all cursor-pointer">
                                    <option>All Actions</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Table Dropdown */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Table</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 appearance-none focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all cursor-pointer">
                                    <option>All Tables</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        {/* From Date */}
                        {/* From Date */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">From</label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    defaultValue="2026-02-21"
                                    className="w-full pl-4 pr-11 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 transition-all outline-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* To Date */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">To</label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    defaultValue="2026-02-28"
                                    className="w-full pl-4 pr-11 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 transition-all outline-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Activity Section */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col mb-8">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Activity Timeline (0 records)</h2>
                </div>

                {/* Empty State */}
                <div className="bg-white/40 backdrop-blur-md rounded-[32px] border border-white/50 overflow-hidden py-32 text-center">
                    <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <ClipboardList size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-400 tracking-tight">No audit logs found</h3>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
