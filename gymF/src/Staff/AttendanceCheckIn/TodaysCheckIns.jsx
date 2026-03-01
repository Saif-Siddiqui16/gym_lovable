import React, { useState } from 'react';
import { Users, Clock, Search, Maximize, ArrowUpRight, ArrowDownLeft, UserCircle } from 'lucide-react';
import '../../styles/GlobalDesign.css';

const TodaysCheckIns = () => {
    const [activeTab, setActiveTab] = useState('currentlyIn');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-8 space-y-6 animate-fadeIn">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                        <Maximize size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Attendance</h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-0.5">Quick check-in / check-out</p>
                    </div>
                </div>

                {/* Header Stats */}
                <div className="flex items-center gap-6 bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                        <span className="text-sm font-bold text-slate-900">0 <span className="text-slate-400 font-medium">In</span></span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-200 pl-6 text-emerald-600">
                        <ArrowDownLeft size={16} />
                        <span className="text-sm font-bold">0 <span className="text-slate-400 font-medium ml-1">Today</span></span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-200 pl-6 text-rose-500">
                        <ArrowUpRight size={16} />
                        <span className="text-sm font-bold">0 <span className="text-slate-400 font-medium ml-1">Out</span></span>
                    </div>
                </div>
            </div>

            {/* Search Bar Section */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-violet-500 transition-colors">
                    <Maximize size={20} />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Scan barcode or type member code / name / phone..."
                    className="w-full h-16 pl-14 pr-32 rounded-[1.25rem] bg-white border-2 border-slate-100 text-sm font-semibold placeholder:text-slate-300 focus:border-violet-500 focus:ring-8 focus:ring-violet-500/5 transition-all outline-none shadow-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200 hover:scale-105 transition-all flex items-center gap-2">
                    <Search size={14} /> Search
                </button>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {/* Tabs */}
                <div className="p-2 border-b border-slate-50 flex items-center gap-2 bg-slate-50/50">
                    <button
                        onClick={() => setActiveTab('currentlyIn')}
                        className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'currentlyIn' ? 'bg-white text-violet-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Users size={16} /> Currently In (0)
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-violet-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Clock size={16} /> Today's Log (0)
                    </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-5 px-8 py-5 border-b border-slate-50 bg-white">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Code</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-in</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</span>
                </div>

                {/* Table Body / Empty State */}
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-20 animate-fadeIn">
                    <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                        <UserCircle size={48} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">No members currently checked in</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Scan a barcode or search to get started</p>
                </div>
            </div>

        </div>
    );
};

export default TodaysCheckIns;
