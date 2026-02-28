import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    CheckCircle2,
    Activity,
    History,
    AlertCircle,
    ListTodo,
    Loader2
} from 'lucide-react';

const TrainerRequests = ({ role }) => {
    // State
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Types');

    // Stats
    const stats = [
        { label: 'Pending', value: '0', color: 'amber', icon: Clock },
        { label: 'Approved Today', value: '0', color: 'emerald', icon: CheckCircle2 },
        { label: 'Rejected Today', value: '0', color: 'rose', icon: XCircle },
    ];

    // Filter Options
    const filters = ['All Types', 'Pending', 'Approved', 'Rejected'];

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50/30 min-h-screen p-6 md:p-8 font-sans pb-24 text-slate-800">
            {/* Header section */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Approval Queue
                        </h1>
                        <p className="text-slate-500 font-bold mt-1">Review and process pending requests</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 bg-${card.color}-50 text-${card.color}-600 rounded-xl flex items-center justify-center transition-transform`}>
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

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-600 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by member name or code..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-600/10 focus:border-violet-600 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto no-scrollbar whitespace-nowrap">
                            <Filter size={14} className="text-slate-400" />
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setStatusFilter(filter)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${statusFilter === filter
                                            ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                                            : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Section */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center gap-2 border-b border-slate-100">
                    <button className="px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 border-violet-600 text-violet-600 transition-all">
                        All
                    </button>
                </div>
            </div>

            {/* Empty State Message */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm border border-white/50 py-24 text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">All caught up!</h3>
                    <p className="text-slate-500 font-bold">No pending requests.</p>
                </div>
            </div>
        </div>
    );
};

export default TrainerRequests;
