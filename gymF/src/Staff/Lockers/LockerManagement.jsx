import React, { useState, useEffect } from 'react';
import { Lock, Search, Filter, Plus, ShieldCheck, ShieldAlert, Wrench, MoreVertical, RefreshCw, UserPlus, LogOut, Info, Box, LayoutGrid, List, User, Key, Users } from 'lucide-react';
import { getLockers } from '../../api/staff/lockerApi';
import RightDrawer from '../../components/common/RightDrawer';
import LockerFormDrawer from './LockerFormDrawer';
import LockerDetailDrawer from './LockerDetailDrawer';
import CreateLockerDrawer from './CreateLockerDrawer';
import BulkCreateLockersDrawer from '../../modules/operations/pages/BulkCreateLockersDrawer';

const LockerManagement = () => {
    const [lockers, setLockers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [activeTab, setActiveTab] = useState('Overview');
    const [viewMode, setViewMode] = useState('grid');

    const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
    const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
    const [isBulkCreateOpen, setIsBulkCreateOpen] = useState(false);
    const [selectedLocker, setSelectedLocker] = useState(null);

    // Initial mock stats to match screenshot
    const stats = {
        total: lockers.length,
        available: lockers.filter(l => l.status === 'Available').length,
        assigned: lockers.filter(l => l.status === 'Occupied' || l.status === 'Assigned').length,
        maintenance: lockers.filter(l => l.status === 'Maintenance').length,
        occupancy: lockers.length > 0 ? `${Math.round((lockers.filter(l => l.status !== 'Available').length / lockers.length) * 100)}%` : '0%'
    };

    const handleAction = (locker) => {
        setSelectedLocker(locker);
        if (locker.status === 'Available') {
            setIsAssignDrawerOpen(true);
        } else {
            setIsDetailDrawerOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 sm:p-8 space-y-8 animate-fadeIn text-slate-900">
            {/* Premium Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 text-white cursor-pointer hover:scale-105 transition-transform">
                        <Box size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Locker Management</h1>
                        <p className="text-slate-500 text-sm font-medium">Manage locker assignments, rentals, and availability</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsBulkCreateOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Box size={16} /> Bulk Create
                    </button>
                    <button
                        onClick={() => setIsCreateDrawerOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                    >
                        <Plus size={16} /> Add Locker
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Lockers', value: stats.total, icon: Box, color: 'text-blue-500', bg: 'bg-blue-50/50' },
                    { label: 'Available', value: stats.available, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
                    { label: 'Assigned', value: stats.assigned, subValue: `${stats.occupancy} occupancy`, icon: User, color: 'text-slate-500', bg: 'bg-slate-50/50' },
                    { label: 'Maintenance', value: stats.maintenance, icon: Key, color: 'text-amber-600', bg: 'bg-amber-100/50' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-slate-100 flex justify-between items-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-3xl font-black text-slate-900">{item.value}</h2>
                                {item.subValue && <span className="text-[10px] font-bold text-slate-400">{item.subValue}</span>}
                            </div>
                        </div>
                        <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* View Controls & Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 sm:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                        <input
                            placeholder="Search lockers..."
                            className="w-full h-12 pl-11 pr-5 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="h-12 px-5 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-violet-500 transition-all cursor-pointer shadow-sm min-w-[160px] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1.25rem_center] bg-no-repeat"
                    >
                        <option>All Status</option>
                        <option>Available</option>
                        <option>Assigned</option>
                        <option>Maintenance</option>
                        <option>Reserved</option>
                    </select>
                </div>
                <div className="flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs & Main Content */}
            <div className="space-y-6">
                <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm w-fit">
                    {['Overview', `Assigned (${stats.assigned})`].map((tab) => {
                        const label = tab.includes('Overview') ? 'Overview' : 'Assigned';
                        return (
                            <button
                                key={label}
                                onClick={() => setActiveTab(label)}
                                className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === label ? 'bg-violet-50 text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {/* Locker Map Card */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Locker Map</h3>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lockers.length} lockers</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                        {lockers.length === 0 ? (
                            <>
                                <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                                    <Lock size={40} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-slate-400 text-sm font-black uppercase tracking-widest">No lockers found</h4>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 w-full">
                                {lockers.map(locker => (
                                    <div
                                        key={locker.id}
                                        onClick={() => handleAction(locker)}
                                        className="aspect-square bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-violet-50 hover:border-violet-200 border border-transparent transition-all group"
                                    >
                                        <Lock size={20} className="text-slate-300 group-hover:text-violet-500 transition-colors" />
                                        <span className="text-xs font-black text-slate-700">{locker.number}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="p-8 bg-slate-50/50 flex flex-wrap gap-6 border-t border-slate-50">
                        {[
                            { label: 'Available', color: 'bg-green-400' },
                            { label: 'Assigned', color: 'bg-slate-400' },
                            { label: 'Maintenance', color: 'bg-orange-400' },
                            { label: 'Reserved', color: 'bg-blue-300' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm shadow-slate-200`} />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Drawers */}
            <LockerFormDrawer
                isOpen={isAssignDrawerOpen}
                onClose={() => setIsAssignDrawerOpen(false)}
                selectedLocker={selectedLocker}
            />

            <LockerDetailDrawer
                isOpen={isDetailDrawerOpen}
                onClose={() => setIsDetailDrawerOpen(false)}
                selectedLocker={selectedLocker}
            />

            <CreateLockerDrawer
                isOpen={isCreateDrawerOpen}
                onClose={() => setIsCreateDrawerOpen(false)}
                onSuccess={() => { }}
            />

            <RightDrawer
                isOpen={isBulkCreateOpen}
                onClose={() => setIsBulkCreateOpen(false)}
            >
                <BulkCreateLockersDrawer
                    onClose={() => setIsBulkCreateOpen(false)}
                    onSuccess={() => { }}
                />
            </RightDrawer>
        </div>
    );
};

export default LockerManagement;
