import React, { useState, useEffect } from 'react';
import {
    Plus,
    Award,
    Users,
    CheckCircle,
    Clock,
    Link as LinkIcon,
    Gift,
    Copy,
    MessageCircle,
    UserPlus,
    Share2,
    IndianRupee,
    UserCheck,
    History,
    Shield
} from 'lucide-react';
import { referralApi } from '../../../api/referralApi';
import RightDrawer from '../../../components/common/RightDrawer';
import { useBranchContext } from '../../../context/BranchContext';
import { getMembers } from '../../../api/manager/managerApi';
import { ROLES } from '../../../config/roles';
import Card from '../../../components/ui/Card';
import toast from 'react-hot-toast';
import '../../../styles/GlobalDesign.css';

const Referrals = ({ role }) => {
    const [referrals, setReferrals] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(role !== ROLES.MEMBER);
    const { selectedBranch } = useBranchContext();
    const [activeTab, setActiveTab] = useState('Referrals');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Form State for Admin
    const [formData, setFormData] = useState({
        referrerId: '',
        referredName: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (role !== ROLES.MEMBER) {
            loadReferrals();
            loadMembersList();
        }
    }, [selectedBranch, role]);

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

    const handleCopyCode = () => {
        navigator.clipboard.writeText('MEM001');
        toast.success('Referral code copied!');
    };

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent('Join me at the gym! Use my referral code MEM001 to get special rewards.');
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    // Member-specific UI rendering
    if (role === ROLES.MEMBER) {
        return (
            <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-10 fade-in scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-10 border-b-2 border-slate-100">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-100 animate-in zoom-in duration-500">
                            <Gift size={40} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1 uppercase">
                                Refer & <span className="text-indigo-600">Earn</span>
                            </h1>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                                Invite friends and earn rewards
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-5xl">
                    {/* Referral Code Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Share2 size={16} />
                            </div>
                            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Referral Link</h2>
                        </div>
                        <Card className="p-10 border-2 border-slate-100 shadow-sm rounded-3xl bg-white overflow-hidden relative">
                            <div className="flex flex-col items-center justify-center text-center space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Referral Code</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                        Share this code with friends to earn rewards
                                    </p>
                                </div>

                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 px-8 py-4 rounded-2xl">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-[0.2em]">MEM001</h3>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                                    <button
                                        onClick={handleCopyCode}
                                        className="flex-1 min-w-[160px] h-12 bg-white border-2 border-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-slate-100/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Copy size={14} strokeWidth={3} className="text-indigo-600 group-hover:scale-110 transition-transform" /> Copy Link
                                    </button>
                                    <button
                                        onClick={handleWhatsAppShare}
                                        className="flex-1 min-w-[160px] h-12 bg-[#25D366] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-emerald-100/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group border-none"
                                    >
                                        <MessageCircle size={14} strokeWidth={3} className="text-white group-hover:rotate-12 transition-transform" /> Share on WhatsApp
                                    </button>
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -top-10 -right-10 p-20 text-indigo-600/[0.02] rotate-12">
                                <UserPlus size={400} strokeWidth={0.5} />
                            </div>
                        </Card>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Award size={16} />
                            </div>
                            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Stats Overview</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-8 border-2 border-slate-100 shadow-sm rounded-3xl bg-white text-center space-y-2">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users size={20} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Referrals Sent</h4>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">0</p>
                            </Card>
                            <Card className="p-8 border-2 border-slate-100 shadow-sm rounded-3xl bg-white text-center space-y-2">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <UserCheck size={20} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Successful Signups</h4>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">0</p>
                            </Card>
                            <Card className="p-8 border-2 border-slate-100 shadow-sm rounded-3xl bg-white text-center space-y-2">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <IndianRupee size={20} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rewards Earned</h4>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">₹0</p>
                            </Card>
                        </div>
                    </div>

                    {/* Referral History Section */}
                    <div className="space-y-6 pb-10">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <History size={16} />
                            </div>
                            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Referral History</h2>
                        </div>
                        <Card className="p-12 border-2 border-slate-100 shadow-sm rounded-3xl bg-white">
                            <div className="flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100">
                                    <Users size={48} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                                        No Referrals Yet
                                    </h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-xs mx-auto">
                                        No referrals yet. Share your code to get started!
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // Existing Admin/Staff UI
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
                        <Shield className="text-indigo-600" /> Referrals & Rewards
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
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                                <kpi.icon size={18} className={kpi.color} />
                            </div>
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
