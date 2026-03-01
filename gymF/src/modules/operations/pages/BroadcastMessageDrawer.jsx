import React, { useState } from 'react';
import { ChevronDown, Info, Send, XCircle } from 'lucide-react';
import RightDrawer from '../../../components/common/RightDrawer';

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
            onSuccess?.();
            onClose();
        }, 1500);
    };

    return (
        <RightDrawer
            isOpen={isOpen}
            onClose={onClose}
            title="Broadcast Message"
            subtitle="Send a message to multiple members at once"
            maxWidth="max-w-2xl"
            footer={
                <div className="flex gap-3 w-full justify-end px-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 h-11 border-2 border-slate-100 bg-white text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="broadcast-form"
                        disabled={isSubmitting}
                        className="px-8 h-11 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Send size={16} />
                                <span>Send Broadcast</span>
                            </>
                        )}
                    </button>
                </div>
            }
        >
            <div className="px-8 py-8 h-full custom-scrollbar overflow-y-auto">
                <form id="broadcast-form" onSubmit={handleSubmit} className="space-y-8 pb-10">

                    {/* Channel Selector */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Channel</label>
                        <div className="relative group">
                            <select
                                className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-black text-slate-900 transition-all outline-none bg-slate-50/50 appearance-none cursor-pointer"
                                value={formData.channel}
                                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                            >
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="SMS">SMS</option>
                                <option value="Email">Email</option>
                                <option value="Push Notification">Push Notification</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                        </div>
                    </div>

                    {/* Template Selection */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Use Template (Optional)</label>
                        <div className="relative group">
                            <select
                                className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-black text-slate-900 transition-all outline-none bg-slate-50/50 appearance-none cursor-pointer"
                                value={formData.template}
                                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                            >
                                <option value="">Select a saved template...</option>
                                <option value="Welcome">Welcome New Member</option>
                                <option value="Renewal">Membership Renewal Reminder</option>
                                <option value="Offer">Discount Offer Blast</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 ml-1">Manage templates in Settings → Templates</p>
                    </div>

                    {/* Audience Selection */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Audience</label>
                        <div className="relative group">
                            <select
                                className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-black text-slate-900 transition-all outline-none bg-slate-50/50 appearance-none cursor-pointer"
                                value={formData.audience}
                                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            >
                                <option value="All Members">All Members</option>
                                <option value="Active Members">Active Members</option>
                                <option value="Expired Members">Expired Members</option>
                                <option value="Staff Only">Staff Only</option>
                                <option value="Trainers Only">Trainers Only</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Message *</label>
                        <textarea
                            required
                            rows={6}
                            placeholder="Enter your message..."
                            className="w-full p-6 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-semibold text-slate-700 transition-all outline-none bg-slate-50/50 resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 ml-1">Use variables like {'{{member_name}}'}, {'{{member_code}}'}</p>
                    </div>

                    {/* Information Notice */}
                    <div className="p-6 bg-amber-50/40 border-2 border-amber-100/50 rounded-2xl space-y-3 relative overflow-hidden group hover:bg-amber-50/60 transition-all duration-300 shadow-sm shadow-amber-50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                                <Info size={16} />
                            </div>
                            <h4 className="text-[11px] font-black text-amber-700 uppercase tracking-widest">Configuration Note</h4>
                        </div>
                        <p className="text-[11px] font-bold text-amber-600/80 leading-relaxed uppercase tracking-tight">
                            Note: Email sending requires a Resend API key configured in Settings → Integrations. SMS and WhatsApp bulk sending require their respective API keys. Without API keys, messages will be logged but not delivered externally.
                        </p>
                    </div>

                </form>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </RightDrawer>
    );
};

export default BroadcastMessageDrawer;
