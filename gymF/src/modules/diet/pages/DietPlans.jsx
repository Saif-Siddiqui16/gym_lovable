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
import { toast } from 'react-hot-toast';
import apiClient from '../../../api/apiClient';

const DietPlans = ({ role }) => {
    const navigate = useNavigate();
    const isMember = role === ROLES.MEMBER;

    const [dietPlans, setDietPlans] = React.useState([]);
    const [loadingPlans, setLoadingPlans] = React.useState(false);
    const [requesting, setRequesting] = React.useState(false);

    React.useEffect(() => {
        if (isMember) {
            fetchMyPlans();
        }
    }, [isMember]);

    const fetchMyPlans = async () => {
        try {
            setLoadingPlans(true);
            const res = await apiClient.get('/member/diet-plans');
            setDietPlans(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPlans(false);
        }
    };

    const handleRequestPlan = async () => {
        try {
            setRequesting(true);
            await apiClient.post('/member/service-requests', {
                type: 'Diet Plan',
                rawType: 'diet_plan',
                details: 'Member requested a personalized diet plan.'
            });
            toast.success('Diet plan requested successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to request diet plan. Please try again.');
        } finally {
            setRequesting(false);
        }
    };

    if (isMember) {
        const activePlan = dietPlans.length > 0 ? dietPlans[0] : null;
        let macrosObj = { protein: '0g', carbs: '0g', fat: '0g' };
        let mealsArr = [];

        if (activePlan) {
            try {
                if (activePlan.macros) {
                    macrosObj = typeof activePlan.macros === 'string' ? JSON.parse(activePlan.macros) : activePlan.macros;
                }
            } catch (e) {
                console.warn('Could not parse macros data', e);
            }
            try {
                if (activePlan.meals) {
                    mealsArr = typeof activePlan.meals === 'string' ? JSON.parse(activePlan.meals) : activePlan.meals;
                    if (!Array.isArray(mealsArr)) {
                        // Sometimes meals might be an object instead of array depending on structure
                        mealsArr = Object.values(mealsArr);
                    }
                }
            } catch (e) {
                console.warn('Could not parse meals data', e);
            }
        }

        return (
            <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-8 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b-2 border-slate-100">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 animate-in zoom-in duration-500 shrink-0">
                            <UtensilsCrossed size={32} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-1 truncate">
                                {activePlan ? activePlan.name : 'My Diet Plan'}
                            </h1>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-widest shrink-0">
                                    Target:
                                </span>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100 truncate">
                                    {activePlan ? activePlan.target : 'Your personalized nutrition guide'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleRequestPlan}
                        disabled={requesting}
                        className="w-full sm:w-auto px-8 h-12 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                        <RefreshCcw size={16} strokeWidth={3} className={`transition-transform duration-500 ${requesting ? 'animate-spin' : 'group-hover:rotate-180'}`} /> Request New Plan
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                    {/* Main Section */}
                    <div className="md:col-span-2 space-y-6">
                        {loadingPlans ? (
                            <div className="flex justify-center p-12"><RefreshCcw className="animate-spin text-indigo-400" size={32} /></div>
                        ) : activePlan ? (
                            <>
                                {/* Macros Overview */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2"><Activity size={16} /></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calories</p>
                                        <p className="text-lg font-black text-slate-900">{activePlan.calories || '0'} kcal</p>
                                    </div>
                                    <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2"><Droplets size={16} /></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protein</p>
                                        <p className="text-lg font-black text-slate-900">{macrosObj.protein || '0g'}</p>
                                    </div>
                                    <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2"><Leaf size={16} /></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Carbs</p>
                                        <p className="text-lg font-black text-slate-900">{macrosObj.carbs || '0g'}</p>
                                    </div>
                                    <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                                        <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mb-2"><Target size={16} /></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fats</p>
                                        <p className="text-lg font-black text-slate-900">{macrosObj.fat || macrosObj.fats || '0g'}</p>
                                    </div>
                                </div>

                                {/* Meals Sequence */}
                                <div className="space-y-4">
                                    {mealsArr.length > 0 ? mealsArr.map((meal, idx) => (
                                        <Card key={idx} className="p-5 border border-slate-100 hover:border-indigo-100 bg-[#FCFCFE] rounded-2xl transition-all">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[12px] font-black text-indigo-600">
                                                        <UtensilsCrossed size={14} />
                                                    </span>
                                                    <div>
                                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{meal.name || `Meal ${idx + 1}`}</h4>
                                                        {meal.time && (
                                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                                                <Clock size={10} /> {meal.time}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {meal.calories && (
                                                    <span className="px-3 py-1 bg-white border border-slate-100 text-[10px] font-black text-slate-600 rounded-lg shadow-sm whitespace-nowrap self-start sm:self-auto">
                                                        {meal.calories} kcal
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                {meal.items || meal.description || meal.food || 'No details provided.'}
                                            </div>
                                            {meal.macros && (
                                                <div className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-4">
                                                    <span>Pro: {meal.macros.protein || '0g'}</span>
                                                    <span>Carb: {meal.macros.carbs || '0g'}</span>
                                                    <span>Fat: {meal.macros.fat || '0g'}</span>
                                                </div>
                                            )}
                                        </Card>
                                    )) : (
                                        <div className="py-10 text-center text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                                            <p className="text-xs font-bold uppercase tracking-widest">No meals detailed in this plan.</p>
                                        </div>
                                    )}
                                </div>
                                {activePlan.notes && (
                                    <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-sm font-bold text-slate-700 italic">
                                        " {activePlan.notes} "
                                    </div>
                                )}
                            </>
                        ) : (
                            <Card className="p-10 border-2 border-slate-100 shadow-sm rounded-3xl bg-white">
                                <div className="flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100">
                                        <Leaf size={40} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                                            No Active Diet Plan
                                        </h2>
                                        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                                            You don't have a personalized diet plan yet. Request one from your trainer!
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleRequestPlan}
                                        disabled={requesting}
                                        className="px-10 h-14 bg-indigo-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/10 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                                        {requesting ? 'Requesting...' : 'Request Diet Plan'}
                                    </button>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Tips Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                                <Info size={16} />
                            </div>
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">🥗 Nutrition Tips</h2>
                        </div>

                        <Card className="p-6 border-2 border-slate-100 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <ul className="space-y-6">
                                {[
                                    "Eat 3-5 small meals throughout the day",
                                    "Drink at least 8 glasses of water daily",
                                    "Include protein in every meal",
                                    "Avoid processed foods and sugary drinks",
                                    "Eat your last meal 2-3 hours before sleeping"
                                ].map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:bg-white transition-colors" />
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
                                            {tip}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div className="flex flex-col gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                                        <Leaf size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Nutritionist Tip</p>
                                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Fuel your body, feed your soul.</p>
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
