import React, { useState, useEffect } from 'react';
import { Plus, Award, Users, CheckCircle, Clock, Link as LinkIcon, Gift } from 'lucide-react';
import { referralApi } from '../../../api/referralApi';
import RightDrawer from '../../../components/common/RightDrawer';
import { useBranchContext } from '../../../context/BranchContext';
import { getMembers } from '../../../api/manager/managerApi';
import toast from 'react-hot-toast';

const Referrals = () => {
    const [referrals, setReferrals] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedBranch } = useBranchContext();
    const [activeTab, setActiveTab] = useState('Referrals');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        referrerId: '',
        referredName: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        loadReferrals();
        loadMembersList();
    }, [selectedBranch]);

    const loadMembersList = async () => {
        try {
            const result = await getMembers({ branchId: selectedBranch, limit: 1000 });
            setMembers(result?.data || []);
        } catch (error) {
            console.error("Failed to load members for dropdown:", error);
        }
    };

    const loadReferrals = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedBranch && selectedBranch !== 'all') {
                params.branchId = selectedBranch;
            }
            const data = await referralApi.getAllReferrals(params);
            setReferrals(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load referrals:', error);
            toast.error('Failed to load referrals');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateReferral = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (selectedBranch && selectedBranch !== 'all') {
                payload.branchId = selectedBranch;
            }
            await referralApi.createReferral(payload);
            toast.success('Referral created successfully');
            setIsDrawerOpen(false);
            setFormData({ referrerId: '', referredName: '', phone: '', email: '' });
            loadReferrals();
        } catch (error) {
            console.error('Failed to create referral:', error);
            toast.error(error?.response?.data?.message || 'Failed to create referral');
        }
    };

    const kpiCards = [
        { label: 'Total Referrals', value: referrals.length, icon: Users, color: 'text-blue-500' },
        { label: 'Converted', value: referrals.filter(r => r.status === 'Converted').length, icon: CheckCircle, color: 'text-emerald-500' },
        { label: 'Pending', value: referrals.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-amber-500' },
        { label: 'Total Rewards', value: '₹0', subtext: '₹0 claimed', icon: Gift, color: 'text-violet-500' }
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        Referrals & Rewards
                    </h1>
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        <Plus size={18} /> Create Referral
                    </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpiCards.map((kpi, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                            <div className="mt-4 flex items-baseline gap-2">
                                <h3 className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</h3>
                                {kpi.subtext && <span className="text-xs text-slate-400">{kpi.subtext}</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100/50 p-1 rounded-lg w-fit">
                    {['Referrals', 'Rewards'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">
                            {activeTab === 'Referrals' ? 'All Referrals' : 'Reward History'}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                        </div>
                    ) : activeTab === 'Referrals' ? (
                        referrals.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Referred Person</th>
                                            <th className="px-6 py-4">Referrer</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Reward Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {referrals.map((ref, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-slate-900">{ref.referredName}</div>
                                                    <div className="text-xs text-slate-500">{ref.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-slate-900">{ref.referrerName || 'N/A'}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {new Date(ref.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${ref.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' :
                                                        ref.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-slate-100 text-slate-700'
                                                        }`}>
                                                        {ref.status || 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {ref.rewardStatus || 'Pending'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                <Users size={40} className="text-slate-300 mb-4" />
                                <p className="text-sm">No referrals found.</p>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                            <Gift size={40} className="text-slate-300 mb-4" />
                            <p className="text-sm">No reward history found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Referral Drawer */}
            <RightDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Create Referral"
                subtitle="Manually log a referral from a walk-in or phone inquiry"
            >
                <form onSubmit={handleCreateReferral} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Referrer Member *</label>
                        <select
                            required
                            value={formData.referrerId}
                            onChange={(e) => setFormData({ ...formData, referrerId: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm bg-white"
                        >
                            <option value="">Select member who referred</option>
                            {members.map(member => (
                                <option key={member.id} value={member.memberId}>
                                    {member.name} ({member.memberId})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Referred Person Name *</label>
                        <input
                            required
                            type="text"
                            placeholder="Name of the referred person"
                            value={formData.referredName}
                            onChange={(e) => setFormData({ ...formData, referredName: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone *</label>
                        <input
                            required
                            type="tel"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex-1 px-4 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                        >
                            Create Referral
                        </button>
                    </div>
                </form>
            </RightDrawer>
        </div>
    );
};

export default Referrals;
