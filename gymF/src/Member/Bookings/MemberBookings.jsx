import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    Zap,
    Search,
    Filter,
    Activity,
    Plus,
    Target,
    MapPin,
    Users
} from 'lucide-react';
import Card from '../../components/ui/Card';
import '../../styles/GlobalDesign.css';

const MemberBookings = () => {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Recovery', 'Classes', 'PT'];

    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b-2 border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 animate-in zoom-in duration-500">
                        <Calendar size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1 animate-in slide-in-from-left duration-500">
                            Book & Schedule
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-in slide-in-from-left duration-700">
                            Upcoming sessions for the next 7 days
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs & Action Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                                ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                    <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2" />
                </div>

                <button className="px-8 h-12 bg-indigo-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2">
                    <Plus size={16} strokeWidth={3} /> My Booking
                </button>
            </div>

            {/* My Bookings Section */}
            <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                        <Zap size={16} />
                    </div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">My Bookings</h2>
                </div>

                <Card className="p-20 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[3rem] bg-white flex flex-col items-center justify-center text-center group hover:border-indigo-100 transition-all duration-500">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4 leading-none">
                        No upcoming bookings
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-sm">
                        Book a class or recovery slot to see it here.
                    </p>
                </Card>
            </div>

        </div>
    );
};

export default MemberBookings;
