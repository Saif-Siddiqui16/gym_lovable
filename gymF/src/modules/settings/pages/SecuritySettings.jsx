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
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-page-title">Security Settings</h1>
                <p className="text-muted mt-1">Configure security and access controls</p>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h2 className="text-card-title">Access Policy</h2>
                        <p className="text-muted text-sm mt-0.5">Manage global security and session rules</p>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
                            <p className="text-muted text-sm mt-0.5">Require 2FA for all admin users</p>
                        </div>
                        <Toggle
                            active={securityConfig.twoFactorAuth}
                            onToggle={() => toggleSetting('twoFactorAuth')}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-medium text-slate-900">Session Timeout</h3>
                            <p className="text-muted text-sm mt-0.5">Auto logout after inactivity</p>
                        </div>
                        <Toggle
                            active={securityConfig.sessionTimeout}
                            onToggle={() => toggleSetting('sessionTimeout')}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="form-label">Session Duration (hours)</label>
                        <input
                            type="text"
                            value={securityConfig.sessionDuration}
                            onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
                            disabled={isReadOnly}
                            className="w-full sm:w-96 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-medium text-slate-900">Login Alerts</h3>
                            <p className="text-muted text-sm mt-0.5">Notify on new device logins</p>
                        </div>
                        <Toggle
                            active={securityConfig.loginAlerts}
                            onToggle={() => toggleSetting('loginAlerts')}
                        />
                    </div>
                </div>
            </div>

            {/* Footer Save Button */}
            <div className="flex justify-end pt-6">
                <button
                    className="btn btn-primary px-10 h-12 shadow-xl shadow-primary/20"
                    disabled={isReadOnly}
                    onClick={() => alert('Security settings saved successfully!')}
                >
                    <Save size={20} />
                    Save Security Policy
                </button>
            </div>
        </div>
    );
};

export default SecuritySettings;
