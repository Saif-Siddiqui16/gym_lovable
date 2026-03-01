import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, Save } from 'lucide-react';
import { ROLES } from '../../../config/roles';

const SecuritySettings = () => {
    const context = useOutletContext();
    const role = context?.role;
    const isReadOnly = role === ROLES.MANAGER;

    const [securityConfig, setSecurityConfig] = useState({
        twoFactorAuth: false,
        sessionTimeout: true,
        sessionDuration: '8',
        loginAlerts: true
    });

    const toggleSetting = (key) => {
        if (isReadOnly) return;
        setSecurityConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleInputChange = (key, value) => {
        if (isReadOnly) return;
        setSecurityConfig(prev => ({ ...prev, [key]: value }));
    };

    const Toggle = ({ active, onToggle }) => (
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${active ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    );

    return (
        <div className="p-6 space-y-6 bg-[#F5F7FA] min-h-full">
            {/* Header */}
            <div>
                <h1 className="text-[26px] font-semibold text-[#111827] tracking-tight">Security Settings</h1>
                <p className="text-[#6B7280] text-[15px] font-normal mt-1">Configure security and access controls</p>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Shield size={22} />
                    </div>
                    <div>
                        <h2 className="text-[19px] font-medium text-[#111827]">Security</h2>
                        <p className="text-[#6B7280] text-sm font-normal">Manage global security policies and session settings</p>
                    </div>
                </div>

                <div className="space-y-8 mt-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-[#111827] text-base">Two-Factor Authentication</h3>
                            <p className="text-[#6B7280] text-sm font-normal">Require 2FA for all admin users</p>
                        </div>
                        <Toggle
                            active={securityConfig.twoFactorAuth}
                            onToggle={() => toggleSetting('twoFactorAuth')}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-[#111827] text-base">Session Timeout</h3>
                            <p className="text-[#6B7280] text-sm font-normal">Auto logout after inactivity</p>
                        </div>
                        <Toggle
                            active={securityConfig.sessionTimeout}
                            onToggle={() => toggleSetting('sessionTimeout')}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-medium text-[#111827] text-base block">Session Duration (hours)</label>
                        <input
                            type="text"
                            value={securityConfig.sessionDuration}
                            onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
                            disabled={isReadOnly}
                            className="w-full sm:w-[350px] p-4 bg-[#f8fafc] border border-[#E5E7EB] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-[#374151] font-medium"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-[#111827] text-base">Login Alerts</h3>
                            <p className="text-[#6B7280] text-sm font-normal">Notify on new device logins</p>
                        </div>
                        <Toggle
                            active={securityConfig.loginAlerts}
                            onToggle={() => toggleSetting('loginAlerts')}
                        />
                    </div>
                </div>
            </div>

            {/* Footer Save Button */}
            <div className="flex justify-end pt-4">
                <button
                    className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50 text-sm"
                    disabled={isReadOnly}
                    onClick={() => alert('Security settings saved successfully!')}
                >
                    <Save size={18} />
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default SecuritySettings;
