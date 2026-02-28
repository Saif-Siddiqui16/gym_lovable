import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users, CheckCircle, FileText, Banknote, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { fetchStaffAPI } from '../../../api/admin/adminApi';

const Payroll = () => {
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Employees');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchStaffAPI();
                if (Array.isArray(data) && data.length > 0) {
                    setStaffList(data);
                } else {
                    // Fallback to mock data so UI is visible during demo
                    setStaffList([
                        { id: 1, name: 'Sarah Connor', email: 'sarah@gym.com', department: 'Management', role: 'MANAGER', baseSalary: 45000, status: 'Active' },
                        { id: 2, name: 'Mike Tyson', email: 'mike@gym.com', department: 'Training', role: 'TRAINER', baseSalary: 35000, status: 'Active' },
                        { id: 3, name: 'John Doe', email: 'john@gym.com', department: 'Operations', role: 'STAFF', baseSalary: 25000, status: 'Inactive' }
                    ]);
                }
            } catch (error) {
                console.error("Error loading staff:", error);
                // Also fallback to mock data on error for demo purposes
                setStaffList([
                    { id: 1, name: 'Sarah Connor', email: 'sarah@gym.com', department: 'Management', role: 'MANAGER', baseSalary: 45000, status: 'Active' },
                    { id: 2, name: 'Mike Tyson', email: 'mike@gym.com', department: 'Training', role: 'TRAINER', baseSalary: 35000, status: 'Active' },
                    { id: 3, name: 'John Doe', email: 'john@gym.com', department: 'Operations', role: 'STAFF', baseSalary: 25000, status: 'Inactive' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredStaff = staffList.filter(s =>
        (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.role || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeCount = staffList.filter(s => s.status === 'Active').length;
    // mock values for contracts and payroll as they aren't explicitly in staff data for now, just static or derived
    const mockActiveContracts = staffList.length > 0 ? staffList.length - 1 : 0;
    const mockMonthlyPayroll = staffList.length * 25000;

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50/30 min-h-screen p-6 md:p-8 font-sans pb-24">
            {/* Header section matching exact text */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                            Human Resources
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Manage employees, contracts, attendance & payroll</p>
                    </div>
                    <button
                        onClick={() => navigate('/hr/staff/create')}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        <Plus size={20} strokeWidth={3} />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Stats Cards Exact text */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Employees</p>
                            <h3 className="text-2xl font-black text-slate-800">{staffList.length}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active</p>
                            <h3 className="text-2xl font-black text-slate-800">{activeCount}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Contracts</p>
                            <h3 className="text-2xl font-black text-slate-800">{mockActiveContracts}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                            <Banknote size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Payroll</p>
                            <h3 className="text-2xl font-black text-slate-800">₹{mockMonthlyPayroll.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Exact text */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
                    {['Employees', 'Contracts', 'Attendance', 'Payroll'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Employees Section Exact text */}
            {activeTab === 'Employees' && (
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-black text-slate-800">All Employees</h2>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-all group-focus-within:text-indigo-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 shadow-sm transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-[32px] shadow-sm border border-white/50 overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Employee</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Code</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Department</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Position</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Salary</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                        <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="py-16 text-center text-sm font-bold text-slate-400">Loading...</td>
                                        </tr>
                                    ) : filteredStaff.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-24 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <h3 className="text-xl font-black text-slate-800">No employees found</h3>
                                                    <p className="text-slate-500 text-sm mt-2 font-medium">There are no employees matching the criteria.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredStaff.map((staff, idx) => (
                                            <tr key={staff.id || idx} className="group hover:bg-white transition-all duration-300">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                                                            {staff.name ? staff.name.charAt(0) : '?'}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-800 text-sm whitespace-nowrap leading-tight">{staff.name}</div>
                                                            <div className="text-xs text-slate-500 font-medium mt-1">{staff.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-semibold text-slate-600">
                                                    EMP-{staff.id ? String(staff.id).padStart(3, '0') : String(idx + 1).padStart(3, '0')}
                                                </td>
                                                <td className="px-8 py-6 text-sm font-medium text-slate-600">
                                                    {staff.department || 'Operations'}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 whitespace-nowrap">
                                                        {staff.role}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-slate-800">
                                                    ₹{staff.baseSalary ? staff.baseSalary.toLocaleString() : '25,000'}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{staff.status || 'Unknown'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Payroll Tab UI */}
            {activeTab === 'Payroll' && (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header: Payroll Processing */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Payroll Processing</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">Select month to process</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <input
                                    type="month"
                                    defaultValue="2026-02"
                                    className="h-10 pl-4 pr-10 rounded-lg border border-slate-200 focus:border-slate-300 focus:ring-4 focus:ring-slate-100 text-sm font-medium text-slate-700 bg-slate-50 outline-none transition-all cursor-pointer w-[200px]"
                                />
                            </div>
                            <button className="flex items-center gap-2 h-10 px-6 bg-[#f97316] text-white rounded-lg font-bold text-sm tracking-wide hover:bg-[#ea580c] active:scale-95 transition-all shadow-sm">
                                <span className="font-serif italic font-medium">$</span> Process All
                            </button>
                        </div>
                    </div>

                    {/* Payroll Data Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mt-6">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">Employee</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">Days</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">Base Pay</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">PT Commission</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">Gross</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">PF (12%)</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 whitespace-nowrap">Net Pay</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    {/* Empty State for Payroll Details */}
                                    <tr>
                                        <td colSpan="8" className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Banknote size={48} className="text-slate-300 mb-4 stroke-1" />
                                                <p className="text-slate-400 font-medium text-sm">No active employees for payroll</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payroll Summary Section */}
                    <div className="bg-slate-50 rounded-xl p-6 mt-6 border border-slate-100">
                        <h3 className="text-base font-bold text-slate-800 mb-6">Payroll Summary - February 2026</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 gap-y-8">
                            <div>
                                <p className="text-xs font-medium text-slate-400 mb-1">Pro-rated Base</p>
                                <p className="text-xl font-black text-slate-800">₹0</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 mb-1">PT Commission</p>
                                <p className="text-xl font-black text-emerald-500">+₹0</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 mb-1">Gross Pay</p>
                                <p className="text-xl font-black text-slate-800">₹0</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 mb-1">Total Deductions</p>
                                <p className="text-xl font-black text-rose-500">-₹0</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 mb-1">Net Payable</p>
                                <p className="text-xl font-black text-emerald-500">₹0</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contracts Tab UI */}
            {activeTab === 'Contracts' && (
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-black text-slate-800">All Contracts</h2>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-[32px] shadow-sm border border-white/50 overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Employee</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Type</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Start Date</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">End Date</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Base Salary</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Commission %</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    <tr>
                                        <td colSpan="7" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <FileText size={32} />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800">No contracts found</h3>
                                                <p className="text-slate-500 text-sm mt-2 font-medium">There are no contracts matching the criteria.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendance Tab UI */}
            {activeTab === 'Attendance' && (
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-black text-slate-800">All Attendance</h2>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-[32px] shadow-sm border border-white/50 overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Employee</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Date</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Check In</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Check Out</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Total Hours</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <CheckCircle size={32} />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-800">No attendance records found</h3>
                                                <p className="text-slate-500 text-sm mt-2 font-medium">There are no attendance records to display.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payroll;
