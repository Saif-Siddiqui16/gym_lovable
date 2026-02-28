import React, { useState, useEffect } from 'react';
import {
    User,
    Clock,
    CheckCircle,
    Users,
    DollarSign,
    TrendingUp,
    Activity,
    ChevronRight,
    IndianRupee,
    CreditCard,
    Smartphone,
    Banknote,
    ShieldAlert,
    Zap,
    XOctagon,
    History
} from 'lucide-react';
import { DASHBOARD_DATA } from '../data/mockDashboardData';
import TodayFollowUps from '../../crm/pages/TodayFollowUps';
import RenewalAlertsWidget from '../../membership/components/RenewalAlertsWidget';
import { useNavigate } from 'react-router-dom';
// import { KPIS } from '../../finance/data/mockFinance';
import LiveAccessControl from '../components/LiveAccessControl';
import FacilityStatusOverview from '../../operations/components/widgets/FacilityStatusOverview';
import { EQUIPMENT_INVENTORY } from '../../operations/data/equipmentData';
import { fetchDashboardStats, fetchRecentActivities, fetchTrainerAvailability, fetchFinancialStats } from '../../../api/branchAdmin/branchAdminApi';

const BranchManagerDashboard = () => {
    const [stats, setStats] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [financials, setFinancials] = useState({
        collection: { cash: 0, upi: 0, card: 0 },
        expenses: { today: 0 }
    });
    const [equipment, setEquipment] = useState([]);
    const [risks, setRisks] = useState({ defaulters: 0, expiringSoon: 0, manualOverrides: 0 });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [statsData, activitiesData, trainersData, financialsData] = await Promise.all([
                    fetchDashboardStats(),
                    fetchRecentActivities(),
                    fetchTrainerAvailability(),
                    fetchFinancialStats()
                ]);

                // Map backend icon strings to actual Lucide components
                const mappedStats = statsData.stats.map(stat => ({
                    ...stat,
                    icon: stat.icon === 'Users' ? Users :
                        stat.icon === 'CheckCircle' ? CheckCircle :
                            stat.icon === 'DollarSign' ? IndianRupee : Users
                }));

                setStats(mappedStats);
                setRecentActivities(activitiesData);
                setTrainers(trainersData);
                setFinancials(financialsData);
                if (statsData.equipment) setEquipment(statsData.equipment);
                if (statsData.risks) setRisks(statsData.risks);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
                // Fallback to mock data on error is handled by initial state
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse uppercase tracking-[0.2em] text-[10px]">Synchronizing Branch Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-6">
            {/* Premium Header with Gradient */}
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl blur-2xl opacity-10 animate-pulse"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                            <Activity size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                                Welcome back, Demo!
                            </h1>
                            <p className="text-slate-600 text-sm mt-1">Here's what's happening at your gym today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gym Health Section */}
            <div className="mb-6">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Gym Health Section</h3>
                <p className="text-xs font-semibold text-slate-500">Real-time overview of your business</p>
            </div>

            {/* Top Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5 overflow-hidden">
                    <div className="relative flex items-start justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-600 mb-2">Total Members</p>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">0</h3>
                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                <TrendingUp size={14} className="text-emerald-500" />
                                0% from last month
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5 overflow-hidden">
                    <div className="relative flex items-start justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-600 mb-2">Revenue This Month</p>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">₹0</h3>
                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                <TrendingUp size={14} className="text-emerald-500" />
                                0% growth
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                            <IndianRupee size={24} />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5 overflow-hidden">
                    <div className="relative flex items-start justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-600 mb-2">Expiring Soon</p>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">0</h3>
                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                <Activity size={14} className="text-amber-500" />
                                Review needed
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 transition-all duration-200 md:hover:shadow-md md:hover:-translate-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">New Leads</p>
                    <h4 className="text-xl font-black text-slate-800">0</h4>
                    <p className="text-[10px] text-slate-500 font-medium">This month</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 transition-all duration-200 md:hover:shadow-md md:hover:-translate-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Trainers</p>
                    <h4 className="text-xl font-black text-slate-800">2</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Available today</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 transition-all duration-200 md:hover:shadow-md md:hover:-translate-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Today's Classes</p>
                    <h4 className="text-xl font-black text-slate-800">0</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Scheduled</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 transition-all duration-200 md:hover:shadow-md md:hover:-translate-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Approvals</p>
                    <h4 className="text-xl font-black text-slate-800">0</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Review pending</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Revenue Overview Chart */}
                <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Activity className="text-violet-600" size={18} />
                        Revenue Overview
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-2 px-4 pb-4 border-b border-slate-100">
                        {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, i) => {
                            const demoValues = [2, 0, 4, 1, 3, 0];
                            const h = demoValues[i] * 20; // 0-4 values scaled to height
                            return (
                                <div key={month} className="w-full bg-violet-50 rounded-t-lg relative group/bar">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-violet-600 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-violet-700 hover:to-purple-600 cursor-pointer"
                                        style={{ height: `${h || 2}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                            ₹{demoValues[i].toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {month}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Weekly Attendance Chart */}
                <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Clock className="text-emerald-600" size={18} />
                        Weekly Attendance
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-2 px-4 pb-4 border-b border-slate-100">
                        {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                            const demoValues = [0, 1, 4, 2, 3, 0, 0];
                            const h = demoValues[i] * 20;
                            return (
                                <div key={day} className="w-full bg-emerald-50 rounded-t-lg relative group/bar">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all duration-500 hover:from-emerald-700 hover:to-teal-600 cursor-pointer"
                                        style={{ height: `${h || 2}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                            {demoValues[i]} Check-ins
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {day}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Live Occupancy */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                            <Users size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Live Occupancy</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-2xl">
                        <h4 className="text-4xl font-black text-slate-900 mb-2">0 of 50</h4>
                        <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest">Capacity</p>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                            <div className="bg-violet-600 h-full w-0 transition-all duration-500"></div>
                        </div>
                        <p className="text-lg font-black text-violet-600">0% Full</p>
                    </div>
                </div>

                {/* Today's Check-ins by Hour */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Today's Check-ins by Hour</h3>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                            <Activity size={32} />
                        </div>
                        <p className="text-slate-500 font-bold text-sm tracking-tight italic">No check-ins recorded today</p>
                    </div>
                </div>

                {/* Accounts Receivable */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <IndianRupee size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Accounts Receivable</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Outstanding</p>
                            <h4 className="text-2xl font-black text-slate-900">₹0</h4>
                        </div>
                        <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-xl">
                            <p className="text-slate-400 font-bold text-sm italic">No pending dues</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Expiring in 48 Hours */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Expiring in 48 Hours</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center p-12 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                            <ShieldAlert size={24} />
                        </div>
                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">No memberships expiring soon</p>
                    </div>
                </div>

                {/* Membership Distribution */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Membership Distribution</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center p-12 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                        <p className="text-slate-500 font-black text-sm text-center tracking-tight mb-2">No active memberships</p>
                        <p className="text-slate-400 text-xs font-semibold">Add plans to see distribution</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Live Access Feed */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Live Access Feed</h3>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Real-time gym entrance logs</p>
                        </div>
                    </div>
                    <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <p className="text-slate-500 font-black text-base mb-2 italic">No access events yet</p>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Events will appear here in real-time</p>
                    </div>
                </div>

                {/* Member Voice */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                                <Users size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Member Voice</h3>
                        </div>
                        <button onClick={() => navigate('/operations/feedback')} className="text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-700 transition-colors bg-violet-50 px-3 py-1.5 rounded-lg">
                            View All
                        </button>
                    </div>
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-500 font-bold text-sm italic">No feedback yet</p>
                    </div>
                </div>
            </div>

            {/* 
            <div className="mt-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Daily Collection Summary</h3>
                        <p className="text-xs font-semibold text-slate-500 italic">Real-time revenue tracking for today</p>
                    </div>
                    <button
                        onClick={() => navigate('/finance/cashier')}
                        className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
                    >
                        <IndianRupee size={16} />
                        Receive Payment
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-[24px] p-4 md:p-6 border border-slate-100 shadow-xl flex items-center gap-4 transition-all duration-200 md:hover:shadow-2xl md:hover:-translate-y-0.5 group">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center transition-transform">
                            <Banknote size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cash Collection</p>
                            <h4 className="text-2xl font-black text-slate-800">₹{financials.collection.cash.toLocaleString()}</h4>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] p-4 md:p-6 border border-slate-100 shadow-xl flex items-center gap-4 transition-all duration-200 md:hover:shadow-2xl md:hover:-translate-y-0.5 group">
                        <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center transition-transform">
                            <Smartphone size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UPI / QR Sales</p>
                            <h4 className="text-2xl font-black text-slate-800">₹{financials.collection.upi.toLocaleString()}</h4>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] p-4 md:p-6 border border-slate-100 shadow-xl flex items-center gap-4 transition-all duration-200 md:hover:shadow-2xl md:hover:-translate-y-0.5 group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center transition-transform">
                            <CreditCard size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Payments</p>
                            <h4 className="text-2xl font-black text-slate-800">₹{financials.collection.card.toLocaleString()}</h4>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[24px] p-4 md:p-6 shadow-xl flex items-center gap-4 transition-all duration-200 md:hover:shadow-2xl md:hover:-translate-y-0.5 group text-white border-2 border-slate-800">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center transition-transform">
                            <IndianRupee size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Net Revenue Today</p>
                            <h4 className="text-2xl font-black italic">
                                ₹{(financials.collection.cash + financials.collection.upi + financials.collection.card - financials.expenses.today).toLocaleString()}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            */}

            {/* SAFELY COMMENTED OUT PREVIOUS CONTENT */}
            {/* 
            <div className="mt-12 pt-8 border-t border-slate-200 opacity-20 pointer-events-none hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-600 mb-2">{stat.title}</p>
                                        <h3 className="text-3xl font-black text-slate-900 mb-2">{stat.value}</h3>
                                        <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                            <TrendingUp size={14} className="text-emerald-500" />
                                            {stat.trend}
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shadow-lg">
                                        <Icon size={24} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-[32px] p-6 border-b-4 border-rose-500 shadow-xl flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                            <XOctagon size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Defaulter Check-ins</p>
                            <h4 className="text-2xl font-black text-slate-800">{risks.defaulters}</h4>
                        </div>
                    </div>
                    <div className="bg-white rounded-[32px] p-6 border-b-4 border-amber-500 shadow-xl flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Zap size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiring Soon</p>
                            <h4 className="text-2xl font-black text-slate-800">{risks.expiringSoon}</h4>
                        </div>
                    </div>
                </div>
                <LiveAccessControl userRole="MANAGER" />
                <FacilityStatusOverview equipment={equipment} />
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Users size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Trainer Status</h3>
                    </div>
                    <div className="space-y-4">
                        {trainers.map((trainer) => (
                            <div key={trainer.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{trainer.name}</div>
                                        <div className="text-xs text-slate-500 font-medium">{trainer.specialty}</div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${trainer.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {trainer.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                            <Banknote size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cash Collection</p>
                            <h4 className="text-2xl font-black text-slate-800">₹{financials.collection.cash.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
                <RenewalAlertsWidget />
                <div className="p-6">
                    <TodayFollowUps isWidget={true} />
                </div>
            </div>
            */}
        </div>
    );
};

export default BranchManagerDashboard;

