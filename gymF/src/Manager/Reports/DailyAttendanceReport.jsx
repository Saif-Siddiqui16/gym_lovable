import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, UserCheck, UserMinus, Download, Filter, Search, MoreVertical, ChevronLeft, ChevronRight, Eye, Trash2, X, Clock, MapPin, Smartphone, ChevronDown, Check, Loader2, Activity, ScanLine } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import { exportCSV } from '../../api/manager/managerExport';
import RightDrawer from '../../components/common/RightDrawer';
import '../../styles/GlobalDesign.css';

// Reusable Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, icon: Icon, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative min-w-[160px]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-11 px-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${isOpen ? 'border-violet-500 ring-2 ring-violet-100 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    {Icon && <Icon size={16} className="text-gray-400" />}
                    <span className="font-medium truncate">{value === 'All' ? placeholder : value}</span>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-violet-500' : ''}`} />
            </button>

            <div className={`absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                <div className="py-1">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => { onChange(option); setIsOpen(false); }}
                            className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${value === option ? 'bg-violet-50 text-violet-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            {option === 'All' ? placeholder : option}
                            {value === option && <Check size={14} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DailyAttendanceReport = () => {
    const getToday = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getToday());
    const [typeFilter, setTypeFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState({ totalToday: 0, membersToday: 0, staffToday: 0 });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [showFilters, setShowFilters] = useState(true); // Default open for better visibility
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        loadData();
    }, [selectedDate, typeFilter, searchTerm, currentPage]);

    const loadData = async () => {
        try {
            setLoading(true);
            const params = {
                search: searchTerm,
                type: typeFilter,
                date: selectedDate,
                page: currentPage,
                limit: itemsPerPage
            };

            const response = await apiClient.get('/branch-admin/reports/attendance', { params });

            setAttendance(response.data.data || []);
            setTotalItems(response.data.total || 0);
            if (response.data.stats) {
                setAttendanceStats(response.data.stats);
            }
        } catch (error) {
            console.error('Attendance Load Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        if (attendance.length === 0) {
            alert("No data to export");
            return;
        }
        const headers = ["Name", "Type", "Check-In", "Check-Out", "Status"];
        const csvContent = [
            headers.join(","),
            ...attendance.map(row => [
                `"${row.name}"`,
                `"${row.type}"`,
                `"${row.checkIn}"`,
                `"${row.checkOut}"`,
                `"${row.status}"`
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `attendance_report_${selectedDate}.csv`;
        link.click();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this attendance record?')) {
            try {
                await apiClient.delete(`/admin/attendance/${id}`);
                toast.success('Record removed successfully');
                loadData();
            } catch (error) {
                console.error('Delete Error:', error);
                toast.error(error.response?.data?.message || 'Failed to remove record');
            }
        }
    };

    const handleCheckOut = async (id, memberId) => {
        try {
            // Using the endpoint from memberCheckInApi if available, or direct apiClient call
            await apiClient.post('/staff/attendance/check-out', { memberId: memberId || id });
            toast.success('Successfully checked out');
            loadData();
        } catch (error) {
            console.error('Check-out Error:', error);
            toast.error(error.response?.data?.message || 'Check-out failed');
        }
    };

    const handleViewDetails = (entry) => {
        setSelectedEntry(entry);
        setIsViewModalOpen(true);
    };

    const stats = [
        { label: 'In', value: attendance.filter(a => a.status === 'checked-in').length, icon: Activity, color: 'from-emerald-500 to-emerald-600' },
        { label: 'Today', value: attendanceStats.totalToday, icon: Users, color: 'from-violet-500 to-purple-600' },
        { label: 'Out', value: attendanceStats.staffToday, icon: Clock, color: 'from-slate-400 to-slate-500' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-6 md:p-8">
            {/* Header Section */}
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl blur-2xl opacity-10 animate-pulse pointer-events-none"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-6">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Attendance</h1>
                    <p className="text-slate-600 text-sm font-medium mt-1">Quick check-in / check-out</p>
                </div>
            </div>

            {/* KPI Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between group transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-0.5">
                        <div className="flex items-start justify-between w-full">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Section */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 mb-8 flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Scan barcode or type member code / name / phone..."
                        className="pl-10 h-11 w-full rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm transition-all bg-white outline-none text-slate-800"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={() => loadData()}
                        className="flex-1 md:flex-none px-6 h-11 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-violet-500/30 transition-all active:scale-95"
                    >
                        Search
                    </button>
                    <div className="relative flex-1 md:flex-none">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="date"
                            className="w-full pl-9 h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-violet-500 text-sm font-medium transition-all bg-white outline-none"
                            value={selectedDate}
                            onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                </div>
            </div>

            {/* Currently In Section */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight flex items-center gap-2">
                        Currently In ({attendance.filter(a => a.status === 'checked-in').length})
                    </h2>
                </div>

                {attendance.filter(a => a.status === 'checked-in').length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {attendance.filter(a => a.status === 'checked-in').map((member) => (
                            <div key={member.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-violet-200 transition-all group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-lg group-hover:bg-violet-600 group-hover:text-white transition-all">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 leading-none mb-1 truncate">{member.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{member.memberId || 'MEM-001'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCheckOut(member.id, member.memberId)}
                                    className="w-full py-2 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:border-red-100 border border-transparent active:scale-95"
                                >
                                    Check Out
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border-2 border-dashed border-gray-100 rounded-xl py-12 flex flex-col items-center justify-center">
                        <UserMinus size={32} className="text-gray-200 mb-2" />
                        <p className="text-gray-400 font-bold text-sm">No members currently checked in</p>
                    </div>
                )}
            </div>

            {/* Today's Log Table Section */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight mb-6">
                    Today's Log ({totalItems})
                </h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="saas-table-wrapper">
                        <table className="saas-table">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Check-In</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium lowercase">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin text-violet-600" />
                                                Processing request...
                                            </div>
                                        </td>
                                    </tr>
                                ) : attendance.length > 0 ? (
                                    attendance.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xs group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                                                        {(row.name || '?').charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{row.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.memberId || 'MEM-001'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.time || row.checkIn}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.duration || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                                                    <button onClick={() => handleViewDetails(row)} className="p-1.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-gray-400 font-medium">
                                            No members currently checked in
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!loading && totalItems > 0 && (
                        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all text-xs font-bold text-gray-600"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems / itemsPerPage)))}
                                    disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all text-xs font-bold text-gray-600"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* View Details Drawer */}
            <RightDrawer
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Log Details"
                subtitle="Attendance data overview"
                width="400px"
            >
                {selectedEntry && (
                    <div className="px-6 py-4 space-y-6">
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl font-bold text-gray-800 mb-4 border border-gray-100">
                                {(selectedEntry.name || '?').charAt(0)}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 leading-none mb-1">{selectedEntry.name}</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedEntry.memberId || 'MEM-001'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-In</p>
                                <p className="text-sm font-bold text-gray-800">{selectedEntry.time || selectedEntry.checkIn || '-'}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-Out</p>
                                <p className="text-sm font-bold text-gray-800">{selectedEntry.checkOut || '-'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsViewModalOpen(false)}
                            className="w-full py-3.5 bg-violet-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-violet-700 transition-all active:scale-95 shadow-sm shadow-violet-100"
                        >
                            Close Details
                        </button>
                    </div>
                )}
            </RightDrawer>
        </div>
    );
};

export default DailyAttendanceReport;
