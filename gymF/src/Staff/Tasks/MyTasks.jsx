import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, Search, Filter, CheckSquare, Clock, AlertCircle, CheckCircle2, LayoutGrid, List, Box } from 'lucide-react';
import '../../styles/GlobalDesign.css';
import CreateTaskDrawer from './CreateTaskDrawer';

const MyTasks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleCreateSuccess = () => {
        // Logic to refresh tasks if needed
    };

    // Initial stats to match screenshot
    const stats = {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 sm:p-8 space-y-8 animate-fadeIn text-slate-900 font-sans">
            {/* Premium Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 text-white cursor-pointer hover:scale-105 transition-transform">
                        <ClipboardList size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Task Management</h1>
                        <p className="text-slate-500 text-sm font-medium">Manage and track your operational responsibilities</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                >
                    <Plus size={16} /> New Task
                </button>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {[
                    { label: 'Total Tasks', value: stats.total, color: 'text-slate-900', bg: 'bg-slate-50' },
                    { label: 'Pending', value: stats.pending, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'In Progress', value: stats.inProgress, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Completed', value: stats.completed, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Overdue', value: stats.overdue, color: 'text-rose-500', bg: 'bg-rose-50' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-[2rem] p-9 shadow-sm border border-slate-100 flex flex-col items-center justify-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">{item.label}</p>
                        <h2 className={`text-5xl font-black ${item.color}`}>{item.value}</h2>
                    </div>
                ))}
            </div>

            {/* All Tasks Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                {/* Section Header */}
                <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">All Tasks</h3>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:min-w-[200px]">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full h-12 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-indigo-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1.25rem_center] bg-no-repeat shadow-inner"
                            >
                                <option>All</option>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Overdue</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table Headers */}
                {tasks.length === 0 && (
                    <div className="px-8 py-6 border-b border-slate-50 grid grid-cols-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">
                        <span>Task</span>
                        <span>Priority</span>
                        <span>Assigned To</span>
                        <span>Due Date</span>
                        <span>Status</span>
                        <span className="text-right">Actions</span>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    {tasks.length === 0 ? (
                        <div className="space-y-4 animate-in fade-in zoom-in duration-700">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center text-slate-200 mx-auto shadow-inner">
                                <CheckSquare size={36} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-slate-400 text-sm font-black uppercase tracking-widest">No tasks found</h4>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            {/* Task list would go here */}
                        </div>
                    )}
                </div>
            </div>

            <CreateTaskDrawer
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
};

export default MyTasks;
