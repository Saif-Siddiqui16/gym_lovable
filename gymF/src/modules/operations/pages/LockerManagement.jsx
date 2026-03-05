import React, { useState, useEffect } from 'react';
import { lockerApi } from '../../../api/lockerApi';
import { useBranchContext } from '../../../context/BranchContext';
import toast from 'react-hot-toast';
import {
    Search,
    Lock,
    Unlock,
    Key,
    User,
    Settings,
    ChevronDown,
    LayoutGrid,
    List
} from 'lucide-react';
import RightDrawer from '../../../components/common/RightDrawer';
import AddLockerDrawer from './AddLockerDrawer';
import BulkCreateLockersDrawer from './BulkCreateLockersDrawer';
import LockerDetailsDrawer from './LockerDetailsDrawer';

const LockerManagement = () => {
    const { selectedBranch } = useBranchContext();
    const [lockers, setLockers] = useState([]);
    const [stats, setStats] = useState({ total: 0, available: 0, assigned: 0, maintenance: 0, occupancyRate: 0 });
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [activeTab, setActiveTab] = useState('Overview');
    const [viewMode, setViewMode] = useState('grid');

    // Drawers
    const [drawerType, setDrawerType] = useState(null); // 'add', 'bulk', 'details'
    const [selectedLocker, setSelectedLocker] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const [lockerData, statsData] = await Promise.all([
                lockerApi.getAllLockers({
                    branchId: selectedBranch,
                    search: searchTerm,
                    status: statusFilter === 'All Status' ? null : statusFilter
                }),
                lockerApi.getStats({ branchId: selectedBranch })
            ]);
            setLockers(lockerData);
            setStats(statsData);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load locker data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [selectedBranch, searchTerm, statusFilter]);

    const openDrawer = (type, data = null) => {
        setDrawerType(type);
        setSelectedLocker(data);
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setSelectedLocker(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-6 lg:p-10 pb-20">
            <div className="max-w-screen-2xl mx-auto space-y-10">
                {/* Premium Header */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-10 animate-pulse pointer-events-none group-hover:opacity-15 transition-opacity"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl border border-slate-100 p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-200 transition-transform duration-300 group-hover:scale-105">
                                <Lock size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">
                                    Locker Management
                                </h1>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Manage assignments, rentals, and availability</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => openDrawer('bulk')}
                                className="flex-1 sm:flex-none h-11 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Settings size={18} /> Bulk Create
                            </button>
                            <button
                                onClick={() => openDrawer('add')}
                                className="flex-1 sm:flex-none h-11 px-6 bg-[#7c3aed] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-violet-200 hover:bg-[#6d28d9] transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Lock size={18} /> + Add Locker
                            </button>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Total Lockers */}
                    <div className="bg-white rounded-[2rem] p-8 h-40 shadow-sm border border-slate-100 flex justify-between items-center gap-6 group hover:bg-violet-50 transition-all duration-500">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Lockers</p>
                            <h2 className="text-4xl font-black text-slate-900">{stats.total}</h2>
                        </div>
                        <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform shadow-sm">
                            <Lock size={28} />
                        </div>
                    </div>

                    {/* Available */}
                    <div className="bg-white rounded-[2rem] p-8 h-40 shadow-sm border border-slate-100 flex justify-between items-center gap-6 group hover:bg-emerald-50 transition-all duration-500">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Available</p>
                            <h2 className="text-4xl font-black text-emerald-600">{stats.available}</h2>
                        </div>
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-sm">
                            <Unlock size={28} />
                        </div>
                    </div>

                    {/* Assigned */}
                    <div className="bg-white rounded-[2rem] p-8 h-40 shadow-sm border border-slate-100 flex justify-between items-center gap-6 group hover:bg-blue-50 transition-all duration-500">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Assigned</p>
                            <div className="flex flex-col">
                                <h2 className="text-4xl font-black text-slate-900">{stats.assigned}</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stats.occupancyRate}% occupancy</p>
                            </div>
                        </div>
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                            <User size={28} />
                        </div>
                    </div>

                    {/* Maintenance */}
                    <div className="bg-white rounded-[2rem] p-8 h-40 shadow-sm border border-slate-100 flex justify-between items-center gap-6 group hover:bg-orange-50 transition-all duration-500">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Maintenance</p>
                            <h2 className="text-4xl font-black text-orange-600">{stats.maintenance}</h2>
                        </div>
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shadow-sm">
                            <Key size={28} />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search lockers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-slate-300"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
                            >
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Assigned</option>
                                <option>Maintenance</option>
                                <option>Reserved</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                            title="Grid View"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
                    <button
                        onClick={() => setActiveTab('Overview')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'Overview' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('Assigned')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'Assigned' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Assigned ({stats.assigned})
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[400px]">
                    {activeTab === 'Overview' && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-base font-semibold text-slate-800">Locker Map</h3>
                                <span className="text-sm text-slate-500">{lockers.length} lockers</span>
                            </div>

                            {loading ? (
                                <div className="h-64 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                                </div>
                            ) : lockers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <Lock size={48} strokeWidth={1} className="text-slate-300 mb-4" />
                                    <p className="text-slate-500 text-sm">No lockers found</p>
                                </div>
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 mb-8">
                                    {lockers.map((locker) => {
                                        const isAvailable = locker.status === 'Available';
                                        const isAssigned = locker.status === 'Assigned';
                                        const isMaintenance = locker.status === 'Maintenance';
                                        const isReserved = locker.status === 'Reserved';

                                        let bgClass = "bg-white border-slate-200";
                                        let dotClass = "bg-slate-300";
                                        let textClass = "text-slate-700";

                                        if (isAvailable) { bgClass = "bg-green-50 border-green-200"; dotClass = "bg-green-500"; textClass = "text-green-700"; }
                                        if (isAssigned) { bgClass = "bg-slate-100 border-slate-300"; dotClass = "bg-slate-500"; textClass = "text-slate-800"; }
                                        if (isMaintenance) { bgClass = "bg-orange-50 border-orange-200"; dotClass = "bg-orange-400"; textClass = "text-orange-600"; }
                                        if (isReserved) { bgClass = "bg-blue-50 border-blue-200"; dotClass = "bg-blue-400"; textClass = "text-blue-600"; }

                                        return (
                                            <div
                                                key={locker.id}
                                                onClick={() => openDrawer('details', locker)}
                                                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border ${bgClass} cursor-pointer hover:shadow-md transition-shadow`}
                                            >
                                                <div className={`w-2 h-2 rounded-full absolute top-2 right-2 ${dotClass}`} />
                                                <Lock size={20} className={`mb-2 ${textClass} opacity-80`} strokeWidth={1.5} />
                                                <span className={`text-sm font-semibold ${textClass}`}>{locker.number}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="saas-table-wrapper border-0 rounded-none">
                                    <table className="saas-table saas-table-responsive">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Number</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Size</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Area</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {lockers.map(locker => (
                                                <tr key={locker.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => openDrawer('details', locker)}>
                                                    <td className="px-6 py-4 font-bold text-slate-900" data-label="Number">
                                                        <div className="flex justify-end sm:justify-start">
                                                            {locker.number}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium" data-label="Size">
                                                        <div className="flex justify-end sm:justify-start">
                                                            {locker.size}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 font-medium" data-label="Area">
                                                        <div className="flex justify-end sm:justify-start">
                                                            {locker.area || '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4" data-label="Status">
                                                        <div className="flex justify-end sm:justify-start">
                                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${locker.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                                locker.status === 'Assigned' ? 'bg-slate-200 text-slate-700' :
                                                                    locker.status === 'Maintenance' ? 'bg-orange-100 text-orange-700' :
                                                                        'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                {locker.status}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {viewMode === 'grid' && lockers.length > 0 && (
                                <div className="flex items-center justify-start gap-6 pt-4 mt-8 border-t border-slate-100 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                        <span className="text-xs text-slate-500">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                        <span className="text-xs text-slate-500">Assigned</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                                        <span className="text-xs text-slate-500">Maintenance</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                        <span className="text-xs text-slate-500">Reserved</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'Assigned' && (
                        <div className="saas-table-wrapper border-0 rounded-none">
                            <table className="saas-table saas-table-responsive">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Locker No.</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Assigned Member</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Member ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Phone</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {lockers.filter(l => l.status === 'Assigned').map(locker => (
                                        <tr key={locker.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => openDrawer('details', locker)}>
                                            <td className="px-6 py-4 font-bold text-slate-900" data-label="Locker No.">
                                                <div className="flex justify-end sm:justify-start">
                                                    {locker.number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-700" data-label="Assigned Member">
                                                <div className="flex justify-end sm:justify-start">
                                                    {locker.assignedTo?.name || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 font-medium" data-label="Member ID">
                                                <div className="flex justify-end sm:justify-start">
                                                    {locker.assignedTo?.memberId || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 font-medium" data-label="Phone">
                                                <div className="flex justify-end sm:justify-start">
                                                    {locker.assignedTo?.phone || '-'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {lockers.filter(l => l.status === 'Assigned').length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-500 pointer-events-none" data-label="Phone">
                                                No assigned lockers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Drawers */}
                <RightDrawer
                    isOpen={!!drawerType}
                    onClose={closeDrawer}
                    title={
                        drawerType === 'add' ? 'Add New Locker' :
                            drawerType === 'bulk' ? 'Bulk Create Lockers' :
                                'Locker Details'
                    }
                >
                    {drawerType === 'add' && (
                        <AddLockerDrawer
                            onClose={closeDrawer}
                            onSuccess={loadData}
                        />
                    )}
                    {drawerType === 'bulk' && (
                        <BulkCreateLockersDrawer
                            onClose={closeDrawer}
                            onSuccess={loadData}
                        />
                    )}
                    {drawerType === 'details' && (
                        <LockerDetailsDrawer
                            locker={selectedLocker}
                            onClose={closeDrawer}
                            onSuccess={loadData}
                        />
                    )}
                </RightDrawer>
            </div>
        </div>
    );
};

export default LockerManagement;
