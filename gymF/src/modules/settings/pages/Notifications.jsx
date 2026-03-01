import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Bell, Clock, Play, Save } from 'lucide-react';
import { ROLES } from '../../../config/roles';

const Notifications = () => {
    const context = useOutletContext();
    const role = context?.role;
    const isReadOnly = role === ROLES.MANAGER;

    const [emailSettings, setEmailSettings] = useState({
        membershipReminders: true,
        paymentReceipts: true,
        classNotifications: true,
        announcements: true
    });

    const [systemSettings, setSystemSettings] = useState({
        lowStockAlerts: true,
        newLeadAlerts: true,
        paymentAlerts: true,
        taskReminders: true
    });

    const [selectedReminderType, setSelectedReminderType] = useState('Payment Due');

    const toggleEmailSetting = (key) => {
        if (isReadOnly) return;
        setEmailSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSystemSetting = (key) => {
        if (isReadOnly) return;
        setSystemSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const reminderTypes = [
        'Payment Due', 'Birthdays', 'Membership Expiry',
        'Class Reminders', 'PT Sessions', 'Benefit Bookings'
    ];

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
                <h1 className="text-[26px] font-semibold text-[#111827] tracking-tight">Notification Settings</h1>
                <p className="text-[#6B7280] text-[15px] font-normal mt-1">Configure email and system notifications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email Notifications */}
                <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Mail size={22} />
                        </div>
                        <div>
                            <h2 className="text-[19px] font-medium text-[#111827]">Email Notifications</h2>
                            <p className="text-[#6B7280] text-sm font-normal">Configure email notifications for various events</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { key: 'membershipReminders', title: 'Membership Reminders', desc: 'Send expiry reminders to members' },
                            { key: 'paymentReceipts', title: 'Payment Receipts', desc: 'Send receipts after payments' },
                            { key: 'classNotifications', title: 'Class Notifications', desc: 'Send class booking confirmations' },
                            { key: 'announcements', title: 'Announcements', desc: 'Receive gym announcements via email' }
                        ].map(({ key, title, desc }) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-[#111827] text-base">{title}</h3>
                                    <p className="text-[#6B7280] text-sm font-normal">{desc}</p>
                                </div>
                                <Toggle active={emailSettings[key]} onToggle={() => toggleEmailSetting(key)} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Bell size={22} />
                        </div>
                        <div>
                            <h2 className="text-[19px] font-medium text-[#111827]">System Alerts</h2>
                            <p className="text-[#6B7280] text-sm font-normal">Manage system notification preferences</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { key: 'lowStockAlerts', title: 'Low Stock Alerts', desc: 'Get notified when inventory is low' },
                            { key: 'newLeadAlerts', title: 'New Lead Alerts', desc: 'Get notified about new leads' },
                            { key: 'paymentAlerts', title: 'Payment Alerts', desc: 'Get notified about overdue payments' },
                            { key: 'taskReminders', title: 'Task Reminders', desc: 'Get reminders for assigned tasks' }
                        ].map(({ key, title, desc }) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-[#111827] text-base">{title}</h3>
                                    <p className="text-[#6B7280] text-sm font-normal">{desc}</p>
                                </div>
                                <Toggle active={systemSettings[key]} onToggle={() => toggleSystemSetting(key)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Automated Reminders */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock size={22} />
                    </div>
                    <h2 className="text-[19px] font-medium text-[#111827]">Automated Reminders</h2>
                </div>

                <p className="text-[#6B7280] text-sm font-normal leading-relaxed max-w-4xl mb-8">
                    Manually trigger all pending reminders (payments, birthdays, membership expiry, class/PT/benefit bookings). For automated daily execution, set up an external cron service to call the reminders endpoint.
                </p>

                <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                        {reminderTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedReminderType(type)}
                                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${selectedReminderType === type
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                    : 'bg-white border-[#E5E7EB] text-[#374151] hover:border-blue-400'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#E5E7EB] text-[#374151] font-medium hover:bg-slate-50 transition-all active:scale-95 text-sm">
                        <Play size={18} />
                        Run Reminders Now
                    </button>
                </div>
            </div>

            {/* Footer Save Button */}
            <div className="flex justify-end pt-4">
                <button
                    className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50 text-sm"
                    disabled={isReadOnly}
                    onClick={() => alert('Settings saved successfully!')}
                >
                    <Save size={18} />
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default Notifications;

