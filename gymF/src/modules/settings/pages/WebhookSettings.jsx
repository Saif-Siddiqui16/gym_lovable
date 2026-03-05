import React, { useState, useEffect } from 'react';
import {
    Activity,
    Shield,
    AlertCircle,
    Clock,
    CheckCircle2,
    ListTodo,
    Filter,
    Search,
    Terminal,
    Loader2,
    User,
    Building
} from 'lucide-react';
import { fetchSystemHealthAPI } from '../../../api/admin/adminApi';
import { useBranchContext } from '../../../context/BranchContext';
import toast from 'react-hot-toast';

const WebhookSettings = () => {
    const { selectedBranch } = useBranchContext();
    const [activeTab, setActiveTab] = useState('All');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ logs: [], stats: { total: '0', open: '0', resolved: '0', today: '0' } });

    useEffect(() => {
        loadData();
    }, [selectedBranch, activeTab]);

    const loadData = async () => {
        try {
            setLoading(true);
            const branchId = selectedBranch === 'all' ? 'all' : selectedBranch;
            const res = await fetchSystemHealthAPI({
                branchId,
                status: activeTab === 'All' ? undefined : activeTab
            });
            setData(res);
        } catch (error) {
            toast.error('Failed to load system health data');
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { label: 'Total Errors', value: data.stats.total, color: 'rose', icon: AlertCircle },
        { label: 'Open', value: data.stats.open, color: 'amber', icon: Clock },
        { label: 'Resolved', value: data.stats.resolved, color: 'emerald', icon: CheckCircle2 },
        { label: 'Today', value: data.stats.today, color: 'indigo', icon: ListTodo },
    ];

    const tabs = ['All', 'Open', 'Resolved'];

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50/30 min-h-screen p-6 md:p-8 font-sans pb-24 text-slate-800">
            {/* Header section matching exact text */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            System Health
                        </h1>
                        <p className="text-slate-500 font-bold mt-1">Monitor frontend errors and generate AI fix prompts.</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 bg-${card.color}-50 text-${card.color}-600 rounded-xl flex items-center justify-center transition-transform hover:scale-110`}>
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

            {/* Section: Error Logs */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col mb-6">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Error Logs</h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-100">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab
                                ? 'border-violet-600 text-violet-600'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="py-24 text-center">
                        <Loader2 className="animate-spin mx-auto text-violet-500 mb-4" size={40} />
                        <p className="text-slate-500 font-bold">Synchronizing with system logs...</p>
                    </div>
                ) : data.logs.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm border border-white/50 overflow-hidden py-24 text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">No errors found. System is healthy!</h3>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {data.logs.map(log => (
                            <div key={log.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${log.status === 'Open' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                            {log.status}
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                                        <Terminal size={12} />
                                        {log.action}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-black text-slate-900 mb-1">{log.affectedEntity || 'System Error'}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-bold bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono">
                                        {log.details}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                <User size={12} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{log.user}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Building className="text-slate-400" size={14} />
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{log.branch}</span>
                                        </div>
                                    </div>

                                    <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-violet-600 transition-colors shadow-lg shadow-slate-200">
                                        Generate AI Fix
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebhookSettings;
