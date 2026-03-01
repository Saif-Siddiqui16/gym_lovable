import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ExternalLink, RefreshCw, Save } from 'lucide-react';
import { ROLES } from '../../../config/roles';

const WebsiteSettings = () => {
    const context = useOutletContext();
    const role = context?.role;
    const isReadOnly = role === ROLES.MANAGER;

    const [activeTab, setActiveTab] = useState('General');
    const [generalSettings, setGeneralSettings] = useState({
        gymName: 'Incline Fitness',
        tagline: 'Elevate Your Potential',
        email: 'info@inclinefitness.com',
        phone: '+91 98765 43210',
        address: '123 Fitness Street, Mumbai, India'
    });

    const tabs = ['General', 'Hero', 'Features', 'Pricing', 'Reviews', 'Social', 'Theme'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGeneralSettings(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-6 space-y-6 bg-[#F5F7FA] min-h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[26px] font-semibold text-[#111827] tracking-tight">Website CMS</h1>
                    <p className="text-[#6B7280] text-[15px] font-normal mt-1">Manage your public website content and theme</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#374151] font-medium hover:bg-white hover:shadow-sm transition-all text-sm outline-none">
                        <ExternalLink size={18} />
                        Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#374151] font-medium hover:bg-white hover:shadow-sm transition-all text-sm outline-none">
                        <RefreshCw size={18} />
                        Reset
                    </button>
                    <button
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50 text-sm outline-none"
                        disabled={isReadOnly}
                    >
                        <Save size={18} />
                        Save
                    </button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-[#E2E8F0]/50 p-1.5 rounded-xl inline-flex w-full overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                            ? 'bg-white text-[#111827] shadow-sm'
                            : 'text-[#64748B] hover:text-[#111827]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            {activeTab === 'General' && (
                <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                    <div className="mb-8 p-2 bg-blue-50/50 rounded-xl border border-blue-100/50 inline-block px-4">
                        <h2 className="text-[19px] font-medium text-[#111827]">General Settings</h2>
                        <p className="text-[#6B7280] text-sm font-normal">Basic information about your gym</p>
                    </div>

                    <div className="space-y-8 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#374151]">Gym Name</label>
                                <input
                                    type="text"
                                    name="gymName"
                                    value={generalSettings.gymName}
                                    onChange={handleInputChange}
                                    disabled={isReadOnly}
                                    className="w-full p-3.5 bg-[#f8fafc] border border-[#E5E7EB] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-[#374151]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#374151]">Tagline</label>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={generalSettings.tagline}
                                    onChange={handleInputChange}
                                    disabled={isReadOnly}
                                    className="w-full p-3.5 bg-[#f8fafc] border border-[#E5E7EB] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-[#374151]"
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#F1F5F9]">
                            <h3 className="text-[18px] font-medium text-[#111827] mb-6">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#374151]">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={generalSettings.email}
                                        onChange={handleInputChange}
                                        disabled={isReadOnly}
                                        className="w-full p-3.5 bg-[#f8fafc] border border-[#E5E7EB] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-[#374151]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#374151]">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={generalSettings.phone}
                                        onChange={handleInputChange}
                                        disabled={isReadOnly}
                                        className="w-full p-3.5 bg-[#f8fafc] border border-[#E5E7EB] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-[#374151]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#374151]">Address</label>
                            <textarea
                                name="address"
                                value={generalSettings.address}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                rows={4}
                                className="w-full p-3.5 bg-[#f8fafc] border border-[#E5E7EB] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-[#374151] resize-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'General' && (
                <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-12 text-center shadow-sm">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Save size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-[#111827]">{activeTab} Section Content</h3>
                        <p className="text-[#6B7280]">This section is under development. You will be able to manage your {activeTab.toLowerCase()} content here very soon.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebsiteSettings;

