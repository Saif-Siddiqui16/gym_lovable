import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Download,
    Plus,
    Calendar,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ReceiptText,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    Filter,
    X,
    Upload,
    CheckCircle2
} from 'lucide-react';
import { fetchFinanceStats, addExpense } from '../../../api/finance/financeApi';
import { useBranchContext } from '../../../context/BranchContext';
import toast from 'react-hot-toast';
import RightDrawer from '../../../components/common/RightDrawer';

const FinancialDashboard = () => {
    const { selectedBranch } = useBranchContext();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('income'); // income, expenses
    const [isExpenseDrawerOpen, setIsExpenseDrawerOpen] = useState(false);

    // Form data for adding expense
    const [expenseForm, setExpenseForm] = useState({
        title: '',
        category: '',
        amount: '',
        description: '',
        vendor: '',
        date: new Date().toISOString().split('T')[0]
    });

    const loadData = async () => {
        try {
            setLoading(true);
            const stats = await fetchFinanceStats(selectedBranch);
            setData(stats);
        } catch (error) {
            console.error("Failed to load finance stats", error);
            toast.error("Failed to sync financial data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [selectedBranch]);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            await addExpense(expenseForm);
            toast.success("Expense recorded successfully!");
            setIsExpenseDrawerOpen(false);
            setExpenseForm({
                title: '',
                category: '',
                amount: '',
                description: '',
                vendor: '',
                date: new Date().toISOString().split('T')[0]
            });
            loadData(); // Refresh overview
        } catch (error) {
            toast.error(error.message || "Failed to add expense");
        }
    };

    if (loading && !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Financial Core...</p>
            </div>
        );
    }

    const { summary, monthlyData, transactions } = data || {
        summary: { totalIncome: 0, totalExpenses: 0, netProfit: 0, margin: 0 },
        monthlyData: [],
        transactions: []
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen p-4 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Finance Dashboard</h1>
                    <p className="text-slate-500 text-sm font-medium">Track income, expenses and financial health</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setIsExpenseDrawerOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#7c3aed] text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-200 hover:bg-[#6d28d9] transition-all"
                    >
                        <Plus size={18} /> Add Expense
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                        <Download size={18} /> Export CSV
                    </button>
                    <div className="relative group">
                        <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <button className="flex items-center justify-center gap-2 pl-10 pr-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                            Feb 1 - Feb 28, 2026 <X size={14} className="ml-2 text-slate-300" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Revenue Report Chart Section */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900">Revenue Report</h3>
                            <p className="text-slate-400 text-xs font-bold">Monthly earnings vs expenses</p>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[300px] flex items-end justify-between gap-4 px-4 pb-8">
                        {monthlyData.map((m, idx) => {
                            const maxVal = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses))) || 1;
                            const incomePercent = (m.income / maxVal) * 100;
                            const expensePercent = (m.expenses / maxVal) * 100;

                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div className="w-full flex justify-center gap-1 h-[200px] items-end">
                                        {/* Income Bar */}
                                        <div
                                            className="w-3 bg-violet-500 rounded-full transition-all duration-700 hover:w-4 cursor-help relative"
                                            style={{ height: `${Math.max(5, incomePercent)}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-all">
                                                ₹{m.income.toLocaleString()}
                                            </div>
                                        </div>
                                        {/* Expense Bar */}
                                        <div
                                            className="w-3 bg-slate-200 rounded-full transition-all duration-700 hover:w-4 cursor-help relative"
                                            style={{ height: `${Math.max(5, expensePercent)}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-all">
                                                ₹{m.expenses.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Summary Card (Budget 2026) */}
                <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-lg font-black text-slate-900">2026 Budget</h3>
                        <p className="text-slate-400 text-xs font-bold">Financial summary</p>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-slate-900 mb-2">₹{summary.totalIncome.toLocaleString()}</h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Income</p>
                    </div>

                    <div className="w-full h-px bg-slate-100 mb-12 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-violet-600 transition-all duration-1000" style={{ width: '100%' }}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-emerald-100 text-center">
                            <h4 className="text-emerald-700 text-base font-black">₹{summary.netProfit.toLocaleString()}</h4>
                            <p className="text-[#15803d] text-[10px] font-bold uppercase tracking-widest mt-1">Net Profit</p>
                        </div>
                        <div className="bg-[#fef2f2] p-4 rounded-2xl border border-red-100 text-center">
                            <h4 className="text-red-700 text-base font-black">₹{summary.totalExpenses.toLocaleString()}</h4>
                            <p className="text-red-700 text-[10px] font-bold uppercase tracking-widest mt-1">Expenses</p>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <ArrowUpRight size={18} />
                            <span className="text-sm font-black">{summary.margin}% margin</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Left Panel: Recent Transactions Table */}
                <div className="lg:col-span-4 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden h-[500px]">
                    <div className="p-8 pb-4">
                        <h3 className="text-lg font-black text-slate-900">Recent Transactions</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-hide">
                        {transactions.length > 0 ? (
                            <div className="space-y-4">
                                {transactions.map((txn, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-violet-600 shadow-sm transition-colors border border-slate-100">
                                                <ReceiptText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{txn.member}</p>
                                                <p className="text-[10px] text-slate-400 font-bold">{txn.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-slate-900">₹{txn.amount.toLocaleString()}</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{txn.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-8">
                                <ReceiptText size={48} className="text-slate-400 mb-4" />
                                <p className="text-slate-500 font-black italic">No transactions yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Right Panel: Tabbed Income/Expenses */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden h-[500px]">
                    <div className="px-8 pt-8 flex items-center gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab('income')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'income' ? 'bg-violet-50 text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <ArrowUpRight size={16} /> Income ({transactions.filter(t => t.amount > 0).length})
                        </button>
                        <button
                            onClick={() => setActiveTab('expenses')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'expenses' ? 'bg-red-50 text-red-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <ArrowDownRight size={16} /> Expenses (0)
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto px-8 pb-8">
                        <h4 className="text-sm font-black text-slate-900 mb-2">Income Transactions</h4>
                        <p className="text-slate-400 text-xs font-bold mb-6">All income including memberships, POS sales, and other payments</p>

                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                                    <th className="pb-4 pr-4">Date</th>
                                    <th className="pb-4 pr-4">Type</th>
                                    <th className="pb-4 pr-4">Member</th>
                                    <th className="pb-4 pr-4 text-center">Invoice</th>
                                    <th className="pb-4 pr-4 text-center">Method</th>
                                    <th className="pb-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? transactions.map((txn, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 last:border-none group hover:bg-slate-50 transition-colors">
                                        <td className="py-4 pr-4 text-[10px] font-bold text-slate-500">{txn.date}</td>
                                        <td className="py-4 pr-4 text-xs font-black text-slate-900">{txn.type}</td>
                                        <td className="py-4 pr-4 text-xs font-bold text-slate-700">{txn.member}</td>
                                        <td className="py-4 pr-4 text-center">
                                            <span className="text-[10px] font-black text-slate-400 group-hover:text-violet-600 underline cursor-pointer">{txn.id}</span>
                                        </td>
                                        <td className="py-4 pr-4 text-center">
                                            <span className="inline-block px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                                {txn.method}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-xs font-black text-slate-900">₹{txn.amount.toLocaleString()}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center text-slate-400 font-bold italic opacity-40">No income transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Expense Drawer */}
            <RightDrawer
                isOpen={isExpenseDrawerOpen}
                onClose={() => setIsExpenseDrawerOpen(false)}
                title="Add Expense"
                subtitle="Record a new expense for approval"
            >
                <form onSubmit={handleAddExpense} className="space-y-8 p-1">
                    {/* File Upload Area */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Receipt (Optional)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-slate-400 hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                <Upload size={24} className="text-slate-300 group-hover:text-violet-500" />
                            </div>
                            <p className="text-xs font-bold text-slate-600">Click to upload receipt</p>
                            <p className="text-[10px] font-medium mt-1">Image or PDF up to 10MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category *</label>
                            <select
                                required
                                value={expenseForm.category}
                                onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all"
                            >
                                <option value="">Select category</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Rent">Rent</option>
                                <option value="Supplies">Supplies</option>
                                <option value="Salary">Salary</option>
                                <option value="Interat/Network">Internet/Network</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Amount (₹) *</label>
                            <input
                                type="number"
                                required
                                value={expenseForm.amount}
                                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                placeholder="5000"
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description *</label>
                        <textarea
                            required
                            value={expenseForm.description}
                            onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value, description: e.target.value })}
                            placeholder="Monthly electricity bill..."
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Vendor</label>
                            <input
                                type="text"
                                value={expenseForm.vendor}
                                onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                                placeholder="BSES Power"
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Expense Date</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="date"
                                    value={expenseForm.date}
                                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-violet-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsExpenseDrawerOpen(false)}
                            className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 bg-[#0f172a] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 size={16} /> Submit Expense
                        </button>
                    </div>
                </form>
            </RightDrawer>
        </div>
    );
};

export default FinancialDashboard;
