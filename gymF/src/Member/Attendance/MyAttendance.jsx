import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    Activity,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Search,
    UserCheck,
    TrendingUp,
    MapPin
} from 'lucide-react';
import Card from '../../components/ui/Card';
import StatsCard from '../../modules/dashboard/components/StatsCard';
import DashboardGrid from '../../modules/dashboard/components/DashboardGrid';

const MyAttendance = () => {
    // Current date state for calendar navigation
    const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); // Feb 1, 2026

    const stats = [
        { title: 'Total Visits', value: '0', icon: CheckCircle2, color: 'primary' },
        { title: 'Days Visited', value: '0', icon: CalendarIcon, color: 'success' },
        { title: 'Avg Duration', value: '0 min', icon: Clock, color: 'warning' },
        { title: 'Consistency', value: '0%', icon: Activity, color: 'info' }
    ];

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Calendar Logic
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                        <CalendarIcon size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                            My Attendance
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Track your gym visits
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm">
                    <CalendarIcon size={18} className="text-indigo-600" />
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{monthName} {currentYear}</span>
                </div>
            </div>

            {/* Stats Section */}
            <DashboardGrid>
                {stats.map((stat, idx) => (
                    <StatsCard
                        key={idx}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        isEarningsLayout={true}
                    />
                ))}
            </DashboardGrid>

            {/* Calendar Section - Full Width */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <CalendarIcon size={16} />
                    </div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Attendance Calendar</h2>
                </div>

                <Card className="p-8 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[2.5rem] bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <div className="pl-4">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{monthName} {currentYear}</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Visit Overview</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevMonth}
                                className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNextMonth}
                                className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {weekDays.map(day => (
                            <div key={day} className="text-center py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {day}
                            </div>
                        ))}
                        {blanks.map(blank => (
                            <div key={`blank-${blank}`} className="aspect-square" />
                        ))}
                        {dates.map(date => (
                            <div
                                key={date}
                                className="aspect-square flex flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-slate-50/30 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group cursor-pointer relative"
                            >
                                <span className="text-sm font-black text-slate-700 group-hover:text-indigo-600 transition-colors">{date}</span>
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Visits Section - Full Width Below */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <Clock size={16} />
                    </div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Visits</h2>
                </div>

                <Card className="p-10 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-3xl bg-white min-h-[300px] flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100 mb-6">
                        <Search size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-black text-slate-400 tracking-tight uppercase mb-2 leading-none">Recent Visits</h3>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
                        No visits this month
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default MyAttendance;
