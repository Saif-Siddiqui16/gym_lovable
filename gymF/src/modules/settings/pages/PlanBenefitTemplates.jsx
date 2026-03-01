import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Crown, Package, Download } from 'lucide-react';

const PlanBenefitTemplates = () => {
    const [selectedPlans, setSelectedPlans] = useState([]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);

    const membershipPlans = [
        { id: 'bp_1', name: 'Basic Monthly', price: '₹1,500', desc: 'Gym access only — 30 days' },
        { id: 'bp_2', name: 'Standard Monthly', price: '₹2,500', desc: 'Gym + Group Classes — 30 days' },
        { id: 'bp_3', name: 'Premium Monthly', price: '₹4,000', desc: 'Full access with all amenities — 30 days' },
        { id: 'bp_4', name: 'Quarterly Plan', price: '₹10,800', desc: 'Full access — 90 days with 10% discount' },
        { id: 'bp_5', name: 'Half Yearly Plan', price: '₹20,400', desc: 'Full access — 180 days with 15% discount' },
        { id: 'bp_6', name: 'Annual Plan', price: '₹36,000', desc: 'Full access — 365 days with 25% discount' },
        { id: 'bp_7', name: 'Day Pass', price: '₹200', desc: 'Single day gym access' },
        { id: 'bp_8', name: 'Student Plan', price: '₹1,000', desc: 'Discounted monthly plan for students' },
    ];

    const benefitTypes = [
        { id: 'bt_1', name: 'Gym Access', desc: 'Full gym floor access', bookable: false },
        { id: 'bt_2', name: 'Swimming Pool', desc: 'Pool access with lane booking', bookable: true },
        { id: 'bt_3', name: 'Steam Room', desc: 'Steam and sauna facility', bookable: true },
        { id: 'bt_4', name: 'Group Classes', desc: 'All group fitness classes', bookable: true },
        { id: 'bt_5', name: 'Personal Training', desc: '1-on-1 trainer sessions', bookable: true },
        { id: 'bt_6', name: 'Locker', desc: 'Personal locker assignment', bookable: false },
        { id: 'bt_7', name: 'Towel Service', desc: 'Fresh towel each visit', bookable: false },
        { id: 'bt_8', name: 'Nutrition Consultation', desc: 'Diet plan consultations', bookable: true },
        { id: 'bt_9', name: 'Body Composition Analysis', desc: 'InBody / body scan sessions', bookable: true },
        { id: 'bt_10', name: 'Parking', desc: 'Dedicated parking spot', bookable: false },
    ];

    const togglePlan = (id) => {
        setSelectedPlans(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const toggleBenefit = (id) => {
        setSelectedBenefits(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
    };

    const totalSelected = selectedPlans.length + selectedBenefits.length;

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-10 max-w-6xl mx-auto font-sans">
            {/* Header Section */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg">
                        <Sparkles size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-3">
                            Pre-built Templates
                        </h1>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
                            Select and import ready-made membership plans and benefit types into your branch. Duplicates are automatically skipped.
                        </p>
                    </div>
                </div>
            </div>

            {/* Membership Plans Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Crown size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Membership Plans</h2>
                    </div>
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {selectedPlans.length} selected
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {membershipPlans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => togglePlan(plan.id)}
                            className={`group relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 ${selectedPlans.includes(plan.id) ? 'border-indigo-600 shadow-md transform -translate-y-1' : 'border-slate-50 hover:border-slate-200 hover:shadow-sm'}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlans.includes(plan.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-transparent group-hover:border-slate-300'}`}>
                                    <CheckCircle2 size={14} strokeWidth={3} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-slate-800 tracking-tight">{plan.name}</h3>
                                        <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-black text-indigo-600">
                                            {plan.price}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium">{plan.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefit Types Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Package size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Benefit Types</h2>
                    </div>
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {selectedBenefits.length} selected
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefitTypes.map((benefit) => (
                        <div
                            key={benefit.id}
                            onClick={() => toggleBenefit(benefit.id)}
                            className={`group relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 ${selectedBenefits.includes(benefit.id) ? 'border-indigo-600 shadow-md transform -translate-y-1' : 'border-slate-50 hover:border-slate-200 hover:shadow-sm'}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedBenefits.includes(benefit.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-transparent group-hover:border-slate-300'}`}>
                                    <CheckCircle2 size={14} strokeWidth={3} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-slate-800 tracking-tight">{benefit.name}</h3>
                                        {benefit.bookable && (
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                                                Bookable
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium">{benefit.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Section */}
            <div className="pt-4 pb-8">
                <button
                    disabled={totalSelected === 0}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-md ${totalSelected > 0 ? 'bg-slate-500 text-white hover:bg-slate-600 active:scale-[0.98]' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                >
                    <Download size={20} />
                    Import Selected ({totalSelected} templates)
                </button>
            </div>
        </div>
    );
};

export default PlanBenefitTemplates;
