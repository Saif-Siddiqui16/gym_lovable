import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RightDrawer from '../../../components/common/RightDrawer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import amenityApi from '../../../api/amenityApi';

const CreateMembershipPlanDrawer = ({ isOpen, onClose, onSave, initialData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discountedPrice: '',
        duration: 30,
        durationType: 'Days',
        admissionFee: 0,
        maxFreezeDays: 0,
        transferable: false,
        active: false,
        visibleToMembers: false,
        includesFreeLocker: false,
        benefits: []
    });
    const [amenities, setAmenities] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchAmenities = async () => {
                try {
                    const data = await amenityApi.getAll();
                    const filteredData = data.filter(a => !['ICE BATH F', 'ICE BATH M'].includes(a.name));
                    setAmenities(filteredData);
                } catch (error) {
                    console.error('Failed to fetch amenities:', error);
                }
            };
            fetchAmenities();

            if (initialData) {
                setFormData(initialData);
            } else {
                setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    discountedPrice: '',
                    duration: 30,
                    durationType: 'Days',
                    admissionFee: 0,
                    maxFreezeDays: 0,
                    transferable: false,
                    active: false,
                    visibleToMembers: false,
                    includesFreeLocker: false,
                    benefits: []
                });
            }
        }
    }, [isOpen, initialData]);

    const handleBenefitToggle = (benefitId) => {
        setFormData(prev => {
            const exists = prev.benefits.find(b => b.id === benefitId);
            if (exists) {
                return { ...prev, benefits: prev.benefits.filter(b => b.id !== benefitId) };
            } else {
                return {
                    ...prev,
                    benefits: [...prev.benefits, { id: benefitId, limit: 'Unlimited' }]
                };
            }
        });
    };

    const handleLimitChange = (benefitId, newLimit) => {
        setFormData(prev => ({
            ...prev,
            benefits: prev.benefits.map(b => b.id === benefitId ? { ...b, limit: newLimit } : b)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const Toggle = ({ checked, onChange, title, description }) => (
        <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 rounded-lg">
            <div className="flex-1 pr-4">
                <h4 className="text-sm font-bold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer pt-1">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
        </div>
    );

    return (
        <RightDrawer
            isOpen={isOpen}
            onClose={onClose}
            title="Add Membership Plan"
            subtitle="Create a new membership plan with benefits"
            maxWidth="max-w-2xl"
            footer={
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1 py-3 rounded-xl">Cancel</Button>
                    <Button
                        type="submit"
                        form="membership-plan-form"
                        variant="primary"
                        className="flex-1 py-3 rounded-xl shadow-lg shadow-indigo-200"
                    >
                        Create Plan
                    </Button>
                </div>
            }
        >
            <form id="membership-plan-form" onSubmit={handleSubmit} className="p-6 space-y-6">

                {/* 1. Plan Name */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Plan Name *</label>
                    <Input
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Monthly Basic, Annual Premium, etc."
                        className="font-bold"
                        required
                    />
                </div>

                {/* 2. Description */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                        className="w-full p-4 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none resize-none h-24 transition-all"
                        placeholder="Plan description..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* 3 & 4. Price & Discounted Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (₹) *</label>
                        <Input
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            className="font-bold"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Discounted Price (₹)</label>
                        <Input
                            type="number"
                            value={formData.discountedPrice}
                            onChange={e => setFormData({ ...formData, discountedPrice: e.target.value })}
                            placeholder="Optional"
                            className="font-bold"
                        />
                    </div>
                </div>

                {/* 5, 6 & 7. Duration, Admission Fee, Max Freeze Days */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Duration (days) *</label>
                        <Input
                            type="number"
                            value={formData.duration}
                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            className="font-bold"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admission Fee (₹)</label>
                        <Input
                            type="number"
                            value={formData.admissionFee}
                            onChange={e => setFormData({ ...formData, admissionFee: e.target.value })}
                            className="font-bold"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Max Freeze Days</label>
                        <Input
                            type="number"
                            value={formData.maxFreezeDays}
                            onChange={e => setFormData({ ...formData, maxFreezeDays: e.target.value })}
                            className="font-bold"
                        />
                    </div>
                </div>

                {/* Toggles */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 space-y-1">
                    <Toggle
                        title="Allow membership transfer"
                        description="Transferable"
                        checked={formData.transferable}
                        onChange={(e) => setFormData({ ...formData, transferable: e.target.checked })}
                    />
                    <Toggle
                        title="Show plan in purchase options"
                        description="Active"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />
                    <Toggle
                        title="Show on member dashboard for self-purchase"
                        description="Visible to Members"
                        checked={formData.visibleToMembers}
                        onChange={(e) => setFormData({ ...formData, visibleToMembers: e.target.checked })}
                    />
                    <Toggle
                        title="Auto-assigns a physical locker on purchase. For session tracking, add the Locker benefit above."
                        description="Includes Free Locker"
                        checked={formData.includesFreeLocker}
                        onChange={(e) => setFormData({ ...formData, includesFreeLocker: e.target.checked })}
                    />
                </div>

                {/* Plan Benefits */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Plan Benefits</h3>
                            <p className="text-xs text-slate-500 mt-1">Add benefits with quantity for the membership duration</p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/settings/amenities')}
                            className="text-xs h-8 px-3"
                        >
                            Manage Types
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {amenities.map(benefit => {
                            const isSelected = formData.benefits?.find(b => b.id === benefit.id);
                            return (
                                <div
                                    key={benefit.id}
                                    className={`p-4 rounded-xl border-2 transition-all ${isSelected
                                        ? 'border-indigo-500 bg-indigo-50/10'
                                        : 'border-gray-100 bg-white hover:border-indigo-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            onClick={() => handleBenefitToggle(benefit.id)}
                                            className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                                                }`}
                                        >
                                            {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-col justify-between items-start gap-1">
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{benefit.name}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{benefit.description || 'Facility access'}</p>
                                                </div>
                                                {benefit.gender && benefit.gender !== 'UNISEX' && (
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${benefit.gender === 'MALE' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                                        {benefit.gender} ONLY
                                                    </span>
                                                )}
                                            </div>

                                            {isSelected && (
                                                <div className="mt-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                                            Usage Limit (Total)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full h-9 px-3 bg-white border border-indigo-200 rounded-lg text-sm font-bold text-indigo-700 outline-none focus:ring-2 focus:ring-indigo-100"
                                                            value={isSelected.limit}
                                                            onChange={e => handleLimitChange(benefit.id, e.target.value)}
                                                            placeholder="e.g. 5 or Unlimited"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {amenities.length === 0 && (
                            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-900 font-bold text-sm mb-1">No benefit types created yet</p>
                                <p className="text-gray-500 text-xs">Create Benefit Types in Settings</p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </RightDrawer>
    );
};

export default CreateMembershipPlanDrawer;
