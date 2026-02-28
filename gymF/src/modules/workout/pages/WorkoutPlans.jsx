import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dumbbell,
    UtensilsCrossed,
    Plus,
    Trash2,
    Search,
    Bell,
    Moon,
    BookmarkPlus,
    User,
    Save,
    ChevronRight,
    Zap,
    TrendingUp,
    Clock,
    CheckCircle2,
    Info,
    RefreshCcw,
    MoreVertical,
    Target
} from 'lucide-react';
import { ROLES } from '../../../config/roles';
import Card from '../../../components/ui/Card';
import '../../../styles/GlobalDesign.css';
import { toast } from 'react-hot-toast';

const DAY_LABELS = [
    { key: 'day1', label: 'Day 1', focus: 'Chest & Triceps' },
    { key: 'day2', label: 'Day 2', focus: 'Back & Biceps' },
    { key: 'day3', label: 'Day 3', focus: 'Legs & Glutes' },
    { key: 'day4', label: 'Day 4', focus: 'Shoulders & Arms' },
    { key: 'day5', label: 'Day 5', focus: 'Core & Cardio' },
    { key: 'day6', label: 'Day 6', focus: 'Full Body' },
    { key: 'day7', label: 'Day 7', focus: 'Rest & Recovery' },
];

const WorkoutPlans = ({ role }) => {
    const navigate = useNavigate();
    const isMember = role === ROLES.MEMBER;

    // View States
    const [memberActiveTab, setMemberActiveTab] = useState('today');

    // Trainer States
    const [planName, setPlanName] = useState('');
    const [description, setDescription] = useState('');
    const [activeDay, setActiveDay] = useState('day1');
    const [workoutExercises, setWorkoutExercises] = useState({
        day1: [{ id: Date.now(), name: 'Bench Press', sets: '3', reps: '12', rest: '60', equipment: 'Barbell', notes: 'Focus on form' }],
        day2: [], day3: [], day4: [], day5: [], day6: [], day7: []
    });

    const addExercise = (day) => {
        const newEx = {
            id: Date.now(),
            name: '',
            sets: '',
            reps: '',
            rest: '',
            equipment: '',
            notes: ''
        };
        setWorkoutExercises(prev => ({
            ...prev,
            [day]: [...prev[day], newEx]
        }));
    };

    const updateExercise = (day, id, field, value) => {
        setWorkoutExercises(prev => ({
            ...prev,
            [day]: prev[day].map(ex => ex.id === id ? { ...ex, [field]: value } : ex)
        }));
    };

    const removeExercise = (day, id) => {
        setWorkoutExercises(prev => ({
            ...prev,
            [day]: prev[day].filter(ex => ex.id !== id)
        }));
    };

    const handleSaveAsTemplate = () => {
        if (!planName.trim()) {
            toast.error('Please enter a plan name first');
            return;
        }
        toast.success('Template saved successfully');
    };

    if (isMember) {
        return (
            <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b-2 border-slate-100">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 animate-in zoom-in duration-500">
                            <Dumbbell size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                                My Workout
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                                    Goal:
                                </span>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                    Weight Loss, Strength
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="px-8 h-12 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2 group">
                        <RefreshCcw size={16} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-500" /> Request New Plan
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-4xl">
                    {/* Tab Switcher: Today's Workout / My Plan */}
                    <div className="p-1.5 bg-slate-100/50 rounded-2xl w-fit flex items-center gap-1.5 border border-white shadow-sm shadow-slate-200/50">
                        <button
                            onClick={() => setMemberActiveTab('today')}
                            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${memberActiveTab === 'today'
                                ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'
                                }`}
                        >
                            <Zap
                                size={18}
                                className={`transition-colors ${memberActiveTab === 'today' ? 'text-indigo-600' : 'text-slate-400 opacity-60'}`}
                            />
                            Today's Workout
                        </button>
                        <button
                            onClick={() => setMemberActiveTab('plan')}
                            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${memberActiveTab === 'plan'
                                ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'
                                }`}
                        >
                            <Dumbbell
                                size={18}
                                className={`transition-colors ${memberActiveTab === 'plan' ? 'text-indigo-600' : 'text-slate-400 opacity-60'}`}
                            />
                            My Plan
                        </button>
                    </div>

                    <div className="space-y-6">

                        {/* Today's Workout Card - Progress Info */}
                        <Card className="p-6 border-2 border-slate-100 shadow-sm rounded-3xl bg-white space-y-6">
                            {/* Workout Header Info */}
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                    Saturday — Full Body
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Current Focus
                                </p>
                            </div>

                            {/* Status & Progress Section */}
                            <div className="grid grid-cols-1 gap-4 pt-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Shuffle</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">0/0 exercises completed</p>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 w-0 transition-all duration-1000" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Empty State Card - Separated Section */}
                        <Card className="p-10 border-2 border-slate-100 shadow-sm rounded-3xl bg-white">
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100">
                                    <Info size={32} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                                        No exercises found for full_body.
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-xs">
                                        Ask your admin to seed exercises and assign them to your plan.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Tips Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <Info size={16} />
                            </div>
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">💡 Workout Tips</h2>
                        </div>

                        <Card className="p-8 border-2 border-slate-100 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <ul className="space-y-6">
                                {[
                                    "Warm up for 5-10 minutes before starting your workout",
                                    "Stay hydrated throughout your session",
                                    "Focus on proper form over heavy weights",
                                    "Rest 60-90 seconds between sets",
                                    "Track your progress in the My Progress section"
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
                                <div className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                                        <Target size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Pro Tip</p>
                                        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Consistency beats intensity.</p>
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
            <div className="max-w-7xl mx-auto">

                {/* Header with Switcher and Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-2 p-1.5 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm">
                        <button
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#F3F4F6] text-[#1A1A1A] transition-all shadow-sm"
                        >
                            <Dumbbell size={16} />
                            Workout Plan
                        </button>
                        <button
                            onClick={() => navigate('/diet-plans')}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:bg-gray-50 transition-all"
                        >
                            <UtensilsCrossed size={16} />
                            Diet Plan
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 h-11 pl-10 pr-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-indigo-200 transition-all text-sm font-medium"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-400 font-bold">
                                ⌘ K
                            </div>
                        </div>
                        <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                            <Moon size={18} />
                        </button>
                        <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-gray-50 transition-all shadow-sm relative">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center text-white font-black text-xs shadow-lg shadow-orange-100 cursor-pointer hover:scale-105 transition-all">
                            DT
                        </div>
                    </div>
                </div>

                {/* Plan Info Card */}
                <div className="saas-card !p-8 !mb-8 !rounded-[32px] bg-white border-gray-100 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-6">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Plan Builder</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Design customized workout sequences</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSaveAsTemplate}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <BookmarkPlus size={16} />
                                Template
                            </button>
                            <button
                                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.15em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                            >
                                <User size={16} />
                                Assign
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Plan Name <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                placeholder="e.g. Muscle Gain - Phase 1"
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                                className="w-full h-12 px-4 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Description</label>
                            <input
                                type="text"
                                placeholder="Brief protocol overview..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-12 px-4 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Workout Builder Section */}
                <div className="saas-card !p-0 !mb-0 !rounded-[32px] bg-white border-gray-100 shadow-sm overflow-hidden">
                    {/* Day Selector Tabs */}
                    <div className="flex overflow-x-auto border-b border-gray-50 bg-[#FCFCFE]">
                        {DAY_LABELS.map((day) => (
                            <button
                                key={day.key}
                                onClick={() => setActiveDay(day.key)}
                                className={`flex-shrink-0 px-8 py-5 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeDay === day.key
                                    ? 'text-indigo-600 border-indigo-600 bg-white'
                                    : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-white/60'
                                    }`}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {/* Day Header Info */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Dumbbell size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-tight">
                                        {DAY_LABELS.find(d => d.key === activeDay).label}
                                    </h3>
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-0.5">
                                        {DAY_LABELS.find(d => d.key === activeDay).focus}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => addExercise(activeDay)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all"
                            >
                                <Plus size={16} strokeWidth={3} />
                                Add Exercise
                            </button>
                        </div>

                        {/* Exercise Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-50">
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 w-[25%] px-2">Exercise Name</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center px-2">Sets</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center px-2">Reps</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center px-2">Rest (s)</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Equipment</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Notes</th>
                                        <th className="pb-4 w-12 px-2"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {workoutExercises[activeDay].map((ex) => (
                                        <tr key={ex.id}>
                                            <td className="py-3 px-2">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Bench Press"
                                                    value={ex.name}
                                                    onChange={(e) => updateExercise(activeDay, ex.id, 'name', e.target.value)}
                                                    className="w-full h-11 px-4 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all shadow-sm"
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input
                                                    type="text"
                                                    value={ex.sets}
                                                    onChange={(e) => updateExercise(activeDay, ex.id, 'sets', e.target.value)}
                                                    className="w-16 h-11 px-2 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all text-center shadow-sm mx-auto"
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input
                                                    type="text"
                                                    value={ex.reps}
                                                    onChange={(e) => updateExercise(activeDay, ex.id, 'reps', e.target.value)}
                                                    className="w-16 h-11 px-2 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all text-center shadow-sm mx-auto"
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input
                                                    type="text"
                                                    value={ex.rest}
                                                    onChange={(e) => updateExercise(activeDay, ex.id, 'rest', e.target.value)}
                                                    className="w-16 h-11 px-2 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all text-center shadow-sm mx-auto"
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input
                                                    type="text"
                                                    placeholder="Equipment"
                                                    value={ex.equipment}
                                                    onChange={(e) => updateExercise(activeDay, ex.id, 'equipment', e.target.value)}
                                                    className="w-full h-11 px-4 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all shadow-sm"
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input
                                                    type="text"
                                                    placeholder="Notes"
                                                    value={ex.notes}
                                                    onChange={(e) => updateExercise(activeDay, ex.id, 'notes', e.target.value)}
                                                    className="w-full h-11 px-4 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-200 transition-all shadow-sm"
                                                />
                                            </td>
                                            <td className="py-3 px-2 text-right">
                                                <button
                                                    onClick={() => removeExercise(activeDay, ex.id)}
                                                    className="p-2.5 text-red-100 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {workoutExercises[activeDay].length === 0 && (
                                <div className="py-20 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30 rounded-3xl border-2 border-dashed border-gray-100 mt-4">
                                    <Dumbbell size={48} strokeWidth={1} className="mb-4 opacity-20" />
                                    <p className="text-sm font-bold">No exercises added for this day.</p>
                                    <button
                                        onClick={() => addExercise(activeDay)}
                                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline"
                                    >
                                        Add your first exercise
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Design Extras */}
            <style>{`
                .saas-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .saas-card:hover {
                    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
                }
                ::-webkit-scrollbar {
                    height: 4px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default WorkoutPlans;
