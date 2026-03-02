import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Plus, Filter, Calendar, User, Users,
    Dumbbell, Clock, X, ChevronDown, CheckCircle2,
    MoreHorizontal, LayoutGrid, List as ListIcon,
    AlertCircle
} from 'lucide-react';
import { getClasses, createClass, updateClass } from '../../../api/manager/classesApi';
import { getAllStaff } from '../../../api/manager/managerApi';
import { useAuth } from '../../../context/AuthContext';
import { useBranchContext } from '../../../context/BranchContext';
import { toast } from 'react-hot-toast';

const ClassesList = () => {
    const { role } = useAuth();
    const { selectedBranch } = useBranchContext();
    const navigate = useNavigate();

    // State
    const [classes, setClasses] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Upcoming'); // Upcoming, Past, All
    const [contentTab, setContentTab] = useState('Schedule'); // Schedule, Attendance
    const [typeFilter, setTypeFilter] = useState('All');
    const [trainerFilter, setTrainerFilter] = useState('All');

    // Side Panel State
    const [showPanel, setShowPanel] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        capacity: 20,
        date: '',
        time: '',
        duration: 60,
        trainerId: '',
        description: ''
    });

    useEffect(() => {
        loadClasses();
        loadTrainers();
    }, [selectedBranch]);

    const loadClasses = async () => {
        try {
            setLoading(true);
            const data = await getClasses({ branchId: selectedBranch });
            setClasses(data || []);
        } catch (error) {
            console.error('Error loading classes:', error);
            toast.error('Failed to load classes');
        } finally {
            setLoading(false);
        }
    };

    const loadTrainers = async () => {
        try {
            const data = await getAllStaff();
            setTrainers(data.filter(s => s.role === 'TRAINER') || []);
        } catch (error) {
            console.error('Error loading trainers:', error);
        }
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const payload = {
                ...formData,
                branchId: selectedBranch, // 'all' or specific ID
                maxCapacity: parseInt(formData.capacity)
            };
            await createClass(payload);
            toast.success(selectedBranch === 'all' ? 'Class created for all branches!' : 'Class created successfully!');
            setShowPanel(false);
            resetForm();
            loadClasses();
        } catch (error) {
            console.error('Error creating class:', error);
            toast.error('Failed to create class');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: '',
            capacity: 20,
            date: '',
            time: '',
            duration: 60,
            trainerId: '',
            description: ''
        });
    };

    // Filter Logic
    const filteredClasses = (classes || []).filter(cls => {
        const matchesSearch = (cls.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.trainerName?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesType = typeFilter === 'All' || cls.requiredBenefit === typeFilter;
        const matchesTrainer = trainerFilter === 'All' || cls.trainerId?.toString() === trainerFilter;

        // Tab Filtering (Simplistic for now)
        if (activeTab === 'Upcoming') {
            return matchesSearch && matchesType && matchesTrainer && cls.status === 'Scheduled';
        } else if (activeTab === 'Past') {
            return matchesSearch && matchesType && matchesTrainer && cls.status === 'Completed';
        }
        return matchesSearch && matchesType && matchesTrainer;
    });

    const classTypes = ['Yoga', 'HIIT', 'Spin', 'Pilates', 'Zumba', 'Strength'];

    return (
        <div className="min-h-screen bg-[#F8F9FC] p-6 lg:p-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Classes</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage group classes and bookings</p>
                </div>
                <button
                    onClick={() => setShowPanel(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                    <Plus size={18} />
                    Create Class
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <KPICard title="Upcoming Classes" value={filteredClasses.filter(c => c.status === 'Scheduled').length} icon={<Calendar size={20} />} color="blue" />
                <KPICard title="Today's Classes" value={0} icon={<Clock size={20} />} color="indigo" />
                <KPICard title="Total Bookings" value={0} icon={<Users size={20} />} color="blue" />
                <KPICard title="Active Trainers" value={trainers.length} icon={<User size={20} />} color="blue" />
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row items-center gap-4">
                    {/* Status Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['Upcoming', 'Past', 'All'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative flex-1 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search classes or trainers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                        />
                    </div>

                    {/* Dropdowns */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="pl-10 pr-8 py-2.5 bg-slate-50 border-transparent rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer hover:bg-slate-100"
                            >
                                <option value="All">All Types</option>
                                {classTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <select
                                value={trainerFilter}
                                onChange={(e) => setTrainerFilter(e.target.value)}
                                className="pl-10 pr-8 py-2.5 bg-slate-50 border-transparent rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer hover:bg-slate-100"
                            >
                                <option value="All">All Trainers</option>
                                {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Sub-tabs */}
                <div className="px-4 py-3 flex items-center gap-6 border-b border-slate-50">
                    <button
                        onClick={() => setContentTab('Schedule')}
                        className={`text-sm font-bold pb-2 transition-all ${contentTab === 'Schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Schedule ({filteredClasses.length})
                    </button>
                    <button
                        onClick={() => setContentTab('Attendance')}
                        className={`text-sm font-bold pb-2 transition-all ${contentTab === 'Attendance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Attendance
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="p-6">
                    {contentTab === 'Attendance' ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                                <CheckCircle2 size={28} className="text-blue-300" />
                            </div>
                            <p className="text-sm font-bold text-slate-700 mb-1">Select a class from the schedule to view attendance</p>
                            <p className="text-xs text-slate-400">Switch to the Schedule tab and choose a class to manage its attendance.</p>
                        </div>
                    ) : loading ? (
                        <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
                            <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Loading classes...</p>
                        </div>
                    ) : filteredClasses.length > 0 ? (
                        <div className="saas-table-wrapper border-0 rounded-none">
                            <table className="saas-table saas-table-responsive">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Info</th>
                                        <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trainer</th>
                                        <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule</th>
                                        <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bookings</th>
                                        <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="text-right py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredClasses.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="py-4 px-6" data-label="Class Info">
                                                <div className="flex items-center gap-3 justify-end sm:justify-start">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <Dumbbell size={20} />
                                                    </div>
                                                    <div className="text-right sm:text-left">
                                                        <div className="text-sm font-bold text-slate-900">{cls.name}</div>
                                                        <div className="text-[10px] font-bold text-slate-400 uppercase">{cls.requiredBenefit || 'General'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6" data-label="Trainer">
                                                <div className="flex items-center gap-2 justify-end sm:justify-start">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black">
                                                        {cls.trainerName?.charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700">{cls.trainerName}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6" data-label="Schedule">
                                                <div className="text-right sm:text-left">
                                                    <div className="text-xs font-bold text-slate-700">{cls.schedule}</div>
                                                    <div className="text-[10px] text-slate-400">{cls.duration}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6" data-label="Bookings">
                                                <div className="flex flex-col items-end sm:items-start gap-1">
                                                    <div className="text-xs font-bold text-slate-700">{cls.enrolled} / {cls.capacity}</div>
                                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${cls.enrolled >= cls.capacity ? 'bg-red-500' : 'bg-indigo-600'}`}
                                                            style={{ width: `${Math.min(100, (cls.enrolled / cls.capacity) * 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6" data-label="Status">
                                                <div className="flex justify-end sm:justify-start">
                                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${cls.status === 'Scheduled' ? 'bg-indigo-50 text-indigo-600' :
                                                        cls.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                                            'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {cls.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right" data-label="Action">
                                                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                                <Calendar size={28} className="text-slate-300" />
                            </div>
                            <p className="text-sm font-bold text-slate-700 mb-1">No upcoming classes scheduled.</p>
                            <p className="text-xs text-slate-400 mb-6">Get started by scheduling your first group class.</p>
                            <button
                                onClick={() => setShowPanel(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                <Plus size={16} />
                                Schedule a Class
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Side Panel Overlay */}
            {showPanel && (
                <div className="fixed inset-0 z-[100] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => !submitting && setShowPanel(false)} />
                    <div className="absolute inset-y-0 right-0 max-w-full flex">
                        <div className="w-screen max-w-md bg-white shadow-2xl animate-slide-in-right flex flex-col">
                            {/* Panel Header */}
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Create New Class</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-1">Schedule a new group class</p>
                                </div>
                                <button
                                    onClick={() => setShowPanel(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
                                    disabled={submitting}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Panel Form */}
                            <form onSubmit={handleCreateClass} className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                                {/* Class Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Class Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Yoga, HIIT, Spin, etc."
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                    />
                                </div>

                                {/* Class Type & Capacity */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Class Type</label>
                                        <div className="relative">
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none appearance-none font-medium text-slate-700"
                                            >
                                                <option value="">Select type</option>
                                                {classTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Capacity *</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Date & Time & Duration */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Date & Time *</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        />
                                        <input
                                            type="time"
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        />
                                        <p className="text-[10px] text-slate-400 italic pl-1">dd-mm-yyyy --:--</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Duration (minutes)</label>
                                        <input
                                            type="number"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Trainer */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Trainer</label>
                                    <div className="relative">
                                        <select
                                            value={formData.trainerId}
                                            onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none appearance-none font-medium"
                                        >
                                            <option value="">No trainer</option>
                                            {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5 flex-1 flex flex-col">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Description</label>
                                    <textarea
                                        placeholder="Class description..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-auto border-t border-slate-50">
                                    <button
                                        type="button"
                                        disabled={submitting}
                                        onClick={() => setShowPanel(false)}
                                        className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                        Create Class
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const KPICard = ({ title, value, icon, color }) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        orange: 'bg-orange-50 text-orange-600',
        blue: 'bg-blue-50 text-blue-600'
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${colorClasses[color] || 'bg-slate-50 text-slate-600'} group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                {/* Optional mini Sparkline or indicator */}
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">{value}</div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</div>
        </div>
    );
};

export default ClassesList;

