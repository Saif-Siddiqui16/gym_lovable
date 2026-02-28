import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UtensilsCrossed,
    Clock,
    Plus,
    CheckCircle2,
    Info,
    RefreshCcw,
    ChevronRight,
    Leaf,
    Droplets,
    Activity,
    Target
} from 'lucide-react';
import { ROLES } from '../../../config/roles';
import Card from '../../../components/ui/Card';
import '../../../styles/GlobalDesign.css';

const DietPlans = ({ role }) => {
    const navigate = useNavigate();
    const isMember = role === ROLES.MEMBER;

    if (isMember) {
        return (
            <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b-2 border-slate-100">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 animate-in zoom-in duration-500">
                            <UtensilsCrossed size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                                My Diet Plan
                            </h1>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                                Your personalized nutrition guide
                            </p>
                        </div>
                    </div>
                    <button className="px-8 h-12 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2 group">
                        <RefreshCcw size={16} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-500" /> Request New Plan
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-4xl">
                    {/* Main Section - No Active Diet Plan */}
                    <div className="space-y-6">
                        <Card className="p-10 border-2 border-slate-100 shadow-sm rounded-3xl bg-white">
                            <div className="flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100">
                                    <Leaf size={40} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                        No Active Diet Plan
                                    </h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-md">
                                        You don't have a personalized diet plan yet. Request one from your trainer!
                                    </p>
                                </div>
                                <button className="px-10 h-14 bg-indigo-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/10 hover:scale-105 active:scale-95 transition-all">
                                    Request Diet Plan
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Tips Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <Info size={16} />
                            </div>
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">🥗 Nutrition Tips</h2>
                        </div>

                        <Card className="p-8 border-2 border-slate-100 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <ul className="space-y-6">
                                {[
                                    "Eat 5-6 small meals throughout the day",
                                    "Drink at least 8 glasses of water daily",
                                    "Include protein in every meal",
                                    "Avoid processed foods and sugary drinks",
                                    "Eat your last meal 2-3 hours before sleeping"
                                ].map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-4 group">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:bg-white transition-colors" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
                                            {tip}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 pt-8 border-t border-slate-100">
                                <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                                        <Leaf size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Nutritionist Tip</p>
                                        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Fuel your body, feed your soul.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-[#FBFBFE] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto text-center py-20">
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Trainer Diet Module</h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Trainer view is coming soon.</p>
                <button
                    onClick={() => navigate('/workout-plans')}
                    className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                >
                    Back to Workouts
                </button>
            </div>
        </div>
    );
};

export default DietPlans;
