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
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 bg-white/50 backdrop-blur-md p-4 md:px-6 md:py-3 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
                    <div className="flex items-center justify-between md:justify-start gap-2 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                            <span className="text-[10px] md:text-sm font-bold text-slate-900">0 <span className="text-slate-400 font-medium tracking-normal">In</span></span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-start gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 text-emerald-600 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            <ArrowDownLeft size={16} />
                            <span className="text-[10px] md:text-sm font-bold">0 <span className="text-slate-400 font-medium ml-1 tracking-normal">Today</span></span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-start gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 text-rose-500 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            <ArrowUpRight size={16} />
                            <span className="text-[10px] md:text-sm font-bold">0 <span className="text-slate-400 font-medium ml-1 tracking-normal">Out</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar Section */}
            <div className="relative group w-full">
                <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-violet-500 transition-colors">
                    <Maximize size={20} />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Scan barcode or type member code / name / phone..."
                    className="w-full h-14 md:h-16 pl-12 md:pl-14 pr-32 rounded-2xl md:rounded-[1.25rem] bg-white border-2 border-slate-100 text-[11px] md:text-sm font-semibold placeholder:text-slate-300 focus:border-violet-500 focus:ring-8 focus:ring-violet-500/5 transition-all outline-none shadow-sm"
                />
                <button className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 h-10 md:h-10 px-4 md:px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <Search size={14} /> <span className="hidden md:inline">Search</span>
                </button>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {/* Tabs */}
                <div className="p-2 border-b border-slate-50 flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-slate-50/50">
                    <button
                        onClick={() => setActiveTab('currentlyIn')}
                        className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 px-4 md:px-6 py-3 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'currentlyIn' ? 'bg-white text-violet-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Users size={16} /> Currently In (0)
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 px-4 md:px-6 py-3 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-violet-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Clock size={16} /> Today's Log (0)
                    </button>
                </div>

                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-5 px-8 py-5 border-b border-slate-50 bg-white">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Code</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-in</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</span>
                </div>

                {/* Table Body / Empty State */}
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-10 md:p-20 animate-fadeIn">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                        <UserCircle size={40} className="md:w-12 md:h-12" />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight">No members currently checked in</h3>
                    <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-2 px-6">Scan a barcode or search to get started</p>
                </div>
            </div>

        </div>
    );
};

export default TodaysCheckIns;
