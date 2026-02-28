import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Download, ChevronRight, Eye, Calendar, Clock, CheckCircle, Plus, Users, User, SearchIcon, ReceiptText } from 'lucide-react';
import { getStoreOrders } from '../../api/storeApi';
import toast from 'react-hot-toast';

const StoreOrders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getStoreOrders();
            setOrders(data);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(o => {
        const matchesSearch = (o.memberName || 'Guest').toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toString().includes(searchTerm);
        const matchesStatus = filterStatus === '' || o.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-[#f9fafb] p-4 sm:p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <ShoppingCart className="text-slate-900" size={32} />
                        Store Orders
                    </h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Track and manage customer orders and sales</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Orders</p>
                    <h3 className="text-2xl font-black text-slate-900">{orders.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending</p>
                    <h3 className="text-2xl font-black text-amber-600">{orders.filter(o => o.status === 'Pending').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Completed</p>
                    <h3 className="text-2xl font-black text-emerald-600">{orders.filter(o => o.status === 'Completed').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Revenue</p>
                    <h3 className="text-2xl font-black text-violet-600">₹{orders.reduce((acc, o) => acc + parseFloat(o.totalAmount), 0).toLocaleString()}</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 appearance-none cursor-pointer"
                        >
                            <option value="">All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Processing">Processing</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-10 h-10 border-4 border-slate-100 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold animate-pulse">Fetching orders...</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest text-left">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOrders.map(o => (
                                    <tr key={o.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-black text-slate-900">#{o.id.toString().padStart(6, '0')}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <User size={14} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{o.member?.name || o.guestName || 'Guest'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-slate-300" />
                                                {new Date(o.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-500">{o.itemsCount} Items</td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-900">₹{parseFloat(o.totalAmount).toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight ${o.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : o.status === 'Processing' ? 'bg-blue-50 text-blue-600 border border-blue-100' : o.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-slate-900 transition-all">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                            <ReceiptText size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No orders found</h3>
                        <p className="text-slate-400 text-sm mt-1 mb-8">Customer orders will appear here once placed</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreOrders;
