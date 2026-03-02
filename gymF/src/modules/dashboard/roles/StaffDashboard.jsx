import React from 'react';
import {
    Users,
    UserCheck,
    ShoppingCart,
    UserPlus,
    FileText,
    CheckCircle,
    Receipt,
    GitBranch,
    Clock,
    LayoutDashboard,
    ChevronRight,
    Search,
    Calendar,
    Bell,
    Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import StatsCard from '../components/StatsCard';
import DashboardGrid from '../components/DashboardGrid';

const StaffDashboard = () => {
    const navigate = useNavigate();

    const quickActions = [
        { label: 'Check In Member', icon: UserCheck, path: '/staff/attendance/check-in', color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Open POS', icon: '/finance/pos', customIcon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
        { label: 'Add Lead', icon: '/crm/inquiry', customIcon: UserPlus, color: 'bg-amber-50 text-amber-600' },
        { label: 'View Invoices', icon: '/finance/invoices', customIcon: FileText, color: 'bg-rose-50 text-rose-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 sm:p-8 animate-fadeIn">
            {/* Header section */}
            <div className="mb-6 sm:mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl blur-2xl opacity-10"></div>
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Hello, Demo!</h1>
                        <p className="text-slate-500 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">
                            Main Branch • Sunday, 01 Mar 2026
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-violet-600 text-white rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200">
                            Staff Portal
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                        <LayoutDashboard size={18} />
                    </div>
                    <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {quickActions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => action.path ? navigate(action.path) : action.icon && typeof action.icon === 'string' && navigate(action.icon)}
                            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-200 transition-all duration-300 group flex flex-col items-center text-center gap-3 sm:gap-4"
                        >
                            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${action.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm`}>
                                {action.customIcon ? <action.customIcon size={20} className="sm:w-6 sm:h-6" /> : action.icon && typeof action.icon !== 'string' && <action.icon size={20} className="sm:w-6 sm:h-6" />}
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-violet-600 leading-tight">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards Section */}
            <DashboardGrid>
                <StatsCard
                    title="Today's Check-ins"
                    value="15"
                    trend="8 currently in"
                    icon={CheckCircle}
                    color="primary"
                    isEarningsLayout={true}
                />
                <StatsCard
                    title="Pending Invoices"
                    value="5"
                    icon={Receipt}
                    color="danger"
                    isEarningsLayout={true}
                />
                <StatsCard
                    title="Active Leads"
                    value="12"
                    icon={GitBranch}
                    color="success"
                    isEarningsLayout={true}
                />
                <StatsCard
                    title="Expiring This Week"
                    value="4"
                    trend="1 today"
                    icon={Clock}
                    color="warning"
                    isEarningsLayout={true}
                />
            </DashboardGrid>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Recent Check-ins */}
                    <Card className="border-none overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200/50 bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-black text-slate-800 uppercase tracking-widest">Recent Check-ins</h3>
                            <button
                                onClick={() => navigate('/staff/attendance/today')}
                                className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 border border-slate-100"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] group hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all duration-500 cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm shadow-inner">
                                        RM
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight ">Regular Member</h4>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">MEM005</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <div className="text-base font-black text-slate-900 tracking-tight ">11:58</div>
                                    <div className="flex items-center gap-1.5 justify-end">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Follow-Up Leads */}
                    <Card className="border-none overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200/50 bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-black text-slate-800 uppercase tracking-widest">Follow-Up Leads</h3>
                            <button
                                onClick={() => navigate('/crm/pipeline')}
                                className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 border border-slate-100"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] group hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-200 transition-all duration-500 cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600 flex items-center justify-center font-black text-sm shadow-inner">
                                        JD
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight ">James Doe</h4>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">123456789 • Instagram</p>
                                    </div>
                                </div>
                                <div className="px-4 py-1.5 bg-violet-600 text-white text-[9px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-violet-100">
                                    new
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Expiring Soon */}
                    <Card className="border-none overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200/50 bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-black text-slate-800 uppercase tracking-widest">Expiring Soon</h3>
                            <button
                                onClick={() => navigate('/members/renewal-alerts')}
                                className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 border border-slate-100"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-5 bg-rose-50/50 border border-rose-100 rounded-[2rem] group hover:bg-white hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-300 transition-all duration-500 cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-lg shadow-rose-100/50 border border-rose-100 group-hover:scale-110 transition-transform duration-500">
                                        <Clock size={28} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight ">Expiring Soon</h4>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No phone</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-4 py-1.5 bg-rose-600 text-white text-[9px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-rose-100">
                                        Today
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* My Pending Tasks */}
                    <Card className="border-none overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200/50 bg-white p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-black text-slate-800 uppercase tracking-widest">My Pending Tasks</h3>
                            <button
                                onClick={() => navigate('/staff/tasks/my-tasks')}
                                className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 border border-slate-100"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-5">
                            {[
                                { task: "Clean equipment", due: "01 Mar 2026" },
                                { task: "Follow up with leads", due: "01 Mar 2026" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] group hover:bg-white hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-200 transition-all duration-500 cursor-pointer">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-white text-slate-400 flex items-center justify-center border border-slate-200 group-hover:bg-amber-50 group-hover:text-amber-500 group-hover:border-amber-200 transition-all duration-300 shadow-sm">
                                            <div className="w-4 h-4 border-2 border-current rounded-md" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black text-slate-900  tracking-tight">{item.task}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                Due: {item.due} – <span className="text-amber-600">pending</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
