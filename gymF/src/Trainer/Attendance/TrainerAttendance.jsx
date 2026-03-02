import React from 'react';
import {
    Clock,
    Shield,
    User,
    Search,
    XCircle,
    History,
    CheckCircle2,
    Calendar,
    ArrowUpRight,
    Moon,
    Bell,
    LayoutDashboard,
    UserCheck,
    Users,
    LogIn,
    LogOut
} from 'lucide-react';
import Card from '../../components/ui/Card';
import StatsCard from '../../modules/dashboard/components/StatsCard';
import DashboardGrid from '../../modules/dashboard/components/DashboardGrid';

const TrainerAttendance = () => {
    // Requirements: Static/demo data only. All counts set to 0.
    const isCheckedIn = false;
    const summary = {
        todayCheckIn: 'Not yet',
        todayCheckOut: 'Not yet',
        totalHoursToday: '0 Hours'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 sm:p-8 animate-fadeIn font-sans text-slate-900 overflow-y-auto">

            {/* Header Section */}
            <div className="mb-6 md:mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl md:rounded-3xl blur-2xl opacity-10"></div>
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 p-5 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Staff Attendance</h1>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-violet-50 text-violet-600 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-violet-100">Trainer Portal</span>
                            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-200" />
                            <p className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-widest leading-relaxed">
                                Track your working hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Info Section - Personal View */}
                <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center gap-4 md:gap-5 shadow-sm group hover:border-violet-200 transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white text-blue-600 flex items-center justify-center border border-blue-50 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                        <Shield size={20} className="md:w-5 md:h-5" />
                    </div>
                    <div>
                        <h4 className="text-[10px] md:text-xs font-black text-[#1e40af] uppercase tracking-widest md:tracking-[0.2em] mb-0.5">Personal View</h4>
                        <p className="text-[#3b82f6] font-black text-[9px] md:text-[10px] uppercase tracking-widest md:tracking-[0.3em] leading-relaxed">You can only view and manage your own attendance</p>
                    </div>
                </div>

                {/* Main Section - Your Attendance */}
                <div className="space-y-4 md:space-y-6 px-1">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                            <User size={16} />
                        </div>
                        <h2 className="text-[11px] md:text-xs font-black text-slate-900 uppercase tracking-widest md:tracking-[0.2em]">Your Attendance</h2>
                    </div>

                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-100/20 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>

                        <div className="relative z-10 space-y-2 md:space-y-3">
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Daily Sign-in</h2>
                            <p className="text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-widest md:tracking-[0.3em]">Start your shift by checking in</p>
                        </div>

                        <button
                            className="w-full md:w-auto relative z-10 flex items-center justify-center gap-3 px-8 md:px-12 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 bg-violet-600 text-white shadow-violet-200 hover:bg-violet-700 hover:-translate-y-1"
                        >
                            <UserCheck size={18} />
                            Check In Now
                        </button>
                    </div>
                </div>

                {/* Stats Section - Increased Width 3-column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <StatsCard
                        title="Currently Working"
                        value="0"
                        subtitle="On-duty staff"
                        icon={Users}
                        color="success"
                    />
                    <StatsCard
                        title="Today's Check-ins"
                        value="0"
                        subtitle="Total entries"
                        icon={LogIn}
                        color="primary"
                    />
                    <StatsCard
                        title="Completed Shifts"
                        value="0"
                        subtitle="Today's total"
                        icon={LogOut}
                        color="warning"
                    />
                </div>

                <div className="space-y-4 md:space-y-6 pt-4 px-1">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                            <LayoutDashboard size={16} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[11px] md:text-xs font-black text-slate-900 uppercase tracking-widest md:tracking-[0.2em]">Currently On Duty</h2>
                            <p className="text-slate-400 font-black text-[8px] md:text-[9px] uppercase tracking-widest md:tracking-[0.3em] mt-0.5 truncate">Your active shift details</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
                        <div className="overflow-x-auto text-left">
                            <table className="w-full min-w-[600px] md:min-w-full">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-in</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="py-16 md:py-24 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-40">
                                                <XCircle size={40} md:size={48} strokeWidth={1} className="text-slate-300 mb-4" />
                                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.3em] text-slate-400 px-6">You are not currently checked in</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Today's Attendance Log Section */}
                <div className="space-y-4 md:space-y-6 pt-4 px-1">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                            <History size={16} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[11px] md:text-xs font-black text-slate-900 uppercase tracking-widest md:tracking-[0.2em]">Today's Log</h2>
                            <p className="text-slate-400 font-black text-[8px] md:text-[9px] uppercase tracking-widest md:tracking-[0.3em] mt-0.5 truncate">Your attendance history for today</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
                        <div className="overflow-x-auto text-left">
                            <table className="w-full min-w-[700px] md:min-w-full">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">In</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Out</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                        <th className="px-6 md:px-10 py-5 md:py-6 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5" className="py-16 md:py-24 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-40">
                                                <Calendar size={40} md:size={48} strokeWidth={1} className="text-slate-300 mb-4" />
                                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.3em] text-slate-400 px-6">No attendance records for today</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default TrainerAttendance;
