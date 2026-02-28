import React, { useState, useEffect } from 'react';
import {
    FileText,
    Search,
    Filter,
    Plus,
    Calendar,
    TrendingUp,
    Users,
    Receipt,
    CheckCircle2,
    Clock,
    AlertCircle,
    X,
    Download,
    MoreHorizontal,
    Trash2,
    Eye,
    PlusCircle,
    ChevronDown
} from 'lucide-react';
import { fetchInvoices, addInvoice } from '../../../api/finance/financeApi';
import { useBranchContext } from '../../../context/BranchContext';
import RightDrawer from '../../../components/common/RightDrawer';
import toast from 'react-hot-toast';

const Invoices = () => {
    const { selectedBranch } = useBranchContext();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ invoices: [], stats: { clients: 0, totalInvoices: 0, paid: 0, unpaid: 0 } });
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

    // Create Invoice Form State
    const [invoiceForm, setInvoiceForm] = useState({
        memberId: '',
        dueDate: new Date().toISOString().split('T')[0],
        items: [{ description: '', quantity: 1, rate: 0 }],
        discount: 0,
        taxRate: 18,
        notes: ''
    });

    const loadInvoices = async () => {
        try {
            setLoading(true);
            const res = await fetchInvoices({
                branchId: selectedBranch,
                search: searchTerm,
                status: statusFilter
            });
            setData(res);
        } catch (error) {
            console.error("Failed to load invoices", error);
            toast.error("Failed to sync invoices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvoices();
    }, [selectedBranch, statusFilter]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            loadInvoices();
        }
    };

    const handleAddItem = () => {
        setInvoiceForm({
            ...invoiceForm,
            items: [...invoiceForm.items, { description: '', quantity: 1, rate: 0 }]
        });
    };

    const handleRemoveItem = (index) => {
        const newItems = invoiceForm.items.filter((_, i) => i !== index);
        setInvoiceForm({ ...invoiceForm, items: newItems });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...invoiceForm.items];
        newItems[index][field] = value;
        setInvoiceForm({ ...invoiceForm, items: newItems });
    };

    const calculateSubtotal = () => {
        return invoiceForm.items.reduce((acc, item) => acc + (parseFloat(item.rate || 0) * parseInt(item.quantity || 0)), 0);
    };

    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal - (parseFloat(invoiceForm.discount) || 0)) * (parseFloat(invoiceForm.taxRate) / 100);
    const totalAmount = subtotal - (parseFloat(invoiceForm.discount) || 0) + taxAmount;

    const handleSubmitInvoice = async (e) => {
        e.preventDefault();
        try {
            if (invoiceForm.items.some(item => !item.description || item.rate <= 0)) {
                return toast.error("Please fill all item details");
            }
            await addInvoice(invoiceForm);
            toast.success("Invoice created successfully!");
            setIsCreateDrawerOpen(false);
            setInvoiceForm({
                memberId: '',
                dueDate: new Date().toISOString().split('T')[0],
                items: [{ description: '', quantity: 1, rate: 0 }],
                discount: 0,
                taxRate: 18,
                notes: ''
            });
            loadInvoices();
        } catch (error) {
            toast.error(error.message || "Failed to create invoice");
        }
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen p-4 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Invoices</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage and track all invoices</p>
                </div>
                <button
                    onClick={() => setIsCreateDrawerOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#f97316] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-100 hover:bg-[#ea580c] transition-all w-full sm:w-auto"
                >
                    <Plus size={18} /> Create Invoice
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Clients Card */}
                <div className="bg-[#1e293b] rounded-[2rem] p-6 shadow-sm border border-slate-700/50 flex justify-between items-center group hover:bg-[#0f172a] transition-all">
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Clients</p>
                        <h2 className="text-3xl font-black text-white">{data.stats.clients}</h2>
                    </div>
                    <div className="w-12 h-12 bg-slate-700/50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        <Users size={24} />
                    </div>
                </div>

                {/* Total Invoices Card */}
                <div className="bg-[#3b82f6] rounded-[2rem] p-6 shadow-sm border border-blue-400/30 flex justify-between items-center group hover:bg-[#2563eb] transition-all">
                    <div>
                        <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1">Invoices</p>
                        <h2 className="text-3xl font-black text-white">{data.stats.totalInvoices}</h2>
                    </div>
                    <div className="w-12 h-12 bg-blue-400/30 rounded-2xl flex items-center justify-center text-blue-50 group-hover:text-white transition-colors">
                        <Receipt size={24} />
                    </div>
                </div>

                {/* Paid Card */}
                <div className="bg-[#10b981] rounded-[2rem] p-6 shadow-sm border border-emerald-400/30 flex justify-between items-center group hover:bg-[#059669] transition-all">
                    <div>
                        <p className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-1">Paid</p>
                        <h2 className="text-3xl font-black text-white">₹{data.stats.paid.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 bg-emerald-400/30 rounded-2xl flex items-center justify-center text-emerald-50 group-hover:text-white transition-colors">
                        <TrendingUp size={24} />
                    </div>
                </div>

                {/* Unpaid Card */}
                <div className="bg-[#f59e0b] rounded-[2rem] p-6 shadow-sm border border-amber-400/30 flex justify-between items-center group hover:bg-[#d97706] transition-all">
                    <div>
                        <p className="text-amber-100 text-[10px] font-black uppercase tracking-widest mb-1">Unpaid</p>
                        <h2 className="text-3xl font-black text-white">₹{data.stats.unpaid.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 bg-amber-400/30 rounded-2xl flex items-center justify-center text-amber-50 group-hover:text-white transition-colors">
                        <Clock size={24} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {/* Table Filter Bar */}
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search by invoice # or member name..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
                            >
                                <option>All Status</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                                <option>Overdue</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                                <th className="px-8 py-5">Invoice Number</th>
                                <th className="px-8 py-5">Client</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {!loading && data.invoices.map((inv, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
                                                <FileText size={16} />
                                            </div>
                                            <span className="text-sm font-black text-slate-900">{inv.invoiceNumber}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{inv.member?.name || 'Walk-in Guest'}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inv.member?.memberId || 'GUEST'}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-slate-900">₹{Number(inv.amount).toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-slate-500">{new Date(inv.dueDate).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                inv.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            {inv.status === 'Paid' ? <CheckCircle2 size={12} /> : inv.status === 'Overdue' ? <AlertCircle size={12} /> : <Clock size={12} />}
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {loading && (
                        <div className="p-24 flex flex-col items-center justify-center opacity-40">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500 font-black italic uppercase tracking-widest text-[10px]">Filtering Financial Records...</p>
                        </div>
                    )}

                    {!loading && data.invoices.length === 0 && (
                        <div className="p-24 flex flex-col items-center justify-center text-center opacity-30">
                            <Receipt size={64} className="text-slate-300 mb-6" />
                            <h3 className="text-xl font-black text-slate-900 mb-2">Invoice List</h3>
                            <p className="max-w-xs text-slate-500 text-sm font-medium">No records found matching your current filter.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Invoice Drawer */}
            <RightDrawer
                isOpen={isCreateDrawerOpen}
                onClose={() => setIsCreateDrawerOpen(false)}
                title="Create Invoice"
                subtitle="Generate a new tax invoice"
            >
                <form onSubmit={handleSubmitInvoice} className="p-6 space-y-8">
                    {/* Member Selection */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Member (optional)</label>
                        <select
                            value={invoiceForm.memberId}
                            onChange={(e) => setInvoiceForm({ ...invoiceForm, memberId: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
                        >
                            <option value="">Walk-in Customer</option>
                            {/* In real app, map over members */}
                            <option value="1">John Doe (M001)</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Due Date</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                required
                                value={invoiceForm.dueDate}
                                onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Line Items</label>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="flex items-center gap-1 text-[10px] font-black text-violet-600 bg-violet-50 px-3 py-1 rounded-lg hover:bg-violet-100 transition-all uppercase tracking-widest"
                            >
                                <PlusCircle size={14} /> Add Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {invoiceForm.items.map((item, idx) => (
                                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative group">
                                    {idx > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(idx)}
                                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                    <input
                                        placeholder="Description (e.g. Personal Training)"
                                        required
                                        value={item.description}
                                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-violet-500"
                                    />
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-1.5">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Qty</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Rate (₹)</span>
                                            <input
                                                type="number"
                                                value={item.rate}
                                                onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5 flex flex-col justify-end text-right pr-2">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Amount</span>
                                            <span className="text-xs font-black text-slate-900">₹{(item.quantity * item.rate).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tax and Discount */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Discount (₹)</label>
                            <input
                                type="number"
                                value={invoiceForm.discount}
                                onChange={(e) => setInvoiceForm({ ...invoiceForm, discount: e.target.value })}
                                placeholder="0"
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500 transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">GST Rate (%)</label>
                            <select
                                value={invoiceForm.taxRate}
                                onChange={(e) => setInvoiceForm({ ...invoiceForm, taxRate: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
                            >
                                <option value="0">0%</option>
                                <option value="5">5%</option>
                                <option value="12">12%</option>
                                <option value="18">18%</option>
                                <option value="28">28%</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notes</label>
                        <textarea
                            value={invoiceForm.notes}
                            onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
                            placeholder="Additional notes..."
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500 transition-all resize-none"
                        />
                    </div>

                    {/* Summary */}
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                            <span>GST ({invoiceForm.taxRate}%)</span>
                            <span>₹{taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-slate-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-slate-900">Total</span>
                            <span className="text-xl font-black text-slate-900">₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsCreateDrawerOpen(false)}
                            className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 bg-[#0f172a] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </RightDrawer>
        </div>
    );
};

export default Invoices;
