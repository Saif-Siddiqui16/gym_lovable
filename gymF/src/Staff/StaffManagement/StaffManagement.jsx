import React from 'react';
import { Users, CheckCircle, Clock, Briefcase } from 'lucide-react';

const StaffManagement = ({ role, branchId }) => {
    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50/30 min-h-screen p-6 md:p-8 font-sans pb-24 text-slate-800">
            {/* Header section matching exact text */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Staff Attendance
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">View all staff attendance</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards Exact text */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Currently Working</p>
                            <h3 className="text-2xl font-black text-slate-800">0</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Today’s Check-ins</p>
                            <h3 className="text-2xl font-black text-slate-800">0</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completed Shifts</p>
                            <h3 className="text-2xl font-black text-slate-800">0</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Section: Currently On Duty */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Currently On Duty</h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Staff currently checked in</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm border border-white/50 overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Staff</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Check-in Time</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Duration</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    <tr>
                                        <td colSpan="4" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Clock size={32} />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800">No staff currently on duty</h3>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Section: Today’s Attendance Log */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Today’s Attendance Log</h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">All staff check-ins for today</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm border border-white/50 overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Staff</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Check-in</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Check-out</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Duration</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Briefcase size={32} />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800">No attendance records for today</h3>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffManagement;
