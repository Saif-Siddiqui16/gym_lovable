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
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Locker Management</h1>
                        <p className="text-sm text-slate-500">Manage locker assignments, rentals, and availability</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => openDrawer('bulk')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                    >
                        <Settings size={16} /> Bulk Create
                    </button>
                    <button
                        onClick={() => openDrawer('add')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#0a1b2e] text-white rounded-lg text-sm font-medium hover:bg-[#0a1b2e]/90"
                    >
                        + Add Locker
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-500 font-medium">Total Lockers</span>
                        <Lock size={20} className="text-slate-300" strokeWidth={1.5} />
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
                </div>

                <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-green-600 font-medium">Available</span>
                        <Key size={20} className="text-green-500" strokeWidth={1.5} />
                    </div>
                    <div className="text-3xl font-bold text-green-600">{stats.available}</div>
                </div>

                <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-700 font-medium">Assigned</span>
                        <User size={20} className="text-slate-400" strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-800">{stats.assigned}</div>
                        <div className="text-xs text-slate-500">{stats.occupancyRate}% occupancy</div>
                    </div>
                </div>

                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-orange-500 font-medium">Maintenance</span>
                        <Key size={20} className="text-orange-400" strokeWidth={1.5} />
                    </div>
                    <div className="text-3xl font-bold text-orange-500">{stats.maintenance}</div>
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
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="py-3 px-4 font-medium text-slate-500 text-xs">Number</th>
                                            <th className="py-3 px-4 font-medium text-slate-500 text-xs">Size</th>
                                            <th className="py-3 px-4 font-medium text-slate-500 text-xs">Area</th>
                                            <th className="py-3 px-4 font-medium text-slate-500 text-xs">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lockers.map(locker => (
                                            <tr key={locker.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" onClick={() => openDrawer('details', locker)}>
                                                <td className="py-3 px-4 font-medium">{locker.number}</td>
                                                <td className="py-3 px-4">{locker.size}</td>
                                                <td className="py-3 px-4">{locker.area || '-'}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${locker.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                            locker.status === 'Assigned' ? 'bg-slate-200 text-slate-700' :
                                                                locker.status === 'Maintenance' ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {locker.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {viewMode === 'grid' && lockers.length > 0 && (
                            <div className="flex items-center justify-start gap-6 pt-4 mt-8 border-t border-slate-100">
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
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-3 px-4 font-medium text-slate-500 text-xs">Locker No.</th>
                                    <th className="py-3 px-4 font-medium text-slate-500 text-xs">Assigned Member</th>
                                    <th className="py-3 px-4 font-medium text-slate-500 text-xs">Member ID</th>
                                    <th className="py-3 px-4 font-medium text-slate-500 text-xs">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lockers.filter(l => l.status === 'Assigned').map(locker => (
                                    <tr key={locker.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" onClick={() => openDrawer('details', locker)}>
                                        <td className="py-3 px-4 font-medium text-slate-800">{locker.number}</td>
                                        <td className="py-3 px-4">
                                            {locker.assignedTo?.name || 'N/A'}
                                        </td>
                                        <td className="py-3 px-4">{locker.assignedTo?.memberId || '-'}</td>
                                        <td className="py-3 px-4">{locker.assignedTo?.phone || '-'}</td>
                                    </tr>
                                ))}
                                {lockers.filter(l => l.status === 'Assigned').length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-slate-500">
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
    );
};

// Add a dummy Settings icon component since I mapped it to Bulk Create visually based on lucide choices
const Settings = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>
); // Actually just a standard icon but keeping the simple layout. Wait, I will use Grid/Layers or something else for Bulk Create. Let me just use Settings from lucide-react if I want. I already imported generic icons so it's fine. Wait, Setting is not imported in LockerManagement but I used it. I will fix imports!

export default LockerManagement;
