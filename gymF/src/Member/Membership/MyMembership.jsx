import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Star,
    Calendar,
    CheckCircle2,
    Shield,
    Package,
    ArrowRight,
    Clock,
    Search,
    Crown,
    Activity,
    Plus,
    Layout,
    CalendarDays,
    Info,
    ClipboardList
} from 'lucide-react';
import { ROLES } from '../../config/roles';
import Card from '../../components/ui/Card';
import RightDrawer from '../../components/common/RightDrawer';
import '../../styles/GlobalDesign.css';

const MyMembership = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isRequestsPage = location.pathname.includes('requests');
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Sat 28');

    const calendarDates = [
        { day: 'Sat', date: '28' },
        { day: 'Sun', date: '1' },
        { day: 'Mon', date: '2' },
        { day: 'Tue', date: '3' },
        { day: 'Wed', date: '4' },
        { day: 'Thu', date: '5' },
        { day: 'Fri', date: '6' },
    ];

    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b-2 border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 animate-in zoom-in duration-500">
                        {isRequestsPage ? <ClipboardList size={32} strokeWidth={2.5} /> : <Star size={32} strokeWidth={2.5} />}
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                            {isRequestsPage ? 'My Requests' : 'My Benefits'}
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            {isRequestsPage ? 'Track and manage your service requests' : 'Track and manage your membership benefits'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-8 h-12 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2 group"
                >
                    <Calendar size={16} strokeWidth={3} /> Book a Slot
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-4xl">
                {/* Plan Summary Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Crown size={16} />
                        </div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Plan Summary</h2>
                    </div>
                    <Card className="p-10 border-2 border-slate-100 shadow-sm rounded-3xl bg-white overflow-hidden relative border-l-8 border-l-indigo-600">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Premium Gold Plan</h3>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                                        <Calendar size={12} /> Valid until 30 Mar 2026
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                                Active
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-8 text-black/[0.02]">
                            <Star size={120} strokeWidth={1} />
                        </div>
                    </Card>
                </div>

                {/* Benefits List / Empty State Section */}
                <div className="space-y-6">
                    <Card className="p-10 border-2 border-slate-100 shadow-sm rounded-3xl bg-white">
                        <div className="flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100">
                                <Shield size={40} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                    No Benefits Yet
                                </h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-sm">
                                    Your membership plan may include various benefits. Check with staff for details!
                                </p>
                            </div>
                            <button className="px-10 h-14 border-2 border-indigo-600 text-indigo-600 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100/20 hover:bg-indigo-50 transition-all flex items-center gap-3">
                                <Package size={16} /> Browse Add-on Packages
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Book Benefit Slots Drawer */}
            <RightDrawer
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                title="Book Benefit Slots"
                subtitle="Book sauna, steam, spa and other amenity slots"
                maxWidth="max-w-2xl"
            >
                <div className="p-8 space-y-8">
                    {/* Horizontal Date Picker - Now Wrapped */}
                    <div className="flex flex-wrap gap-4 justify-between">
                        {calendarDates.map((item) => {
                            const id = `${item.day} ${item.date}`;
                            const isActive = selectedDate === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => setSelectedDate(id)}
                                    className={`flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-2xl border-2 transition-all duration-300 ${isActive
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                                        : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-100'
                                        }`}
                                >
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                                        {item.day}
                                    </span>
                                    <span className="text-xl font-black mt-1">
                                        {item.date}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Empty Slots Message */}
                    <div className="py-20 flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100">
                            <CalendarDays size={40} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                No Slots Available
                            </h3>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-[280px]">
                                No benefit slots are scheduled for this day. Please check another date or contact staff.
                            </p>
                        </div>
                    </div>

                    {/* Helpful Tip */}
                    <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <Info size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Staff Access Only</p>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-normal">
                                Some premium slots can only be booked through the front desk.
                            </p>
                        </div>
                    </div>
                </div>
            </RightDrawer>
        </div>
    );
};

export default MyMembership;
