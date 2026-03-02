import React, { useState } from 'react';
import { Users, UserPlus, Phone, TrendingUp, CheckCircle, Search, Filter, BarChart3, Mail, MoreHorizontal } from 'lucide-react';
import RightDrawer from '../../../components/common/RightDrawer';
import StatsCard from '../../../modules/dashboard/components/StatsCard';

const LeadsPipeline = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddDrawer, setShowAddDrawer] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-8 space-y-8 animate-fadeIn">

            {/* Header Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-10 pointer-events-none"></div>
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                                <Users size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Lead Management</h1>
                                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">
                                    Track and convert your fitness prospects
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddDrawer(true)}
                            className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200 hover:scale-105 transition-all"
                        >
                            <UserPlus size={18} /> Add Lead
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatsCard title="Total Leads" value="0" icon={Users} color="primary" isEarningsLayout={true} />
                <StatsCard title="New" value="0" icon={UserPlus} color="info" isEarningsLayout={true} />
                <StatsCard title="Contacted" value="0" icon={Phone} color="warning" isEarningsLayout={true} />
                <StatsCard title="Interested" value="0" icon={TrendingUp} color="success" isEarningsLayout={true} />
                <StatsCard title="Converted" value="0" icon={CheckCircle} color="secondary" isEarningsLayout={true} />
            </div>

            {/* Lead Sources Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                        <BarChart3 size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Lead Sources</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Where your prospects are coming from</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-16 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-200 mb-4">
                        <Search size={32} />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">No leads yet</p>
                </div>
            </div>

            {/* All Leads Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                            <Users size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">All Leads</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Manage your entire lead database</p>
                        </div>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-white"
                        />
                    </div>
                </div>

                <div className="saas-table-wrapper border-0 rounded-none">
                    <table className="saas-table saas-table-responsive">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</th>
                                <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                                <th className="text-right py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td colSpan="6" className="px-8 py-24 text-center pointer-events-none" data-label="Status">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200">
                                            <Users size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 tracking-tight">No leads found</h3>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Start growing your gym by adding your first lead</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Lead Drawer */}
            <RightDrawer
                isOpen={showAddDrawer}
                onClose={() => setShowAddDrawer(false)}
                title="Add New Lead"
                subtitle="Create a new lead for follow-up"
                maxWidth="max-w-md"
                footer={
                    <div className="flex gap-3 w-full justify-end">
                        <button
                            onClick={() => setShowAddDrawer(false)}
                            className="px-6 h-11 border-2 border-slate-200 bg-white text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all font-sans"
                        >
                            Cancel
                        </button>
                        <button className="px-6 h-11 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-200 hover:scale-105 transition-all font-sans">
                            Add Lead
                        </button>
                    </div>
                }
            >
                <div className="p-8 space-y-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name *</label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Phone *</label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Source</label>
                            <div className="relative">
                                <select className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 appearance-none cursor-pointer">
                                    <option>Walk-in</option>
                                    <option>Online</option>
                                    <option>Referral</option>
                                    <option>Social Media</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <Filter size={14} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Notes</label>
                            <textarea
                                placeholder="Any additional notes..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 resize-none"
                            />
                        </div>
                    </div>
                </div>
            </RightDrawer>

        </div>
    );
};

export default LeadsPipeline;
