import React, { useState, useEffect } from 'react';
import { getTrainerAttendance, checkInTrainer, requestLeave } from '../../api/trainer/trainerApi';
import {
    Clock,
    Calendar,
    UserCheck,
    Hourglass,
    CheckCircle2,
    XCircle,
    AlertCircle,
    User,
    ArrowRightCircle,
    History,
    Info,
    Layout,
    ArrowUpRight,
    Search
} from 'lucide-react';
import StatsCard from '../../modules/dashboard/components/StatsCard';
import DashboardGrid from '../../modules/dashboard/components/DashboardGrid';
import Card from '../../components/ui/Card';

const TrainerAttendance = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadAttendance = async () => {
        setLoading(true);
        try {
            const data = await getTrainerAttendance();
            const validData = data || { summary: {}, logs: [] };
            setAttendanceData(validData);

            // Check if user is checked in but not checked out today
            const isCurrentlyCheckedIn = validData.summary?.todayCheckIn !== 'Not yet' && validData.summary?.todayCheckOut === 'Not yet';
            setIsCheckedIn(isCurrentlyCheckedIn);
        } catch (error) {
            console.error("Attendance load error:", error);
            setAttendanceData({ summary: {}, logs: [] });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAttendance();
    }, []);

    const handleCheckIn = async () => {
        try {
            const result = await checkInTrainer({ isCheckedIn });
            alert(result.message);
            setIsCheckedIn(!isCheckedIn);
            loadAttendance();
        } catch (err) {
            alert('Failed to check in/out.');
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 min-h-screen bg-slate-50">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium tracking-tight">Loading attendance data...</p>
        </div>
    );

    const logs = attendanceData?.logs || [];
    const summary = {
        todayCheckIn: attendanceData?.summary?.todayCheckIn || 'Not yet',
        todayCheckOut: attendanceData?.summary?.todayCheckOut || 'Not yet',
        totalHoursToday: attendanceData?.summary?.totalHoursToday || '0 Hours'
    };

    return (
        <div className="saas-container space-y-8 fade-in h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                        Staff Attendance
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Trainer Portal</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Track your working hours
                        </p>
                    </div>
                </div>
            </div>

            {/* Info Card - Aligned with Dashboard Style */}
            <Card className="!p-6 border-2 border-indigo-100 shadow-2xl shadow-indigo-100/20 bg-gradient-to-br from-white to-indigo-50/30">
                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg border border-indigo-50 flex-shrink-0">
                        <Layout size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Personal View</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                            You can only view and manage your own attendance records
                        </p>
                    </div>
                </div>
            </Card>

            {/* Your Attendance Action Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <ArrowUpRight size={16} />
                    </div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Your Attendance</h2>
                </div>
                <Card className="!p-8 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 group hover:border-indigo-200 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shift Status</h3>
                            <p className="text-2xl font-black text-slate-900 tracking-tight italic">
                                {isCheckedIn ? 'Currently Clocked In' : 'Shift Not Started'}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                                <Info size={12} className="text-indigo-600" />
                                Start your shift by checking in
                            </p>
                        </div>
                        <button
                            onClick={handleCheckIn}
                            className={`h-12 px-10 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1 flex items-center gap-3 ${isCheckedIn
                                ? 'bg-rose-600 text-white shadow-rose-100 hover:bg-rose-700'
                                : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'
                                }`}
                        >
                            <Clock size={16} />
                            {isCheckedIn ? 'Check Out' : 'Check In'}
                        </button>
                    </div>
                </Card>
            </div>

            {/* Stats Cards */}
            <DashboardGrid>
                <StatsCard
                    title={`Currently Working (${isCheckedIn ? 1 : 0})`}
                    value={isCheckedIn ? "On Duty" : "Off Duty"}
                    icon={Clock}
                    color={isCheckedIn ? "success" : "primary"}
                    isEarningsLayout={true}
                />
                <StatsCard
                    title={`Today's Check-ins (${summary.todayCheckIn !== 'Not yet' ? 1 : 0})`}
                    value={summary.todayCheckIn}
                    icon={ArrowRightCircle}
                    color="info"
                    isEarningsLayout={true}
                />
                <StatsCard
                    title={`Completed Shifts (${summary.todayCheckOut !== 'Not yet' ? 1 : 0})`}
                    value={summary.todayCheckOut === 'Not yet' ? "0 Hours" : summary.totalHoursToday}
                    icon={CheckCircle2}
                    color="warning"
                    isEarningsLayout={true}
                />
            </DashboardGrid>

            {/* Currently On Duty Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <User size={16} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Currently On Duty</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Your active shift</p>
                    </div>
                </div>

                <Card className="p-0 overflow-hidden border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[2rem]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b-2 border-slate-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-in Time</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Duration</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isCheckedIn ? (
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">DT</div>
                                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight italic">Demo Trainer</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-600 italic uppercase tracking-tight">{summary.todayCheckIn}</td>
                                        <td className="px-8 py-6 text-center text-sm font-black text-slate-900 italic uppercase tracking-tight">Active</td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Working</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100">
                                                    <XCircle size={32} strokeWidth={1} />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 px-6">You are not currently checked in</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Today's Attendance Log Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <History size={16} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Today's Attendance Log</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Your attendance history for today</p>
                    </div>
                </div>

                <Card className="p-0 overflow-hidden border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[2rem]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b-2 border-slate-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-in</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-out</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Duration</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {summary.todayCheckIn !== 'Not yet' ? (
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">DT</div>
                                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight italic">Demo Trainer</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-600 italic uppercase tracking-tight">{summary.todayCheckIn}</td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-600 italic uppercase tracking-tight">{summary.todayCheckOut}</td>
                                        <td className="px-8 py-6 text-center text-sm font-black text-slate-900 italic uppercase tracking-tight">
                                            {summary.totalHoursToday}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 italic">Complete</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100">
                                                    <Search size={32} strokeWidth={1} />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 px-6">No attendance records for today</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default TrainerAttendance;
