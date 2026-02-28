import React, { useState } from 'react';
import {
    Activity,
    TrendingUp,
    Scale,
    Percent,
    Calendar,
    Ruler,
    Dumbbell,
    Utensils,
    Search,
    ChevronRight,
    Target,
    Zap
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import StatsCard from '../../dashboard/components/StatsCard';
import DashboardGrid from '../../dashboard/components/DashboardGrid';

const MemberProgress = () => {
    const [activeTab, setActiveTab] = useState('Measurements');

    const stats = [
        { title: 'Weight', value: '75 kg', icon: Scale, color: 'primary' },
        { title: 'Height', value: '- cm', icon: Ruler, color: 'success' },
        { title: 'Body Fat', value: '18%', icon: Percent, color: 'warning' },
        { title: 'Last Updated', value: '28 Feb', icon: Calendar, color: 'info' }
    ];

    const tabs = ['Measurements', 'Workout Plan', 'Diet Plan'];

    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                        <TrendingUp size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                            My Progress
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Track your fitness journey
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm">
                    <Activity size={18} className="text-indigo-600" />
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Active Journey</span>
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

            {/* Tabs & Content Section */}
            <div className="space-y-6">
                {/* Tab Switcher */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl w-fit border border-slate-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                                ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'Measurements' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-1">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Target size={16} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">My Measurements</h2>
                            </div>

                            <Card className="p-16 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[2.5rem] bg-white flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100 mb-8">
                                    <Search size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-black text-slate-400 tracking-tight uppercase mb-3 leading-none">No Data Available</h3>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'Workout Plan' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-1">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Dumbbell size={16} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Workout Plan</h2>
                            </div>
                            <Card className="p-16 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[2.5rem] bg-white flex flex-col items-center justify-center text-center">
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">No active workout plan assigned</p>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'Diet Plan' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-1">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Utensils size={16} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Diet Plan</h2>
                            </div>
                            <Card className="p-16 border-2 border-slate-100 shadow-2xl shadow-slate-100/20 rounded-[2.5rem] bg-white flex flex-col items-center justify-center text-center">
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">No active diet plan assigned</p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MemberProgress;

