import React, { useState } from 'react';
import { Building2, UploadCloud, Globe, DollarSign, Calendar, Save } from 'lucide-react';

const OrganizationSettings = ({ role }) => {
    const isManager = role === 'MANAGER';
    const [formData, setFormData] = useState({
        name: 'Your Gym Name',
        timezone: 'Asia/Kolkata',
        currency: 'INR',
        fiscalYearStart: 'April'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
            {/* Premium Header */}
            <div className="relative font-black">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl blur-3xl opacity-10 animate-pulse"></div>
                <div className="relative bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl shadow-violet-500/10 border border-white/50 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white shadow-xl shadow-violet-500/40">
                                <Building2 size={28} strokeWidth={3} />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight leading-none mb-1">
                                    Organization Settings
                                </h1>
                                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] leading-none">
                                    Global Brand Identity
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-2xl text-sm shadow-xl shadow-violet-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                            <Save size={18} strokeWidth={3} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 font-black">
                {/* Gym Logo Section */}
                <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50/50 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-violet-100/50"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-violet-600 transition-colors">
                                <Building2 size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-lg text-slate-800 tracking-tight leading-none mb-1">Gym Logo</h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Brand Mark</p>
                            </div>
                        </div>

                        <div className="border-2 border-dashed border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-center bg-slate-50/30 group/upload hover:border-violet-200 transition-all cursor-pointer">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center mb-6">
                                <UploadCloud className="text-slate-300 group-hover/upload:text-violet-500 transition-colors" size={40} strokeWidth={3} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-700 mb-1">Upload New Logo</p>
                                <p className="text-xs text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Drag & drop or <span className="text-violet-600">click to browse</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Organization Details Section */}
                <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-50/50 rounded-tl-full -mr-16 -mb-16 transition-all group-hover:bg-purple-100/50"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                                <Globe size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-lg text-slate-800 tracking-tight leading-none mb-1">Organization Profile</h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Global Master Data</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            {/* Organization Name */}
                            <div className="space-y-3">
                                <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 block leading-none">Organization Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Gym Name"
                                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm text-slate-700 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 transition-all outline-none pr-12"
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                        <Building2 size={18} strokeWidth={3} />
                                    </div>
                                </div>
                            </div>

                            {/* Timezone */}
                            <div className="space-y-3">
                                <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 block leading-none">Timezone</label>
                                <div className="relative group/select">
                                    <select
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm text-slate-700 appearance-none focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all cursor-pointer pr-12"
                                    >
                                        <option>Asia/Kolkata</option>
                                        <option>UTC (GMT)</option>
                                        <option>PST (Los Angeles)</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within/select:text-violet-500 transition-colors">
                                        <Globe size={18} strokeWidth={3} />
                                    </div>
                                </div>
                            </div>

                            {/* Currency */}
                            <div className="space-y-3">
                                <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 block leading-none">Currency</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        placeholder="INR"
                                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm text-slate-700 focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 transition-all outline-none pr-12"
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                        <DollarSign size={18} strokeWidth={3} />
                                    </div>
                                </div>
                            </div>

                            {/* Fiscal Year Start */}
                            <div className="space-y-3">
                                <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 block leading-none">Fiscal Year Start</label>
                                <div className="relative group/select">
                                    <select
                                        name="fiscalYearStart"
                                        value={formData.fiscalYearStart}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm text-slate-700 appearance-none focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all cursor-pointer pr-12"
                                    >
                                        <option>April</option>
                                        <option>January</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within/select:text-violet-500 transition-colors">
                                        <Calendar size={18} strokeWidth={3} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationSettings;
