import React from 'react';
import Card from '../../../components/ui/Card';
import {
    Calendar,
    User,
    CheckCircle,
    Clock,
    Users,
    TrendingUp,
    Dumbbell,
} from 'lucide-react';

const TrainerDashboard = () => {
    // Stat Card internal component to match existing style without "vs last period"
    const StatItem = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
        const colorClasses = {
            primary: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'group-hover:bg-blue-600 group-hover:text-white' },
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
        <div className="h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">Welcome, Demo!</h1>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Main Branch</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Personal Training</span>
                    </div>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatItem title="Active General Clients" value="2" subtitle="General training" icon={Users} color="primary" />
                <StatItem title="PT Clients" value="1" subtitle="Personal training" icon={User} color="success" />
                <StatItem title="Today's Sessions" value="1" subtitle="0 completed, 1 pending" icon={Calendar} color="warning" />
                <StatItem title="My Classes" value="1" subtitle="Upcoming classes" icon={Dumbbell} color="primary" />
                <StatItem title="Completion Rate" value="0%" subtitle="Today" icon={CheckCircle} color="success" />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 px-1">
                <button className="h-12 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center">
                    View My Clients
                </button>
                <button className="h-12 px-8 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center">
                    Manage Sessions
                </button>
                <button className="h-12 px-8 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center">
                    Create Fitness Plan
                </button>
            </div>

            {/* Content Body Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

                {/* Left Column (Span 2) */}
                <div className="xl:col-span-2 space-y-8">

                    {/* Section: Today's Sessions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Clock size={16} />
                            </div>
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Today's Sessions</h2>
                        </div>
                        <Card className="p-0 border-2 border-indigo-100 shadow-2xl shadow-indigo-100/20 overflow-hidden bg-white group cursor-pointer hover:border-indigo-300 transition-all">
                            <div className="p-6 flex items-center justify-between border-l-8 border-indigo-600">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl group-hover:scale-110 transition-transform">
                                        D
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xl tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">Demo Client</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs uppercase tracking-tight">
                                                <Clock size={14} className="text-slate-300" />
                                                15:04
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span className="text-slate-500 font-bold text-xs uppercase tracking-tight">60 min</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="px-4 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                                        scheduled
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Section: My Clients */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Users size={16} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">My Clients</h2>
                            </div>
                            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline px-4 py-1.5 bg-indigo-50/50 rounded-full">View All</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: 'Client One', type: 'General Training', status: 'General', color: 'slate' },
                                { name: 'Client Two', type: 'General Training', status: 'General', color: 'slate' },
                                { name: 'PT Client A', type: '8 sessions left', status: 'Platinum 12', color: 'indigo' },
                            ].map((client, i) => {
                                const themeColor = client.color === 'indigo' ? 'indigo' : 'slate';
                                const bgClass = themeColor === 'indigo' ? 'bg-indigo-50' : 'bg-slate-50';
                                const borderClass = themeColor === 'indigo' ? 'border-indigo-100' : 'border-slate-100';
                                const textClass = themeColor === 'indigo' ? 'text-indigo-600' : 'text-slate-600';

                                return (
                                    <Card key={i} className="p-5 border-2 border-slate-50 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer bg-white group">
                                        <div className="flex flex-col items-center text-center p-2">
                                            <div className={`w-16 h-16 mb-4 rounded-3xl ${bgClass} border ${borderClass} flex items-center justify-center ${textClass} font-black text-3xl group-hover:scale-110 transition-transform`}>
                                                {client.name.charAt(0)}
                                            </div>
                                            <h4 className="font-black text-slate-900 text-base tracking-tight mb-1 group-hover:text-indigo-600">{client.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">{client.type}</p>
                                            <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${client.status.includes('Platinum') ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {client.status}
                                            </span>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column (Span 1) */}
                <div className="space-y-8">

                    {/* Section: My Upcoming Classes */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <Dumbbell size={16} />
                            </div>
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Upcoming Class</h2>
                        </div>
                        <Card className="p-0 border-2 border-emerald-100 shadow-2xl shadow-emerald-100/20 overflow-hidden bg-white group cursor-pointer hover:border-emerald-300 transition-all">
                            <div className="p-6 border-t-8 border-emerald-600">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="font-black text-slate-900 text-2xl tracking-tight mb-1 group-hover:text-emerald-600 transition-colors">Power Lifting</h4>
                                        <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">Strength Training</p>
                                    </div>
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                                </div>
                                <div className="space-y-4 px-2">
                                    <div className="flex items-center gap-4 text-slate-600 group-hover:translate-x-1 transition-transform">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                            <Calendar size={16} />
                                        </div>
                                        <span className="text-sm font-black text-slate-700">Sat, 28 Feb • 17:04</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600 group-hover:translate-x-1 transition-transform delay-75">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                            <Users size={16} />
                                        </div>
                                        <span className="text-sm font-black text-slate-700">Capacity: 20 Reserved</span>
                                    </div>
                                </div>
                                <button className="w-full mt-8 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 hover:-translate-y-1 transition-all shadow-xl shadow-emerald-100">
                                    View Class Roster
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Promo Section */}
                    <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <h4 className="text-xl font-black tracking-tight mb-2">Trainer Pro Tips</h4>
                            <p className="text-xs text-white/70 font-bold mb-8 leading-relaxed">Personalized tracking leads to 40% higher member retention. Update your plans today!</p>
                            <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg">
                                Explore Insights
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
