import React, { useState } from 'react';
import {
    Megaphone,
    MessageSquare,
    Layout,
    Send,
    Plus,
    CheckCircle2,
    History,
    Users
} from 'lucide-react';
import Card from '../../components/ui/Card';
import CreateAnnouncementDrawer from './CreateAnnouncementDrawer';
import BroadcastMessageDrawer from './BroadcastMessageDrawer';
import MessageTemplatesDrawer from './MessageTemplatesDrawer';

const TrainerAnnouncements = () => {
    const [activeTab, setActiveTab] = useState('Announcements');
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
    const [isBroadcastDrawerOpen, setIsBroadcastDrawerOpen] = useState(false);
    const [isTemplatesDrawerOpen, setIsTemplatesDrawerOpen] = useState(false);

    const StatItem = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
        const colorClasses = {
            primary: { bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'group-hover:bg-indigo-600 group-hover:text-white' },
            success: { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'group-hover:bg-emerald-600 group-hover:text-white' },
            warning: { bg: 'bg-amber-50', text: 'text-amber-600', iconBg: 'group-hover:bg-amber-600 group-hover:text-white' },
        };
        const currentStyle = colorClasses[color] || colorClasses.primary;

        return (
            <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 border border-transparent hover:border-indigo-100 cursor-pointer p-4 sm:p-5 h-full">
                <div className="flex justify-between items-start mb-2 relative z-10">
                    <div>
                        <div className="text-gray-500 font-black text-[10px] sm:text-xs uppercase tracking-widest mb-1">{title}</div>
                        <div className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">{value}</div>
                    </div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-sm ${currentStyle.bg} ${currentStyle.text} ${currentStyle.iconBg}`}>
                        {Icon && <Icon size={20} className="sm:w-[22px] sm:h-[22px] transition-colors duration-300" />}
                    </div>
                </div>
                {subtitle && (
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-3">
                        <span className={`text-[10px] sm:text-xs font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${currentStyle.bg} ${currentStyle.text} border border-transparent group-hover:border-current/10`}>
                            {subtitle}
                        </span>
                    </div>
                )}
                <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${currentStyle.bg}`}></div>
            </Card>
        );
    };

    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                        Communication Hub
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Broadcasting System</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Manage member engagement and updates
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-nowrap">
                    <button
                        onClick={() => setIsTemplatesDrawerOpen(true)}
                        className="h-11 px-8 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Layout size={16} /> Templates
                    </button>
                    <button
                        onClick={() => setIsBroadcastDrawerOpen(true)}
                        className="h-11 px-8 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Send size={16} /> Broadcast
                    </button>
                    <button
                        onClick={() => setIsCreateDrawerOpen(true)}
                        className="h-11 px-8 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={16} strokeWidth={3} /> New Announcement
                    </button>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatItem title="Total Announcements" value="0" subtitle="All time" icon={Megaphone} color="primary" />
                <StatItem title="Active" value="0" subtitle="Currently visible" icon={CheckCircle2} color="success" />
                <StatItem title="Messages Sent" value="0" subtitle="Platform outreach" icon={MessageSquare} color="warning" />
                <StatItem title="Templates" value="14" subtitle="Saved drafts" icon={Layout} color="primary" />
            </div>

            {/* Tabs Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 border-b-2 border-slate-50 pb-px overflow-x-auto">
                    {['Announcements', 'Communication Logs'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${activeTab === tab
                                ? 'text-indigo-600'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full shadow-[0_-4px_12px_rgba(79,70,229,0.4)]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'Announcements' && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-[40px] shadow-2xl shadow-indigo-100/20 flex items-center justify-center text-slate-200 mb-8 border border-white/50 group hover:scale-110 hover:rotate-12 transition-all duration-500">
                                <Megaphone size={48} className="opacity-20 group-hover:opacity-40" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">No announcements yet</h3>
                            <p className="text-slate-500 mt-2 max-w-sm font-medium leading-relaxed">
                                Create your first announcement to reach your members instantly.
                            </p>
                        </div>
                    )}

                    {activeTab === 'Communication Logs' && (
                        <div className="flex flex-col items-center justify-center py-24 text-center opacity-40">
                            <History size={48} className="text-slate-300 mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No logs found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Drawers */}
            <CreateAnnouncementDrawer
                isOpen={isCreateDrawerOpen}
                onClose={() => setIsCreateDrawerOpen(false)}
                onSuccess={(data) => {
                    console.log('Announcement Success:', data);
                }}
            />
            <BroadcastMessageDrawer
                isOpen={isBroadcastDrawerOpen}
                onClose={() => setIsBroadcastDrawerOpen(false)}
                onSuccess={(data) => {
                    console.log('Broadcast Success:', data);
                }}
            />
            <MessageTemplatesDrawer
                isOpen={isTemplatesDrawerOpen}
                onClose={() => setIsTemplatesDrawerOpen(false)}
            />
        </div>
    );
};

export default TrainerAnnouncements;


