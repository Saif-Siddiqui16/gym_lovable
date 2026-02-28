import React, { useState } from 'react';
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
    Loader2
} from 'lucide-react';

const WebhookSettings = () => {
    const [activeTab, setActiveTab] = useState('All');

    const stats = [
        { label: 'Total Errors', value: '0', color: 'rose', icon: AlertCircle },
        { label: 'Open', value: '0', color: 'amber', icon: Clock },
        { label: 'Resolved', value: '0', color: 'emerald', icon: CheckCircle2 },
        { label: 'Today', value: '0', color: 'indigo', icon: ListTodo },
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

                {/* Empty State */}
                <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm border border-white/50 overflow-hidden py-24 text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">No errors found. System is healthy!</h3>
                </div>
            </div>
        </div>
    );
};

export default WebhookSettings;
