import React, { useState, useEffect } from 'react';
import {
    Megaphone,
    Calendar,
    BellRing,
    Clock,
    AlertCircle,
    ChevronRight,
    Search,
    Sparkles,
    Info
} from 'lucide-react';
import { announcementApi } from '../../api/announcementApi';
import toast from 'react-hot-toast';

const MemberAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const data = await announcementApi.getAllAnnouncements();
            // Filter only announcements intended for members if targetAudience field exists
            const memberAnnouncements = data?.filter(a =>
                !a.targetAudience ||
                a.targetAudience.toLowerCase().includes('member') ||
                a.targetAudience.toLowerCase() === 'all'
            ) || [];
            setAnnouncements(memberAnnouncements);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            // toast.error("Failed to load announcements");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getPriorityStyle = (priority) => {
        const config = {
            high: {
                bg: 'bg-rose-50',
                text: 'text-rose-600',
                border: 'border-rose-100',
                icon: AlertCircle,
                badge: 'bg-rose-100 text-rose-700'
            },
            medium: {
                bg: 'bg-amber-50',
                text: 'text-amber-600',
                border: 'border-amber-100',
                icon: Info,
                badge: 'bg-amber-100 text-amber-700'
            },
            low: {
                bg: 'bg-indigo-50',
                text: 'text-indigo-600',
                border: 'border-indigo-100',
                icon: Info,
                badge: 'bg-indigo-100 text-indigo-700'
            },
        };
        return config[priority?.toLowerCase()] || config.medium;
    };

    return (
        <div className="saas-container h-screen overflow-y-auto p-8 space-y-10 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-10 border-b-2 border-slate-100">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                        <Megaphone size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">Announcements</h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">Stay updated with the latest news from your gym</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl">
                {announcements.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                        {announcements.map((item) => {
                            const style = getPriorityStyle(item.priority);
                            const PriorityIcon = style.icon;
                            return (
                                <div key={item.id} className="group relative bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 transition-all group-hover:scale-110" />

                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center`}>
                                                    <PriorityIcon size={24} strokeWidth={2.5} />
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full ${style.badge} text-[10px] font-black uppercase tracking-widest`}>
                                                    {item.priority || 'Update'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <Calendar size={14} />
                                                {item.date}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 max-w-3xl">
                                            {item.message}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                    <BellRing size={16} />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Broadcasted to Members</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                                Read More <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8 border-2 border-dashed border-slate-200">
                            <Megaphone size={48} strokeWidth={1} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">No Announcements</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">There are no announcements at this time. Check back later!</p>
                    </div>
                )}
            </div>

            {/* Footer Tip */}
            <div className="flex items-center justify-center pt-10">
                <div className="px-8 py-3 bg-indigo-50 rounded-full flex items-center gap-3 text-indigo-600">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Personalized updates for your fitness journey</span>
                </div>
            </div>
        </div>
    );
};

export default MemberAnnouncements;
