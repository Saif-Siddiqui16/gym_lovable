import React, { useState } from 'react';
import {
    Megaphone,
    Plus,
    Send,
    FileText,
    MessageSquare,
    History
} from 'lucide-react';
import '../../../styles/GlobalDesign.css';
import AnnouncementFormDrawer from './AnnouncementFormDrawer';
import BroadcastMessageDrawer from './BroadcastMessageDrawer';
import MessageTemplatesDrawer from './MessageTemplatesDrawer';

const Announcements = () => {
    const [activeTab, setActiveTab] = useState('Announcements');
    const [announcements] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
    const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

    const stats = [
        { label: 'Total Announcements', value: '0', icon: Megaphone, color: 'text-slate-900', iconBg: 'bg-slate-50', iconColor: 'text-slate-400' },
        { label: 'Active', value: '0', icon: Megaphone, color: 'text-emerald-500', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
        { label: 'Messages Sent', value: '0', icon: Send, color: 'text-blue-500', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
        { label: 'Templates', value: '14', icon: FileText, color: 'text-orange-500', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' }
    ];

    return (
        <div className="min-h-screen bg-slate-50/20 p-6 md:p-10 space-y-8 animate-fadeIn font-sans text-slate-900">

            {/* KPI Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white rounded-[1.25rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-[130px] relative group hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                            <div className="flex justify-between items-start w-full">
                                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-tight">{stat.label}</span>
                                <div className={`w-10 h-10 ${stat.iconBg} ${stat.iconColor} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500`}>
                                    <Icon size={18} />
                                </div>
                            </div>
                            <h2 className={`text-4xl font-black ${stat.color} mb-1 group-hover:scale-105 transition-transform origin-left duration-500`}>{stat.value}</h2>
                        </div>
                    );
                })}
            </div>

            {/* Title & Action Buttons Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Communication Hub</h1>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsTemplatesOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <FileText size={16} className="text-slate-400" />
                        Templates
                    </button>
                    <button
                        onClick={() => setIsBroadcastOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Send size={16} className="text-slate-400" />
                        Broadcast
                    </button>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-[12px] font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        <Plus size={18} />
                        New Announcement
                    </button>
                </div>
            </div>

            {/* Tabs Row (Pill Style) */}
            <div className="flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-200 w-fit">
                <button
                    onClick={() => setActiveTab('Announcements')}
                    className={`px-6 py-2 rounded-xl text-[12px] font-bold transition-all ${activeTab === 'Announcements'
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Announcements
                </button>
                <button
                    onClick={() => setActiveTab('Communication Logs')}
                    className={`px-6 py-2 rounded-xl text-[12px] font-bold transition-all ${activeTab === 'Communication Logs'
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Communication Logs
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm min-h-[450px] flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-6 animate-fadeIn">
                    <div className="w-24 h-24 flex items-center justify-center text-slate-300 mx-auto relative group cursor-default transition-all duration-500">
                        <Megaphone size={60} strokeWidth={1.2} className="rotate-[-10deg] group-hover:scale-110 group-hover:rotate-0 transition-all duration-500" />
                    </div>
                    <p className="text-slate-400 text-[14px] font-medium tracking-tight">
                        {activeTab === 'Announcements' ? 'No announcements yet' : 'No communication logs yet'}
                    </p>
                </div>
            </div>

            {/* Action Drawer Components */}
            <AnnouncementFormDrawer
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => {
                    // Logic to refresh announcements list would go here
                    setIsCreateOpen(false);
                }}
            />

            <BroadcastMessageDrawer
                isOpen={isBroadcastOpen}
                onClose={() => setIsBroadcastOpen(false)}
                onSuccess={() => {
                    // Logic to refresh logs would go here
                    setIsBroadcastOpen(false);
                }}
            />

            <MessageTemplatesDrawer
                isOpen={isTemplatesOpen}
                onClose={() => setIsTemplatesOpen(false)}
            />

        </div>
    );
};

export default Announcements;
