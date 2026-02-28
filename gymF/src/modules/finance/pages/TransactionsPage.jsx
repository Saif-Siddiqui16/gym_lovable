import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Download,
    Calendar,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    CreditCard,
    Smartphone,
    Building,
    Banknote,
    Receipt,
    MoreHorizontal,
    FileText,
    History
} from 'lucide-react';
import { fetchTransactions } from '../../../api/finance/financeApi';
import { useBranchContext } from '../../../context/BranchContext';
import toast from 'react-hot-toast';

const Payments = () => {
    const { selectedBranch } = useBranchContext();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ transactions: [], stats: { todayCollection: 0, filteredTotal: 0, completed: 0, pending: 0 } });

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [methodFilter, setMethodFilter] = useState('All Methods');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const loadPayments = async () => {
        try {
            setLoading(true);
            const res = await fetchTransactions({
                branchId: selectedBranch,
                search: searchTerm,
                method: methodFilter,
                status: statusFilter,
                startDate,
                endDate
            });
            setData(res);
        } catch (error) {
            console.error("Failed to load payments", error);
            toast.error("Failed to sync payments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPayments();
    }, [selectedBranch, methodFilter, statusFilter, startDate, endDate]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            loadPayments();
        }
    };

    const getMethodIcon = (method) => {
        switch (method) {
            case 'Card': return CreditCard;
            case 'UPI': return Smartphone;
            case 'Bank Transfer': return Building;
            default: return Banknote;
        }
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen p-4 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payments</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage and monitor all payment transactions</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                    <Download size={18} /> Export
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-8 space-y-6">
                <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                    <Filter size={14} /> Filters
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Search */}
                    <div className="md:col-span-5 relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search member, code, or invoice..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all"
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="md:col-span-3 relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            placeholder="Select dates"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all"
                        />
                    </div>

                    {/* Method Filter */}
                    <div className="md:col-span-2 relative">
                        <select
                            value={methodFilter}
                            onChange={(e) => setMethodFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
                        >
                            <option>All Methods</option>
                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Card</option>
                            <option>Bank Transfer</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Status Filter */}
                    <div className="md:col-span-2 relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
                        >
                            <option>All Status</option>
                            <option>Paid</option>
                            <option>Unpaid</option>
                            <option>Partial</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Today's Collection */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex justify-between items-center group hover:bg-orange-50 transition-all duration-500">
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Today's Collection</p>
                        <h2 className="text-3xl font-black text-orange-600">₹{data.stats.todayCollection.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shadow-sm">
                        <TrendingUp size={24} />
                    </div>
                </div>

                {/* Filtered Total */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex justify-between items-center group hover:bg-emerald-50 transition-all duration-500">
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Filtered Total</p>
                        <h2 className="text-3xl font-black text-emerald-600">₹{data.stats.filteredTotal.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-sm">
                        <History size={24} />
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex justify-between items-center group hover:bg-blue-50 transition-all duration-500">
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Completed</p>
                        <h2 className="text-3xl font-black text-slate-900 font-roboto">₹{data.stats.completed.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                        <CheckCircle2 size={24} />
                    </div>
                </div>

                {/* Pending */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex justify-between items-center group hover:bg-blue-50 transition-all duration-500">
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending</p>
                        <h2 className="text-3xl font-black text-blue-600">₹{data.stats.pending.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-sm">
                        <Clock size={24} />
                    </div>
                </div>
            </div>

            {/* Recent Payments Panel */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-900">Recent Payments ({data.transactions.length})</h3>
                    <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                                <th className="px-8 py-5">Member</th>
                                <th className="px-8 py-5">Transaction Code</th>
                                <th className="px-8 py-5">Date & Time</th>
                                <th className="px-8 py-5">Method</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {!loading && data.transactions.map((txn, idx) => {
                                const MethodIcon = getMethodIcon(txn.method);
                                return (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-black text-xs">
                                                    {txn.member[0]}
                                                </div>
                                                <span className="text-sm font-black text-slate-900">{txn.member}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-lg uppercase tracking-widest">{txn.id}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900">{new Date(txn.date).toLocaleDateString()}</span>
                                                <span className="text-[10px] text-slate-400 font-bold">{new Date(txn.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <MethodIcon size={16} className="text-slate-400" />
                                                <span className="text-xs font-bold">{txn.method}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-slate-900">₹{txn.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${txn.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                {txn.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                {txn.status === 'Paid' ? 'Completed' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all shadow-sm">
                                                <Receipt size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {loading && (
                        <div className="h-[300px] flex items-center justify-center opacity-30">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {!loading && data.transactions.length === 0 && (
                        <div className="h-[300px] flex flex-col items-center justify-center text-center px-8 opacity-30">
                            <History size={64} className="text-slate-300 mb-6" />
                            <h4 className="text-xl font-black text-slate-900 italic">Recent Payments (0)</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payments;
