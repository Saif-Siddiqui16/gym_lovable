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
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-page-title">Notification Settings</h1>
                <p className="text-muted mt-1">Configure email and system notifications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email Notifications */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h2 className="text-card-title">Email Notifications</h2>
                            <p className="text-muted text-sm mt-0.5">Configure email alerts for member events</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { key: 'membershipReminders', title: 'Membership Reminders', desc: 'Send expiry reminders to members' },
                            { key: 'paymentReceipts', title: 'Payment Receipts', desc: 'Send receipts after payments' },
                            { key: 'classNotifications', title: 'Class Notifications', desc: 'Send class booking confirmations' },
                            { key: 'announcements', title: 'Announcements', desc: 'Receive gym announcements via email' }
                        ].map(({ key, title, desc }) => (
                            <div key={key} className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-slate-900">{title}</h3>
                                    <p className="text-muted text-xs mt-0.5">{desc}</p>
                                </div>
                                <Toggle active={emailSettings[key]} onToggle={() => toggleEmailSetting(key)} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h2 className="text-card-title">System Alerts</h2>
                            <p className="text-muted text-sm mt-0.5">Manage inner-app notification triggers</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { key: 'lowStockAlerts', title: 'Low Stock Alerts', desc: 'Get notified when inventory is low' },
                            { key: 'newLeadAlerts', title: 'New Lead Alerts', desc: 'Get notified about new leads' },
                            { key: 'paymentAlerts', title: 'Payment Alerts', desc: 'Get notified about overdue payments' },
                            { key: 'taskReminders', title: 'Task Reminders', desc: 'Get reminders for assigned tasks' }
                        ].map(({ key, title, desc }) => (
                            <div key={key} className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-slate-900">{title}</h3>
                                    <p className="text-muted text-xs mt-0.5">{desc}</p>
                                </div>
                                <Toggle active={systemSettings[key]} onToggle={() => toggleSystemSetting(key)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Automated Reminders */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-card-title">Reminders Engine</h2>
                        <p className="text-muted text-xs sm:text-sm mt-0.5">Manually trigger system reminders</p>
                    </div>
                </div>

                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-8">
                    Manually trigger all pending reminders (payments, birthdays, membership expiry, class/PT/benefit bookings).
                </p>

                <div className="space-y-8">
                    <div className="flex flex-wrap gap-2">
                        {reminderTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedReminderType(type)}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${selectedReminderType === type
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <button className="w-full sm:w-auto btn border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 px-6 h-12 flex items-center justify-center gap-2">
                        <Play size={18} fill="currentColor" className="text-primary" />
                        Run Reminders Now
                    </button>
                </div>
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-6">
                <button
                    className="w-full sm:w-auto btn btn-primary px-10 h-12 shadow-xl shadow-primary/20"
                    disabled={isReadOnly}
                    onClick={() => alert('Settings saved successfully!')}
                >
                    <Save size={20} />
                    Save All Changes
                </button>
            </div>
        </div>
    );
};

export default Notifications;

