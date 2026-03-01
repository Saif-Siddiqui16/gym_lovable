import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    MessageSquare,
    Send,
    Phone,
    MoreVertical,
    Paperclip,
    ChevronLeft,
    CheckCheck,
    Clock,
    User,
    FileText,
    Calendar,
    Smile,
    Command,
    Bell,
    Moon,
    X,
    MoreHorizontal
} from 'lucide-react';

const WhatsAppChat = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);

    const members = [];

    const messages = [
        { id: 1, text: 'Hi, how can I help you?', time: '12:40 PM', type: 'sent' },
        { id: 2, text: 'I have a query about the premium monthly plan', time: '12:45 PM', type: 'received' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 sm:p-8 space-y-8 animate-fadeIn text-slate-900 font-sans">

            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 text-white">
                    <MessageSquare size={24} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">WhatsApp Chat</h1>
            </div>

            {/* Main Chat Container */}
            <div className="flex gap-6 h-[calc(100vh-180px)]">

                {/* Contact Sidebar */}
                <div className={`
                    ${showSidebar ? 'w-full lg:w-96 flex' : 'hidden lg:flex lg:w-96'} 
                    bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex-col
                `}>
                    {/* Sidebar Search Area */}
                    <div className="p-6 border-b border-slate-50">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 pl-12 pr-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Contact List */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col items-center justify-center text-center">
                        {members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                            members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(member => (
                                <button
                                    key={member.id}
                                    onClick={() => setSelectedMember(member)}
                                    className={`w-full p-4 rounded-3xl flex items-start gap-4 transition-all duration-300 group ${selectedMember?.id === member.id ? 'bg-indigo-50 shadow-sm border border-indigo-100' : 'hover:bg-slate-50'}`}
                                >
                                    <div className="relative">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform ${member.id === 1 ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-slate-300'}`}>
                                            {member.name.charAt(0)}
                                        </div>
                                        {member.status === 'online' && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-[13px] font-black tracking-tight ${selectedMember?.id === member.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                                                {member.name}
                                            </span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.time}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-500 truncate">{member.lastMsg}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="space-y-4 animate-in fade-in zoom-in duration-700">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-200 mx-auto shadow-inner">
                                    <MessageSquare size={28} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">No conversations yet</h4>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main View Area */}
                <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col relative">
                    {selectedMember ? (
                        <>
                            {/* Chat Header */}
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shadow-inner">
                                        {selectedMember.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 tracking-tight">{selectedMember.name}</h3>
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Active Now</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-indigo-600 transition-all">
                                        <Phone size={20} />
                                    </button>
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-indigo-600 transition-all">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages View */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 custom-scrollbar">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                                        <div className={`max-w-[70%] p-5 rounded-[2rem] shadow-sm border ${msg.type === 'sent' ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none' : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'}`}>
                                            <p className="text-[13px] font-bold leading-relaxed">{msg.text}</p>
                                            <div className={`mt-2 flex items-center gap-2 ${msg.type === 'sent' ? 'text-indigo-200' : 'text-slate-400'}`}>
                                                <span className="text-[9px] font-black uppercase tracking-widest">{msg.time}</span>
                                                {msg.type === 'sent' && <CheckCheck size={14} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-8 border-t border-slate-50 bg-white">
                                <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-[2rem] px-6 py-3 shadow-inner group focus-within:border-indigo-400 transition-all">
                                    <button className="p-2 text-slate-300 hover:text-indigo-500 transition-colors">
                                        <Smile size={22} />
                                    </button>
                                    <button className="p-2 text-slate-300 hover:text-indigo-500 transition-colors">
                                        <Paperclip size={22} />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type your message here..."
                                        className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold text-slate-700 placeholder:text-slate-300"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <button className={`p-3 rounded-2xl transition-all ${messageInput ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110' : 'bg-slate-200 text-slate-400'}`}>
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Empty State (Matching Screenshot) */
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white relative">
                            <div className="space-y-6 animate-in fade-in zoom-in duration-1000">
                                <div className="w-24 h-24 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center text-slate-200 mx-auto shadow-inner relative group cursor-default">
                                    <MessageSquare size={44} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute -inset-4 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-slate-400 text-sm font-black uppercase tracking-[0.2em]">Select a conversation to start chatting</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
            `}</style>
        </div>
    );
};

export default WhatsAppChat;
