import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ListTodo, Clock, Loader2, AlertCircle, CheckCircle2, Filter, Building2, FileText, UserPlus, Calendar } from 'lucide-react';
import RightDrawer from '../../components/common/RightDrawer';
import CustomDropdown from '../../components/common/CustomDropdown';

const TaskList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [isNewTaskDrawerOpen, setIsNewTaskDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        branch: '',
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        assignTo: ''
    });

    // Mock data for dropdowns
    const branchOptions = [
        { label: 'Main Branch', value: 'main' },
        { label: 'Downtown Gym', value: 'downtown' },
        { label: 'Westside Fitness', value: 'westside' }
    ];

    const staffOptions = [
        { label: 'John Doe (Trainer)', value: '1' },
        { label: 'Jane Smith (Staff)', value: '2' },
        { label: 'Mike Wilson (Manager)', value: '3' }
    ];

    const priorityOptions = ['Low', 'Medium', 'High'];

    const handleNewTask = () => {
        setIsNewTaskDrawerOpen(true);
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        // Simulation of task creation
        console.log('Task Created:', formData);
        setIsNewTaskDrawerOpen(false);
        // Reset form
        setFormData({
            branch: '',
            title: '',
            description: '',
            priority: 'Medium',
            dueDate: '',
            assignTo: ''
        });
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50/30 min-h-screen p-6 md:p-8 font-sans pb-24 text-slate-800">
            {/* Header section matching exact text */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Task Management
                        </h1>
                    </div>
                    <button
                        onClick={handleNewTask}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        <Plus size={20} strokeWidth={3} />
                        New Task
                    </button>
                </div>
            </div>

            {/* Stats Cards Exact text */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                        { label: 'Total Tasks', value: '0', color: 'indigo', icon: ListTodo },
                        { label: 'Pending', value: '0', color: 'amber', icon: Clock },
                        { label: 'In Progress', value: '0', color: 'blue', icon: Loader2 },
                        { label: 'Completed', value: '0', color: 'emerald', icon: CheckCircle2 },
                        { label: 'Overdue', value: '0', color: 'rose', icon: AlertCircle },
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 bg-${card.color}-50 text-${card.color}-600 rounded-xl flex items-center justify-center`}>
                                <card.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{card.label}</p>
                                <h3 className="text-2xl font-black text-slate-800">{card.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section: All Tasks */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col mb-6">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">All Tasks</h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-100">
                    {['All'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab
                                ? 'border-violet-600 text-violet-600'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm border border-white/50 overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Task</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Priority</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Assigned To</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Due Date</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/50">
                                <tr>
                                    <td colSpan="6" className="py-24 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Filter size={32} />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-800">No tasks found</h3>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create New Task Drawer */}
            <RightDrawer
                isOpen={isNewTaskDrawerOpen}
                onClose={() => setIsNewTaskDrawerOpen(false)}
                title="Create New Task"
                subtitle="Add a new task and assign it to team members"
                maxWidth="max-w-md"
                footer={
                    <div className="flex gap-4 w-full">
                        <button
                            onClick={() => setIsNewTaskDrawerOpen(false)}
                            className="flex-1 h-12 border-2 border-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 hover:border-slate-200 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="create-task-form"
                            className="flex-1 h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-violet-200 hover:shadow-violet-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Create Task
                        </button>
                    </div>
                }
            >
                <form id="create-task-form" onSubmit={handleCreateTask} className="space-y-6 px-6 py-8">
                    {/* Branch */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Building2 size={14} className="text-violet-500" />
                            Branch *
                        </label>
                        <CustomDropdown
                            options={branchOptions}
                            value={formData.branch}
                            onChange={(val) => setFormData({ ...formData, branch: val })}
                            placeholder="Select branch"
                            className="w-full"
                        />
                    </div>

                    {/* Task Title */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <FileText size={14} className="text-violet-500" />
                            Title *
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Task title"
                            className="saas-input w-full h-12 px-5 rounded-2xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm bg-slate-50/50 focus:bg-white transition-all duration-300 group-hover:border-slate-200"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <AlertCircle size={14} className="text-violet-500" />
                            Description
                        </label>
                        <textarea
                            placeholder="Task description..."
                            rows="4"
                            className="saas-input w-full p-5 rounded-2xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm bg-slate-50/50 focus:bg-white transition-all duration-300 group-hover:border-slate-200 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Filter size={14} className="text-violet-500" />
                                Priority
                            </label>
                            <CustomDropdown
                                options={priorityOptions}
                                value={formData.priority}
                                onChange={(val) => setFormData({ ...formData, priority: val })}
                                className="w-full"
                            />
                        </div>

                        {/* Due Date */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Calendar size={14} className="text-violet-500" />
                                Due Date
                            </label>
                            <input
                                required
                                type="date"
                                className="saas-input w-full h-[52px] px-5 rounded-2xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm bg-slate-50/50 focus:bg-white transition-all duration-300 group-hover:border-slate-200"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Assign To */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <UserPlus size={14} className="text-violet-500" />
                            Assign To
                        </label>
                        <CustomDropdown
                            options={staffOptions}
                            value={formData.assignTo}
                            onChange={(val) => setFormData({ ...formData, assignTo: val })}
                            placeholder="Select user (optional)"
                            className="w-full"
                        />
                    </div>
                </form>
            </RightDrawer>
        </div>
    );
};

export default TaskList;
