import React from 'react';
import { Mail, MessageSquare, Plus, Tag } from 'lucide-react';

const MessageTemplates = () => {
    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-5xl mx-auto font-sans">
            {/* Header Section */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 shadow-sm border border-slate-100">
                            <Mail size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2">
                                Communication Templates
                            </h1>
                            <p className="text-slate-500 text-sm font-medium">
                                Manage SMS, Email, and WhatsApp message templates
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-100 self-start sm:self-center">
                        <Plus size={18} />
                        Add Template
                    </button>
                </div>
            </div>

            {/* Template Sections */}
            <div className="grid grid-cols-1 gap-8">
                {/* SMS Templates */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Tag size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">SMS Templates</h2>
                    </div>
                    <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                        <p className="text-slate-400 font-medium italic">No SMS templates yet</p>
                    </div>
                </div>

                {/* Email Templates */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Email Templates</h2>
                    </div>
                    <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                        <p className="text-slate-400 font-medium italic">No Email templates yet</p>
                    </div>
                </div>

                {/* WhatsApp Templates */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <MessageSquare size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">WhatsApp Templates</h2>
                    </div>
                    <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                        <p className="text-slate-400 font-medium italic">No WhatsApp templates yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageTemplates;
