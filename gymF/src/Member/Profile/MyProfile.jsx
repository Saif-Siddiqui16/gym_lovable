import React from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Key,
    Shield,
    Activity,
    Users,
    LayoutDashboard,
    Clock,
    Search
} from 'lucide-react';
import Card from '../../components/ui/Card';

const MyProfile = () => {
    return (
        <div className="saas-container h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 px-2 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100/50 rounded-2xl shadow-inner border border-indigo-100 flex items-center justify-center">
                        <User size={36} className="text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-1">
                            My Profile
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            Manage your personal information
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-11 px-8 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95 group">
                        <Key size={14} className="group-hover:rotate-12 transition-transform" /> Reset Password
                    </button>
                    <button className="h-11 px-8 bg-indigo-600 border-2 border-indigo-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-95">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Profile Summary Section */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                <Card className="p-8 border border-white rounded-[32px] bg-white shadow-2xl shadow-indigo-100/30 relative overflow-hidden group hover:shadow-indigo-200/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                        <User size={180} />
                    </div>
                    <div className="relative z-10 flex items-center gap-10">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white text-3xl font-black border-[6px] border-white shadow-2xl shadow-indigo-200 ring-8 ring-indigo-100/30">
                                DM
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Demo Member</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                                    Member ID: <span className="text-indigo-600 font-black">MEM001</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-1">
                                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-sm">active</span>
                                <span className="px-4 py-1.5 bg-white text-slate-600 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group/badge">
                                    Premium Gold Plan
                                    <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-indigo-200/50 rounded-full" />
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Personal Information Section */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                <Card className="p-10 border border-white rounded-[40px] bg-white shadow-2xl shadow-indigo-100/30 space-y-10 group hover:shadow-indigo-200/40 transition-all duration-500">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Personal Information</h3>
                        <p className="text-sm text-slate-400 font-medium">Your personal details and contact information</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                        {/* Full Name */}
                        <div className="space-y-3 group/field">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest opacity-60 group-hover/field:opacity-100 transition-opacity">
                                <User size={14} className="text-indigo-500" />
                                <span>Full Name</span>
                            </div>
                            <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5 text-slate-900 font-bold text-sm shadow-inner group-hover/field:border-indigo-100 transition-colors">
                                Demo Member
                            </div>
                            <p className="text-[10px] text-amber-600/80 font-black uppercase tracking-tighter">Contact admin to change your name</p>
                        </div>

                        {/* Email */}
                        <div className="space-y-3 group/field">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest opacity-60 group-hover/field:opacity-100 transition-opacity">
                                <Mail size={14} className="text-indigo-500" />
                                <span>Email Address</span>
                            </div>
                            <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5 text-slate-900 font-bold text-sm shadow-inner group-hover/field:border-indigo-100 transition-colors">
                                member@example.com
                            </div>
                            <p className="text-[10px] text-indigo-400/80 font-black uppercase tracking-tighter">Email cannot be changed</p>
                        </div>

                        {/* Phone */}
                        <div className="space-y-3 group/field">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest opacity-60 group-hover/field:opacity-100 transition-opacity">
                                <Phone size={14} className="text-indigo-500" />
                                <span>Phone Number</span>
                            </div>
                            <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5 text-slate-900 font-bold text-sm shadow-inner group-hover/field:border-indigo-100 transition-colors">
                                1234567890
                            </div>
                        </div>

                        {/* Member Since */}
                        <div className="space-y-3 group/field">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest opacity-60 group-hover/field:opacity-100 transition-opacity">
                                <Calendar size={14} className="text-indigo-500" />
                                <span>Member Since</span>
                            </div>
                            <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-5 text-slate-900 font-bold text-sm shadow-inner group-hover/field:border-indigo-100 transition-colors">
                                Not set
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-3 group/field">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest opacity-60 group-hover/field:opacity-100 transition-opacity">
                                <Activity size={14} className="text-indigo-500" />
                                <span>Current Status</span>
                            </div>
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest underline underline-offset-4 decoration-emerald-200">Profile Active</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Emergency Contact Section */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                <Card className="p-10 border border-white rounded-[40px] bg-white shadow-2xl shadow-indigo-100/30 space-y-10 group hover:shadow-indigo-200/40 transition-all duration-500">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 shadow-inner border border-rose-100">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Emergency Contact</h3>
                            <p className="text-sm text-slate-400 font-medium">Contact person in case of emergency</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest opacity-60">Contact Name</p>
                            <div className="h-14 w-full bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center px-5 text-slate-400 font-bold text-sm italic shadow-inner">
                                Emergency contact name
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest opacity-60">Contact Phone</p>
                            <div className="h-14 w-full bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center px-5 text-slate-400 font-bold text-sm italic shadow-inner">
                                Emergency contact phone
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Membership Details Section */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
                <Card className="p-10 border border-white rounded-[40px] bg-white shadow-2xl shadow-indigo-100/30 space-y-10 group hover:shadow-indigo-200/40 transition-all duration-500">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Membership Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
                        <div className="space-y-2 group/val">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover/val:text-indigo-500 transition-colors">Plan</p>
                            <p className="text-lg font-black text-slate-900 tracking-tight">Premium Gold Plan</p>
                            <div className="w-8 h-1 bg-indigo-100 rounded-full" />
                        </div>
                        <div className="space-y-2 group/val">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover/val:text-emerald-500 transition-colors">Start Date</p>
                            <p className="text-lg font-black text-slate-900 tracking-tight">28 Feb 2026</p>
                            <div className="w-8 h-1 bg-emerald-100 rounded-full" />
                        </div>
                        <div className="space-y-2 group/val">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover/val:text-rose-500 transition-colors">End Date</p>
                            <p className="text-lg font-black text-slate-900 tracking-tight">30 Mar 2026</p>
                            <div className="w-8 h-1 bg-rose-100 rounded-full" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Branch Section */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
                <Card className="p-10 border border-white rounded-[40px] bg-white shadow-2xl shadow-indigo-100/30 group hover:shadow-indigo-200/40 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-50/50 rounded-2xl text-indigo-600 shadow-inner">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Branch Location</h3>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-slate-50/50 border border-slate-100 rounded-3xl group-hover:bg-white transition-colors duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100/50 border border-indigo-50 scale-110">
                            <MapPin size={32} />
                        </div>
                        <div>
                            <p className="text-xl font-black text-slate-900 tracking-tight">Main Branch</p>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Your registered home branch</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyProfile;
