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
            <div className="mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-10"></div>
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Attendance</h1>
                        <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
                            Track your working hours
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Info Section - Personal View */}
                <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-2xl p-6 flex items-center gap-5 shadow-sm group hover:border-violet-200 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center border border-blue-50 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                        <Shield size={22} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-[#1e40af] uppercase tracking-[0.2em] mb-0.5">Personal View</h4>
                        <p className="text-[#3b82f6] font-black text-[10px] uppercase tracking-[0.3em]">You can only view and manage your own attendance</p>
                    </div>
                </div>

                {/* Main Section - Your Attendance */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                            <User size={18} />
                        </div>
                        <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Your Attendance</h2>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-100/20 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>

                        <div className="relative z-10 space-y-3">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Attendance</h2>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Start your shift by checking in</p>
                        </div>

                        <button
                            className="relative z-10 flex items-center gap-3 px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 bg-violet-600 text-white shadow-violet-200 hover:bg-violet-700 hover:-translate-y-1"
                        >
                            <UserCheck size={18} />
                            Check In
                        </button>
                    </div>
                </div>

                {/* Stats Section - Increased Width 3-column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <StatsCard
                        title="Currently Working"
                        value="0"
                        icon={Users}
                        color="success"
                        isEarningsLayout={true}
                    />
                    <StatsCard
                        title="Today's Check-ins"
                        value="0"
                        icon={LogIn}
                        color="primary"
                        isEarningsLayout={true}
                    />
                    <StatsCard
                        title="Completed Shifts"
                        value="0"
                        icon={LogOut}
                        color="warning"
                        isEarningsLayout={true}
                    />
                </div>

                {/* Currently On Duty Section */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                            <LayoutDashboard size={18} />
                        </div>
                        <div>
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Currently On Duty</h2>
                            <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.3em] mt-0.5">Your active shift</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
                        <div className="overflow-x-auto text-left">
                            <table className="w-full">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Staff</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-in Time</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-40">
                                                <XCircle size={48} strokeWidth={1} className="text-slate-300 mb-4" />
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-6">You are not currently checked in</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Today's Attendance Log Section */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                            <History size={18} />
                        </div>
                        <div>
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Today's Attendance Log</h2>
                            <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.3em] mt-0.5">Your attendance history for today</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
                        <div className="overflow-x-auto text-left">
                            <table className="w-full">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Staff Member</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-in</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-out</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-40">
                                                <Calendar size={48} strokeWidth={1} className="text-slate-300 mb-4" />
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-6">No attendance records for today</p>
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
