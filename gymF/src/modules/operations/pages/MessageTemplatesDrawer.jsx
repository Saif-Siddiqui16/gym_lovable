import React, { useState } from 'react';
import { MessageCircle, Mail, Smartphone, Copy, Check, Search } from 'lucide-react';
import RightDrawer from '../../../components/common/RightDrawer';
import toast from 'react-hot-toast';

const MessageTemplatesDrawer = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('WhatsApp');
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const templates = {
        WhatsApp: [
            {
                id: 1,
                title: 'New Member Welcome',
                tag: 'Welcome',
                body: '🎉 Welcome to Incline Fitness, {{name}}!\n\nWe\'re thrilled to have you as part of our fitness family. Our team is here to support you in every step of your fitness journey.\n\nSee you at the gym soon! 💪'
            },
            {
                id: 2,
                title: 'Membership Expiry Reminder',
                tag: 'Reminder',
                body: '⏰ Reminder: Hi {{name}}!\n\nYour Incline Fitness membership is expiring on {{end_date}}. Don\'t let your progress stop! Renew today and continue your journey with us.\n\nClick here to renew: [link]'
            },
            {
                id: 3,
                title: 'Special Offer',
                tag: 'Promotion',
                body: '🔥 SPECIAL OFFER at Incline Fitness!\n\nHi {{name}}! Get 20% OFF on all Personal Training packages if you book by this weekend. Don\'t miss out on this chance to accelerate your results!'
            },
            {
                id: 4,
                title: 'Referral Program',
                tag: 'Promotion',
                body: '🎁 REFER & EARN!\n\nHi {{name}}! Invite your friends to join Incline Fitness. For every friend who signs up, you get 1 MONTH FREE on your membership!'
            },
            {
                id: 5,
                title: 'Missed Workout Follow-up',
                tag: 'Followup',
                body: '👋 Hey {{name}}!\n\nWe noticed you haven\'t visited the gym in a while. Everything okay? We miss seeing you around. Let us know if we can help you get back on track!'
            },
            {
                id: 6,
                title: 'Lead Follow-up',
                tag: 'Followup',
                body: 'Hi {{name}}! 👋\n\nThanks for your interest in Incline Fitness! We\'d love to invite you for a FREE trial session. When can we expect you?'
            },
            {
                id: 7,
                title: 'Birthday Wishes',
                tag: 'General',
                body: '🎂 Happy Birthday, {{name}}! 🎉\n\nWishing you a fantastic year ahead filled with health, happiness, and gains! As a special gift, enjoy a free protein shake on us today.'
            },
            {
                id: 8,
                title: 'New Class Announcement',
                tag: 'General',
                body: '🆕 NEW CLASS ALERT!\n\nHi {{name}}! We\'ve just added High-Intensity Pilates to our schedule starting next Monday. Book your spot now in the app!'
            },
        ],
        SMS: [
            { id: 9, title: 'Payment Confirmation', tag: 'Transaction', body: 'Hi {{name}}, payment of ₹{{amount}} received successfully. Your membership is now active until {{end_date}}. Thanks for choosing Incline!' },
            { id: 10, title: 'OTP Verification', tag: 'Security', body: '{{otp}} is your verification code for Incline Fitness app. Valid for 5 minutes. Do not share this with anyone.' }
        ],
        Email: [
            { id: 11, title: 'Monthly Progress Report', tag: 'Progress', body: 'Dear {{name}},\n\nHere is your monthly fitness progress summary for {{month}}.\n\nWorkouts completed: {{count}}\nCalories burned: {{calories}}\n\nKeep pushing!' },
            { id: 12, title: 'Holiday Closure Notice', tag: 'General', body: 'Important Notice: Incline Fitness will be closed on {{date}} for {{occasion}}. We will resume normal hours from {{resume_date}}. Happy holidays!' }
        ]
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success('Template copied to clipboard');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredTemplates = (templates[activeTab] || []).filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <RightDrawer
            isOpen={isOpen}
            onClose={onClose}
            title="Message Templates"
            subtitle="Manage and reuse your common messages"
            maxWidth="max-w-2xl"
        >
            <div className="flex flex-col h-full bg-slate-50/30">
                {/* Search and Tabs Header */}
                <div className="p-8 space-y-6 bg-white border-b border-slate-100 shrink-0">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-semibold focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100 justify-between">
                        {[
                            { name: 'WhatsApp', icon: MessageCircle },
                            { name: 'SMS', icon: Smartphone },
                            { name: 'Email', icon: Mail }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.name;
                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isActive
                                            ? 'bg-white text-slate-900 shadow-xl shadow-slate-200 border border-slate-100 scale-[1.02]'
                                            : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    <Icon size={16} className={isActive ? 'text-violet-600' : ''} />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Templates List */}
                <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 custom-scrollbar">
                    {filteredTemplates.length > 0 ? (
                        filteredTemplates.map((template) => (
                            <div key={template.id} className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
                                {/* Decorator */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h4 className="text-lg font-black text-slate-900 tracking-tight pr-4">{template.title}</h4>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${template.tag === 'Welcome' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            template.tag === 'Reminder' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                template.tag === 'Promotion' ? 'bg-violet-50 text-violet-600 border-violet-100' :
                                                    template.tag === 'Followup' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-slate-50 text-slate-600 border-slate-100'
                                        }`}>
                                        {template.tag}
                                    </span>
                                </div>

                                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mb-6 group-hover:bg-white transition-colors duration-300">
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        {template.body}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleCopy(template.body, template.id)}
                                    className={`w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all border-2 ${copiedId === template.id
                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200'
                                            : 'bg-white border-slate-100 text-slate-900 hover:border-violet-600 hover:text-violet-600 hover:shadow-lg hover:shadow-violet-100 active:scale-[0.98]'
                                        }`}
                                >
                                    {copiedId === template.id ? (
                                        <>
                                            <Check size={18} />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} className="text-slate-400 group-hover:text-violet-600 transition-colors" />
                                            <span>Copy Template</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                                <Search size={32} />
                            </div>
                            <div>
                                <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">No templates found</h5>
                                <p className="text-xs text-slate-400 mt-1 font-medium">Try searching for something else</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </RightDrawer>
    );
};

export default MessageTemplatesDrawer;
