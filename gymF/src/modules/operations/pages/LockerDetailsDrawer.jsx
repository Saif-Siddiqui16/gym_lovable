import React, { useState, useEffect } from 'react';
import {
    Lock,
    Unlock,
    Clock,
    AlertCircle,
    User,
    Settings,
    Calendar,
    Shield,
    Trash2,
    ExternalLink,
    CheckCircle2,
    XCircle,
    Info,
    Smartphone,
    MapPin,
    Hash
} from 'lucide-react';
import { lockerApi } from '../../../api/lockerApi';
import { getMembers } from '../../../api/staff/memberApi';
import { useBranchContext } from '../../../context/BranchContext';
import toast from 'react-hot-toast';

const LockerDetailsDrawer = ({ locker, onClose, onSuccess }) => {
    const { selectedBranch } = useBranchContext();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [searchMember, setSearchMember] = useState('');

    useEffect(() => {
        if (locker?.status === 'Available') {
            loadMembers();
        }
    }, [locker]);

    const loadMembers = async () => {
        try {
            const data = await getMembers();
            // Filter by branch if needed, but getMembers usually returns all for the tenant
            setMembers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAssign = async () => {
        if (!selectedMemberId) return toast.error('Please select a member');
        try {
            setLoading(true);
            await lockerApi.assignLocker(locker.id, { memberId: selectedMemberId });
            toast.success('Locker assigned successfully');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to assign locker');
        } finally {
            setLoading(false);
        }
    };

    const handleRelease = async () => {
        try {
            setLoading(true);
            await lockerApi.releaseLocker(locker.id);
            toast.success('Locker released successfully');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to release locker');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleMaintenance = async () => {
        try {
            setLoading(true);
            const newStatus = locker.status === 'Maintenance' ? 'Available' : 'Maintenance';
            await lockerApi.toggleMaintenance(locker.id, { status: newStatus });
            toast.success(`Locker moved to ${newStatus}`);
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this locker?')) return;
        try {
            setLoading(true);
            await lockerApi.deleteLocker(locker.id);
            toast.success('Locker deleted successfully');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to delete locker');
        } finally {
            setLoading(false);
        }
    };

    if (!locker) return null;

    const filteredMembers = members.filter(m =>
        m.name?.toLowerCase().includes(searchMember.toLowerCase()) ||
        m.memberId?.toLowerCase().includes(searchMember.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Assigned': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Maintenance': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Reserved': return 'bg-purple-50 text-purple-600 border-purple-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header / Info Section */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Locker Assets Management</p>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 mb-8">
                    <div className="w-16 h-16 bg-[#0a1b2e] flex items-center justify-center rounded-[1.5rem] shadow-xl relative">
                        <Lock size={28} className="text-white" />
                        <div className={`w-4 h-4 rounded-full absolute -top-1 -right-1 border-4 border-slate-50 ${locker.status === 'Available' ? 'bg-emerald-500' :
                                locker.status === 'Assigned' ? 'bg-blue-500' : 'bg-amber-500'
                            }`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight italic line-clamp-1">Locker #{locker.number}</h3>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusStyle(locker.status)}`}>
                                {locker.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                            <MapPin size={12} strokeWidth={3} /> {locker.area || 'Main Facility'}
                        </div>
                    </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Size</span>
                        <span className="text-xs font-black text-slate-900 uppercase">{locker.size || 'Medium'}</span>
                    </div>
                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Charging</span>
                        <span className="text-xs font-black text-slate-900 uppercase">{locker.isChargeable ? 'Premium' : 'Standard'}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 custom-scrollbar">
                <div className="space-y-8 pb-8">
                    {locker.status === 'Assigned' && locker.assignedTo ? (
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Current Assignee</h4>
                            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-[2rem] space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-500 font-black italic">
                                        {locker.assignedTo.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{locker.assignedTo.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{locker.assignedTo.memberId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold">
                                        <Smartphone size={14} className="text-blue-400" /> {locker.assignedTo.phone || 'No Phone'}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold">
                                        <Calendar size={14} className="text-blue-400" /> Since {new Date(locker.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-[2rem] flex items-start gap-4">
                                <Info size={18} className="text-amber-500 mt-0.5 shrink-0" />
                                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest leading-relaxed">
                                    Releasing this locker will make it available for other members immediately. All rental history for this session will be archived.
                                </p>
                            </div>
                        </div>
                    ) : locker.status === 'Available' ? (
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Assign to Member</h4>

                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by name or ID..."
                                    value={searchMember}
                                    onChange={(e) => setSearchMember(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-blue-500/20 focus:bg-white transition-all"
                                />
                            </div>

                            <div className="max-h-[200px] overflow-y-auto custom-scrollbar border border-slate-50 rounded-2xl p-2 space-y-1">
                                {filteredMembers.length > 0 ? filteredMembers.map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelectedMemberId(m.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedMemberId === m.id
                                                ? 'bg-blue-50 border border-blue-100 shadow-sm'
                                                : 'hover:bg-slate-50 border border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 text-left">
                                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 font-black text-[10px]">
                                                {m.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{m.name}</p>
                                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{m.memberId}</p>
                                            </div>
                                        </div>
                                        {selectedMemberId === m.id && <CheckCircle2 size={16} className="text-blue-500" />}
                                    </button>
                                )) : (
                                    <p className="text-[10px] text-slate-400 font-bold uppercase text-center py-4 italic">No members found</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                            <Settings size={48} className="text-amber-300 mb-4 animate-spin-slow" />
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Maintenance Mode</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-[200px]"> This asset is currently under repair or inspection. </p>
                        </div>
                    )}

                    {/* Meta Notes */}
                    {locker.notes && (
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem]">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Notes</span>
                            <p className="text-xs font-bold text-slate-600 tracking-tight leading-relaxed italic line-clamp-3">
                                {locker.notes}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions Footer */}
            <div className="p-8 border-t border-slate-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-3">
                {locker.status === 'Assigned' ? (
                    <button
                        onClick={handleRelease}
                        disabled={loading}
                        className="w-full py-4 bg-[#0a1b2e] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1a2b3e] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                Release Locker <Unlock size={16} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
                            </>
                        )}
                    </button>
                ) : locker.status === 'Available' ? (
                    <button
                        onClick={handleAssign}
                        disabled={loading || !selectedMemberId}
                        className="w-full py-4 bg-[#0a1b2e] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1a2b3e] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                Assign to Member <CheckCircle2 size={16} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
                            </>
                        )}
                    </button>
                ) : null}

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleToggleMaintenance}
                        className={`py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${locker.status === 'Maintenance'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                                : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
                            }`}
                    >
                        {locker.status === 'Maintenance' ? 'Finish Service' : 'Start Service'}
                    </button>
                    <button
                        onClick={onClose}
                        className="py-3 bg-white text-slate-900 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LockerDetailsDrawer;
