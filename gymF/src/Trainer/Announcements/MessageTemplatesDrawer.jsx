import React, { useState } from 'react';
import { MessageCircle, Mail, Smartphone, Copy, Check, Search, PlusCircle } from 'lucide-react';
import RightDrawer from '../../components/common/RightDrawer';
import toast from 'react-hot-toast';

const MessageTemplatesDrawer = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('WhatsApp');
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const templates = {
        WhatsApp: [
            {
                id: 'new-class',
                title: 'New Class Announcement',
                tag: 'General',
                body: "🆕 NEW CLASS ALERT!\n\nHi {{name}}! \n\nWe're excited to introduce:\n🏃 {{class_name}}\n📅 Starting {{start_date}}\n⏰ Every {{schedule}}\n👤 With {{trainer_name}}"
            },
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
                id: 9,
                title: 'Class Booking Reminder',
                tag: 'Reminder',
                body: '🧘 Class Reminder!\n\nHi {{name}}, you\'re booked for: {{class_name}} today at {{time}}. See you there!'
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
            }
        ],
        SMS: [
            { id: 14, title: 'Membership Expiring (7 Days)', tag: 'Reminder', body: 'Hi {{name}}, your Incline Fitness membership expires in 7 days ({{end_date}}). Renew now to continue your fitness journey! Visit us or call for renewal.' },
            { id: 15, title: 'Payment Due Reminder', tag: 'Reminder', body: 'Hi {{name}}, you have a pending payment of ₹{{amount}} at Incline Fitness. Please clear the dues at your earliest convenience. Invoice: {{invoice_number}}' },
            { id: 16, title: 'Trial Session Follow-up', tag: 'Followup', body: 'Hi {{name}}! How was your trial at Incline Fitness? Ready to start your fitness journey? Sign up today and get 15% OFF! Call us or visit for details.' },
            { id: 17, title: 'Gym Closure Notice', tag: 'General', body: 'Incline Fitness Notice: Our gym will be closed on {{closure_date}} for {{reason}}. We apologize for the inconvenience. Regular hours resume on {{resume_date}}.' }
        ],
        Email: [
            { id: 12, title: 'Monthly Progress Report', tag: 'Progress', body: 'Dear {{name}},\n\nHere is your monthly fitness progress summary.\n\nWorkouts completed: {{count}}\nCalories burned: {{calories}}\n\nKeep pushing!' },
            { id: 13, title: 'New Personal Training Package', tag: 'General', body: 'Hello {{name}},\n\nWe have launched a new 12-week Transformation Package! Perfect for reaching your goals faster.' }
        ]
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success('Template copied!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredTemplates = (templates[activeTab] || []).filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [isAddingTemplate, setIsAddingTemplate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ title: '', tag: 'General', body: '' });

    const handleSaveTemplate = (e) => {
        e.preventDefault();
        const id = Date.now();
        // In a real app, this would be an API call
        // For now, we update local state or just show feedback
        toast.success(`New ${activeTab} Template Created!`);
        setIsAddingTemplate(false);
        setNewTemplate({ title: '', tag: 'General', body: '' });
    };

    const footer = (
        <div className="p-4 bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-100 flex items-center justify-between">
            <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest leading-relaxed">
                {isAddingTemplate ? 'Drafting New Message' : 'Want to add more?'}<br />
                <span className="opacity-60">{isAddingTemplate ? 'Fill in details below' : 'Manage templates in system settings'}</span>
            </p>
            {!isAddingTemplate && (
                <button
                    onClick={() => setIsAddingTemplate(true)}
                    className="px-4 py-2 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                    <PlusCircle size={14} /> New Template
                </button>
            )}
        </div>
    );

    return (
        <RightDrawer
            isOpen={isOpen}
            onClose={() => {
                setIsAddingTemplate(false);
                onClose();
            }}
            title={isAddingTemplate ? "Create Template" : "Message Templates"}
            subtitle={isAddingTemplate ? `Adding to ${activeTab}` : "Ready-to-use message formats"}
            maxWidth="max-w-md"
            footer={footer}
        >
            <div className="flex flex-col h-full bg-slate-50/20">
                {/* Search and Tabs Header - Only show if not adding */}
                {!isAddingTemplate && (
                    <div className="p-8 space-y-6 bg-white border-b border-slate-100 shrink-0 rounded-t-3xl">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-semibold focus:border-indigo-500 transition-all outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
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
                                        className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive
                                            ? 'bg-white text-indigo-600 shadow-sm border border-slate-100'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        <Icon size={14} />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 custom-scrollbar">
                    {isAddingTemplate ? (
                        <form onSubmit={handleSaveTemplate} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="drawer-form-group">
                                <label className="drawer-label">
                                    Template Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. New Program Launch"
                                    className="drawer-input"
                                    value={newTemplate.title}
                                    onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                                />
                            </div>

                            <div className="drawer-form-group">
                                <label className="drawer-label">
                                    Category / Tag
                                </label>
                                <select
                                    className="drawer-select"
                                    value={newTemplate.tag}
                                    onChange={(e) => setNewTemplate({ ...newTemplate, tag: e.target.value })}
                                >
                                    <option>General</option>
                                    <option>Welcome</option>
                                    <option>Reminder</option>
                                    <option>Promotion</option>
                                    <option>Followup</option>
                                </select>
                            </div>

                            <div className="drawer-form-group">
                                <label className="drawer-label">
                                    Message Body
                                </label>
                                <textarea
                                    required
                                    placeholder="Type your template message here..."
                                    className="drawer-textarea"
                                    value={newTemplate.body}
                                    onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddingTemplate(false)}
                                    className="drawer-btn drawer-btn-secondary flex-1"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    className="drawer-btn drawer-btn-primary flex-[2]"
                                >
                                    Save Template
                                </button>
                            </div>
                        </form>
                    ) : filteredTemplates.length > 0 ? (
                        filteredTemplates.map((template) => (
                            <div key={template.id} className="group bg-white rounded-3xl p-6 border-2 border-slate-100 transition-all hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{template.title}</h4>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${template.tag === 'Welcome' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        template.tag === 'Reminder' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            template.tag === 'Promotion' ? 'bg-violet-50 text-violet-600 border-violet-100' :
                                                template.tag === 'Followup' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                    'bg-slate-50 text-slate-500 border-slate-100'
                                        }`}>
                                        {template.tag}
                                    </span>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-50 group-hover:bg-white group-hover:border-indigo-50 transition-all">
                                    <p className="text-xs font-semibold text-slate-500 leading-relaxed whitespace-pre-wrap">
                                        {template.body}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleCopy(template.body, template.id)}
                                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all border-2 ${copiedId === template.id
                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                        : 'bg-white border-slate-100 text-slate-900 hover:border-indigo-600 hover:text-indigo-600'
                                        }`}
                                >
                                    {copiedId === template.id ? (
                                        <>
                                            <Check size={14} />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            <span>Copy Template</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Search size={40} className="text-slate-200 mb-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No templates match search</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
            `}</style>
        </RightDrawer>
    );
};

export default MessageTemplatesDrawer;
