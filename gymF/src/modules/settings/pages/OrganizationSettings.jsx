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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-page-title">Organization Settings</h1>
                    <p className="text-muted mt-1">Manage your brand identity and global localization</p>
                </div>
                <button className="btn btn-primary px-10 h-12 shadow-xl shadow-primary/20">
                    <Save size={20} />
                    Save Brand Identity
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Gym Logo Section */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col items-center">
                    <div className="w-full mb-6">
                        <h3 className="text-card-title">Brand Logo</h3>
                        <p className="text-muted text-xs mt-0.5">Appears on public website and receipts</p>
                    </div>

                    <div className="w-full aspect-square border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud className="text-slate-300 group-hover:text-primary transition-colors" size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">Upload Logo</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">JPG, PNG up to 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Organization Details Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <div className="mb-8">
                        <h3 className="text-card-title">Organization Profile</h3>
                        <p className="text-muted text-sm mt-0.5">Core business details and fiscal localization</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                        {/* Organization Name */}
                        <div className="space-y-3">
                            <label className="form-label">Legal Organization Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium"
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                    <Building2 size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Timezone */}
                        <div className="space-y-3">
                            <label className="form-label">Default Timezone</label>
                            <div className="relative">
                                <select
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 appearance-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all cursor-pointer font-medium"
                                >
                                    <option>Asia/Kolkata</option>
                                    <option>UTC (GMT)</option>
                                    <option>PST (Los Angeles)</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none h-4">
                                    <Globe size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Currency */}
                        <div className="space-y-3">
                            <label className="form-label">Base Currency</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium"
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                    <DollarSign size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Fiscal Year Start */}
                        <div className="space-y-3">
                            <label className="form-label">Fiscal Year Start</label>
                            <div className="relative">
                                <select
                                    name="fiscalYearStart"
                                    value={formData.fiscalYearStart}
                                    onChange={handleChange}
                                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 appearance-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all cursor-pointer font-medium"
                                >
                                    <option>April</option>
                                    <option>January</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none h-4">
                                    <Calendar size={18} />
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
