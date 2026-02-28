import React, { useState } from 'react';
import { Users, UserPlus, Phone, TrendingUp, CheckCircle, Search, Filter } from 'lucide-react';
import RightDrawer from '../../../components/common/RightDrawer';

import { Calendar, ArrowRight, MoreVertical, Check, XCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useBranchContext } from '../../../context/BranchContext';
import { crmApi } from '../../../api/crm/crmApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const LeadsPipeline = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterSource, setFilterSource] = useState('All');

    const emptyForm = { name: '', phone: '', email: '', source: 'Walk-in', notes: '' };
    const [form, setForm] = useState(emptyForm);

    const handleFormChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const openDrawer = () => { setForm(emptyForm); setShowDrawer(true); };
    const closeDrawer = () => { setForm(emptyForm); setShowDrawer(false); };

    const LEAD_STATUSES = [
        { id: 'New', label: 'New', color: 'blue' },
        { id: 'Contacted', label: 'Contacted', color: 'amber' },
        { id: 'Interested', label: 'Interested', color: 'emerald' },
        { id: 'Converted', label: 'Converted', color: 'fuchsia' },
        { id: 'Lost', label: 'Lost', color: 'rose' }
    ];
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const { selectedBranch } = useBranchContext();
    const loggedInUser = user || { role: '', id: '', branchId: '' };

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedBranch && selectedBranch !== 'all') {
                params.branchId = selectedBranch;
            }
            const data = await crmApi.getLeads(params);
            setLeads(data || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
            toast.error('Failed to load leads');
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchLeads(); }, [selectedBranch]);

    const handleAction = async (leadId, type) => {
        let newStatus = ''; let message = '';
        if (type === 'contact') { newStatus = 'Contacted'; message = 'Lead marked as contacted.'; }
        else if (type === 'interest') { newStatus = 'Interested'; message = 'Lead marked as interested.'; }
        else if (type === 'convert') { newStatus = 'Converted'; message = 'Lead converted to member successfully!'; }
        else if (type === 'lost') { newStatus = 'Lost'; message = 'Lead marked as lost.'; }

        if (newStatus) {
            try {
                await crmApi.updateLeadStatus(leadId, newStatus);
                setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
                toast.success(message);
            } catch (error) {
                console.error('Update failed:', error);
                toast.error('Failed to update status');
            }
        }
    };

    const handleCreateLead = async () => {
        if (!form.name || !form.phone) {
            toast.error('Name and Phone are required');
            return;
        }
        try {
            const leadData = { ...form };
            if (selectedBranch && selectedBranch !== 'all') {
                leadData.branchId = selectedBranch;
            }
            const newLead = await crmApi.createLead(leadData);
            setLeads([newLead, ...leads]);
            toast.success('Lead created successfully');
            closeDrawer();
        } catch (error) {
            console.error('Create lead failed:', error);
            toast.error(error.message || 'Failed to create lead');
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone?.includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
        const matchesSource = filterSource === 'All' || lead.source === filterSource;
        return matchesSearch && matchesStatus && matchesSource;
    });

    const kpiCards = [
        { label: 'Total Leads', value: leads.length, icon: Users, from: 'from-violet-500', to: 'to-purple-600' },
        { label: 'New', value: leads.filter(l => l.status === 'New').length, icon: UserPlus, from: 'from-blue-500', to: 'to-blue-600' },
        { label: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length, icon: Phone, from: 'from-amber-500', to: 'to-amber-600' },
        { label: 'Interested', value: leads.filter(l => l.status === 'Interested').length, icon: TrendingUp, from: 'from-emerald-500', to: 'to-emerald-600' },
        { label: 'Converted', value: leads.filter(l => l.status === 'Converted').length, icon: CheckCircle, from: 'from-fuchsia-500', to: 'to-fuchsia-600' },
    ];

    const tableColumns = ['Name', 'Contact', 'Status', 'Source', 'Created', 'Actions'];

    // ── Drawer form fields ──
    const drawerFooter = (
        <div className="flex gap-3">
            <button
                onClick={closeDrawer}
                className="flex-1 h-10 rounded-lg border-2 border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all"
            >
                Cancel
            </button>
            <button
                onClick={handleCreateLead}
                className="flex-1 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:shadow-md hover:shadow-blue-400/30 transition-all"
            >
                Add Lead
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-6 space-y-6">

            {/* ── Header ── */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-2xl blur-2xl opacity-10 animate-pulse pointer-events-none"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                                <Users size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                    Lead Management
                                </h1>
                                <p className="text-slate-600 text-sm mt-1">Track and manage all your leads in one place</p>
                            </div>
                        </div>
                        <button
                            onClick={openDrawer}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-blue-500/30 self-start sm:self-auto relative z-10"
                        >
                            <UserPlus size={18} />
                            Add Lead
                        </button>
                    </div>
                </div>
            </div>

            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpiCards.map((kpi, i) => (
                    <div key={i} className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-5 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-widest">{kpi.label}</p>
                                <h3 className="text-3xl font-black text-slate-900">{kpi.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.from} ${kpi.to} flex items-center justify-center text-white shadow-md`}>
                                <kpi.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Lead Sources ── */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="text-violet-600" size={18} />
                        Lead Sources
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">Where your leads are coming from</p>
                </div>
                {leads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                            <Users size={24} />
                        </div>
                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">No leads yet</p>
                    </div>
                ) : (
                    <div className="flex gap-4 items-end h-32 px-4 border-b border-l border-slate-200 pb-2 pl-2 mt-8">
                        {['Walk-in', 'Online', 'Referral', 'Social Media', 'Advertisement', 'Other'].map(src => {
                            const count = leads.filter(l => l.source === src).length;
                            const heightPercentage = leads.length ? (count / leads.length) * 100 : 0;
                            return (
                                <div key={src} className="flex flex-1 flex-col items-center gap-2 h-full justify-end group cursor-pointer relative">
                                    <div
                                        style={{ height: `${heightPercentage}%`, minHeight: count > 0 ? '10%' : '0%' }}
                                        className="w-full max-w-[40px] bg-gradient-to-t from-violet-600 to-purple-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all relative"
                                    >
                                        {count > 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">{count}</span>}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 -rotate-45 block transform origin-top-left -translate-y-2 translate-x-3">{src}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── All Leads Table ── */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Users className="text-violet-600" size={18} />
                            All Leads
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold">0 leads total</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search leads..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-9 h-10 w-full rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm transition-all bg-white outline-none"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(v => !v)}
                                className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${showFilter
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600'
                                    }`}
                            >
                                <Filter size={14} />
                                Filter
                            </button>

                            {/* Filter Dropdown */}
                            {showFilter && (
                                <div className="absolute right-0 top-12 z-30 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['All', 'New', 'Contacted', 'Interested', 'Converted'].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setFilterStatus(s)}
                                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${filterStatus === s
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                        }`}
                                                >{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Source</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['All', 'Walk-in', 'Online', 'Referral', 'Social Media'].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setFilterSource(s)}
                                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${filterSource === s
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                        }`}
                                                >{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setFilterStatus('All'); setFilterSource('All'); setShowFilter(false); }}
                                        className="w-full h-8 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                {tableColumns.map(col => (
                                    <th key={col} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={tableColumns.length} className="px-6 py-16 text-center text-slate-500">Loading leads...</td></tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={tableColumns.length} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                                                <Users size={28} />
                                            </div>
                                            <p className="text-slate-500 font-black text-sm italic">No leads found</p>
                                            <p className="text-slate-400 text-xs font-semibold">Add your first lead to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map(lead => (
                                    <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-900">{lead.name}</div>
                                            <div className="text-xs text-slate-500">{lead.email || 'No email'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {lead.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                lead.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                                                    lead.status === 'Interested' ? 'bg-emerald-100 text-emerald-700' :
                                                        lead.status === 'Converted' ? 'bg-fuchsia-100 text-fuchsia-700' :
                                                            'bg-rose-100 text-rose-700'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                            {lead.source || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {lead.status !== 'Converted' && lead.status !== 'Lost' && (
                                                    <>
                                                        {lead.status === 'New' && (
                                                            <button onClick={() => handleAction(lead.id, 'contact')} className="px-2.5 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:shadow-sm border border-amber-200/50 rounded-lg text-xs font-bold transition-all" title="Mark Contacted">
                                                                Contact
                                                            </button>
                                                        )}
                                                        {(lead.status === 'New' || lead.status === 'Contacted') && (
                                                            <button onClick={() => handleAction(lead.id, 'interest')} className="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:shadow-sm border border-emerald-200/50 rounded-lg text-xs font-bold transition-all" title="Mark Interested">
                                                                Interest
                                                            </button>
                                                        )}
                                                        <button onClick={() => handleAction(lead.id, 'convert')} className="px-2.5 py-1.5 bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100 hover:shadow-sm border border-fuchsia-200/50 rounded-lg text-xs font-bold transition-all flex items-center gap-1" title="Convert to Member">
                                                            <Check size={14} />
                                                            Convert
                                                        </button>
                                                        <div className="w-px h-4 bg-slate-200 mx-1"></div>
                                                        <button onClick={() => handleAction(lead.id, 'lost')} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Mark Lost">
                                                            <XCircle size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Add Lead Right Drawer ── */}
            <RightDrawer
                isOpen={showDrawer}
                onClose={closeDrawer}
                title="Add New Lead"
                subtitle="Create a new lead for follow-up"
                maxWidth="max-w-md"
                footer={drawerFooter}
            >
                <div className="p-6 space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                            Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            placeholder="Enter full name"
                            className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm text-slate-800 bg-white transition-all outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                            Phone <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleFormChange}
                            placeholder="Enter phone number"
                            className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm text-slate-800 bg-white transition-all outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleFormChange}
                            placeholder="Enter email address"
                            className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm text-slate-800 bg-white transition-all outline-none"
                        />
                    </div>

                    {/* Source */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Source</label>
                        <select
                            name="source"
                            value={form.source}
                            onChange={handleFormChange}
                            className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm text-slate-800 bg-white transition-all outline-none"
                        >
                            {['Walk-in', 'Online', 'Referral', 'Social Media', 'Advertisement', 'Other'].map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Notes</label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleFormChange}
                            rows={4}
                            placeholder="Additional notes..."
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-sm text-slate-800 bg-white transition-all outline-none resize-none"
                        />
                    </div>

                </div>
            </RightDrawer>

        </div>
    );
};

export default LeadsPipeline;
