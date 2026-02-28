import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Clock,
    CreditCard,
    TrendingUp,
    ShoppingCart,
    UserPlus,
    Shield,
    User,
    Lock,
    ChevronRight,
    Search,
    IndianRupee,
    Activity,
    Users
} from 'lucide-react';
import Card from '../../../components/ui/Card';

const MemberDashboard = () => {
    const today = "Saturday, February 28, 2026";
    const navigate = useNavigate();

    const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
        const colorClasses = {
            primary: { bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'group-hover:bg-indigo-600 group-hover:text-white' },
            success: { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'group-hover:bg-emerald-600 group-hover:text-white' },
            warning: { bg: 'bg-amber-50', text: 'text-amber-600', iconBg: 'group-hover:bg-amber-600 group-hover:text-white' },
            danger: { bg: 'bg-rose-50', text: 'text-rose-600', iconBg: 'group-hover:bg-rose-600 group-hover:text-white' },
        };
        const currentStyle = colorClasses[color] || colorClasses.primary;

        return (
            <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 border border-transparent hover:border-indigo-100 cursor-pointer p-5 h-full">
                <div className="flex justify-between items-start mb-2 relative z-10">
                    <div>
                        <div className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{title}</div>
                        <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>
                    </div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-sm ${currentStyle.bg} ${currentStyle.text} ${currentStyle.iconBg}`}>
                        {Icon && <Icon size={20} />}
                    </div>
                </div>
                {subtitle && (
                    <div className="flex items-center gap-1.5 mt-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${currentStyle.bg} ${currentStyle.text} border border-transparent group-hover:border-current/10`}>
                            {subtitle}
                        </span>
                    </div>
                )}
            </Card>
        );
    };

    const QuickAction = ({ icon: Icon, label, color = 'bg-slate-50' }) => (
        <button className={`w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group ${color} text-left`}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Icon size={18} />
            </div>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none block">{label}</span>
        </button>
    );

    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                        <User size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                            Welcome, <span className="text-indigo-600">Demo!</span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Member ID: MEM001</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                                Main Branch Access
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm">
                    <Calendar size={18} className="text-indigo-600" />
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{today}</span>
                </div>
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Membership"
                    value="Membership Status"
                    subtitle="Premium Gold Plan • 30 days"
                    icon={Shield}
                    color="primary"
                />
                <StatCard
                    title="PT Sessions"
                    value="5"
                    subtitle="Remaining Sessions"
                    icon={Clock}
                    color="success"
                />
                <StatCard
                    title="This Month Visits"
                    value="2"
                    subtitle="Visit Frequency"
                    icon={Activity}
                    color="warning"
                />
                <StatCard
                    title="Pending Dues"
                    value="₹NaN"
                    subtitle="1 Active Invoice"
                    icon={IndianRupee}
                    color="danger"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Quick Actions & Details */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <QuickAction icon={Calendar} label="Book & Schedule" />
                        <QuickAction icon={TrendingUp} label="View Progress" />
                        <QuickAction icon={ShoppingCart} label="Shop Products" />
                        <QuickAction icon={UserPlus} label="Refer & Earn" />
                    </div>

                    {/* Membership Details & Entitlements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Membership Details */}
                        <Card className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600">Membership Details</h3>
                                <Shield size={16} className="text-indigo-200" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Plan', value: 'Premium Gold Plan' },
                                    { label: 'Status', value: 'Active', color: 'text-emerald-600' },
                                    { label: 'Start Date', value: '28 Feb 2026' },
                                    { label: 'End Date', value: '30 Mar 2026' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        <span className={`text-[11px] font-black uppercase ${item.color || 'text-slate-900'}`}>{item.value}</span>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-slate-50">
                                    <div className="flex justify-between items-center bg-indigo-50/50 p-4 rounded-xl border border-indigo-50">
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Days Remaining</span>
                                        <span className="text-xs font-black text-indigo-700 uppercase">30 days</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Entitlements */}
                        <Card className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                                <h3 className="text-xs font-black uppercase tracking-widest text-fuchsia-600">My Entitlements</h3>
                                <LayoutDashboard size={16} className="text-fuchsia-200" />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-3">
                                    <Search size={24} />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">No benefits configured</p>
                            </div>
                            <button className="w-full h-11 bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center justify-center gap-2">
                                Upgrade Plan <ChevronRight size={14} strokeWidth={3} />
                            </button>
                        </Card>
                    </div>

                    {/* Attendance History */}
                    <Card className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-5 h-[2px] bg-indigo-600"></div> Recent Attendance
                            </h2>
                            <button
                                onClick={() => navigate('/member/attendance')}
                                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                            >
                                VIEW ALL <ChevronRight size={14} strokeWidth={3} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['28 Feb 2026 — 17:34', '27 Feb 2026 — 17:34'].map((date, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all flex items-center gap-3 group">
                                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <Calendar size={16} />
                                    </div>
                                    <span className="text-[11px] font-black text-slate-700 uppercase">{date}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Upcoming & Context */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Upcoming Classes */}
                    <Card className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl h-full">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600">Upcoming Classes</h3>
                            <button className="text-[10px] font-black text-emerald-600">VIEW MORE</button>
                        </div>
                        <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-50 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="px-2.5 py-1 bg-white text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">Booked</span>
                                <Clock size={16} className="text-indigo-200" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-0.5">Morning Yoga</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sat, 28 Feb • 18:34</p>
                            </div>
                        </div>
                    </Card>

                    {/* My Trainer */}
                    <Card className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                            <h3 className="text-xs font-black uppercase tracking-widest text-amber-600">My Trainer</h3>
                            <Users size={16} className="text-amber-200" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                <User size={28} />
                            </div>
                            <div>
                                <h4 className="text-md font-black text-slate-900 uppercase leading-tight mb-0.5">Trainer</h4>
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">PT Package Trainer</p>
                            </div>
                        </div>
                        <button className="w-full h-11 mt-6 border-2 border-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-amber-100 hover:text-amber-600 hover:bg-amber-50 transition-all">MESSAGE</button>
                    </Card>

                    {/* My Locker */}
                    <Card className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-60"></div>
                        <div className="relative z-10 flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">My Locker</h3>
                                <Lock size={16} className="text-slate-100" />
                            </div>
                            <p className="text-sm font-black text-slate-900 uppercase">No locker assigned</p>
                            <button className="w-full h-11 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all">Request Locker</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
