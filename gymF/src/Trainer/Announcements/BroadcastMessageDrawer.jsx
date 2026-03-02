import React, { useState } from 'react';
import { ChevronDown, Info, Send, MessageSquareText, Users, LayoutTemplate, Smartphone } from 'lucide-react';
import RightDrawer from '../../components/common/RightDrawer';

const BroadcastMessageDrawer = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        channel: 'WhatsApp',
        template: '',
        audience: 'All Members',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating API call for demo behavior
        setTimeout(() => {
            setIsSubmitting(false);
            console.log('Broadcast Sent:', formData);
            onSuccess?.(formData);
            onClose();
            setFormData({
                channel: 'WhatsApp',
                template: '',
                audience: 'All Members',
                message: ''
            });
        }, 1500);
    };

    const footer = (
        <React.Fragment>
            <button
                type="button"
                onClick={onClose}
                className="drawer-btn drawer-btn-secondary flex-1"
            >
                Cancel
            </button>
            <button
                type="submit"
                form="broadcast-form"
                disabled={isSubmitting}
                className="drawer-btn drawer-btn-primary flex-[2]"
            >
                {isSubmitting ? 'Sending...' : 'Send Broadcast'}
            </button>
        </React.Fragment>
    );

    return (
        <RightDrawer
            isOpen={isOpen}
            onClose={onClose}
            title="Broadcast Message"
            subtitle="Reach your audience instantly"
            maxWidth="max-w-md"
            footer={footer}
        >
            <form id="broadcast-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="drawer-form-group">
                    <label className="drawer-label">
                        Broadcast Channel
                    </label>
                    <select
                        className="drawer-select"
                        value={formData.channel}
                        onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    >
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="SMS">SMS</option>
                        <option value="Email">Email</option>
                        <option value="Push Notification">Push Notification</option>
                    </select>
                </div>

                <div className="drawer-form-group">
                    <label className="drawer-label">
                        Message Template (Optional)
                    </label>
                    <select
                        className="drawer-select"
                        value={formData.template}
                        onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                    >
                        <option value="">Select a saved template...</option>
                        <option value="welcome">Welcome Package</option>
                        <option value="renewal">Renewal Reminder</option>
                        <option value="offer">Special Offer</option>
                    </select>
                </div>

                <div className="drawer-form-group">
                    <label className="drawer-label">
                        Target Audience
                    </label>
                    <select
                        className="drawer-select"
                        value={formData.audience}
                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    >
                        <option value="All Members">All Members</option>
                        <option value="Active Members">Active Members</option>
                        <option value="Expired Members">Expired Members</option>
                    </select>
                </div>

                <div className="drawer-form-group">
                    <label className="drawer-label">
                        Message Body *
                    </label>
                    <textarea
                        required
                        placeholder="Type your message here..."
                        className="drawer-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Use variables like <span className="text-indigo-600">{"{{member_name}}"}</span>, <span className="text-indigo-600">{"{{member_code}}"}</span>
                    </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                    <Info className="text-amber-500 shrink-0" size={18} />
                    <p className="text-[10px] text-amber-700 font-bold leading-relaxed uppercase opacity-80">
                        Email requires a Resend API key. SMS and WhatsApp require respective configurations in Settings.
                    </p>
                </div>
            </form>
        </RightDrawer>
    );
};

export default BroadcastMessageDrawer;
