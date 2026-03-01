import React, { useState } from 'react';
import { Search, ShoppingCart, Package, User, Clock, ReceiptText, Filter, Plus, Minus, Trash2, X, Store, CreditCard, LayoutGrid } from 'lucide-react';

const POS = () => {
    // Static States (Zeroed as per requirements)
    const [todaySalesTotal] = useState(0);
    const [cart] = useState([]);
    const [categories] = useState(['All', 'Memberships', 'Supplements', 'Apparel', 'Accessories']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [customerSearch, setCustomerSearch] = useState('');
    const [showGuestForm, setShowGuestForm] = useState(false);
    const total = 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-8 space-y-8 animate-fadeIn">

            {/* Premium Header Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-10 pointer-events-none"></div>
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-violet-200 ring-4 ring-white">
                                <Store size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Point of Sale</h1>
                                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">
                                    Manage local sales and inventory terminal
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
                            <div className="px-6 py-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Today's Sales</p>
                                <p className="text-2xl font-black text-slate-900 leading-none">₹{todaySalesTotal}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Side: Product Terminal */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Search and Filters with premium styling */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-all pointer-events-none" size={22} />
                            <input
                                type="text"
                                placeholder="Search products by name or SKU..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-16 pl-14 pr-4 rounded-2xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-white font-sans placeholder:text-slate-300"
                            />
                        </div>
                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full h-16 px-6 appearance-none rounded-2xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-bold transition-all outline-none bg-white cursor-pointer pr-14 font-sans text-slate-700"
                            >
                                {categories.map(cat => <option key={cat}>{cat}</option>)}
                            </select>
                            <Filter className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    {/* Product Grid Area - Enhanced Background */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] shadow-sm border border-slate-100 p-10 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 opacity-20"></div>
                        <div className="flex flex-col items-center gap-8 animate-pulse text-center max-w-sm">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-100 rounded-[2.5rem] blur-xl opacity-50"></div>
                                <div className="relative w-28 h-28 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center text-slate-200">
                                    <Package size={56} strokeWidth={1.5} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">No products found</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed">
                                    Your store inventory is currently empty. <br />Add products to start generating revenue.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Checkout Console */}
                <div className="lg:col-span-4 flex flex-col gap-8">

                    {/* Customer Picker with Staff Dashboard aesthetic */}
                    <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-slate-100 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-200">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 tracking-tight uppercase tracking-tight">Customer</h3>
                                <p className="text-violet-500 text-[10px] font-black uppercase tracking-widest mt-0.5">Sale Assignment</p>
                            </div>
                        </div>

                        {showGuestForm ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guest Info</p>
                                    <input
                                        type="text"
                                        placeholder="Enter guest name"
                                        className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 text-sm font-semibold bg-slate-50/30 outline-none transition-all font-sans placeholder:text-slate-300"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 text-sm font-semibold bg-slate-50/30 outline-none transition-all font-sans placeholder:text-slate-300"
                                />
                                <input
                                    type="email"
                                    placeholder="Email address (optional)"
                                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 text-sm font-semibold bg-slate-50/30 outline-none transition-all font-sans placeholder:text-slate-300"
                                />
                                <button
                                    onClick={() => setShowGuestForm(false)}
                                    className="w-full h-11 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                >
                                    Cancel Selection
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-violet-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search members by code..."
                                        value={customerSearch}
                                        onChange={(e) => setCustomerSearch(e.target.value)}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold bg-slate-50/30 outline-none transition-all font-sans"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowGuestForm(true)}
                                    className="w-full h-14 flex items-center justify-center gap-3 bg-white text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-violet-200 transition-all border-2 border-dashed border-slate-100 group"
                                >
                                    <Plus size={16} className="text-slate-300 group-hover:text-violet-500" /> Walk-in Guest
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Cart Control with Premium Branding */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 flex flex-col min-h-[450px]">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
                                    <ShoppingCart size={24} />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Cart Console</h3>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">0 Items Selected</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center opacity-30 py-10 scale-90">
                            <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200 mb-6 shadow-inner">
                                <ShoppingCart size={40} strokeWidth={1} />
                            </div>
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">Cart is currently empty</p>
                        </div>

                        <div className="mt-8 pt-8 border-t-2 border-slate-50">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Payable</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-slate-400 font-bold text-sm">₹</span>
                                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{total}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">Awaiting Items</span>
                                </div>
                            </div>
                            <button className="w-[85%] mx-auto h-10 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center justify-center gap-3 cursor-not-allowed border border-slate-100">
                                <CreditCard size={16} />
                                Process Checkout
                            </button>
                        </div>
                    </div>

                    {/* Recent Transactions with Glass Style */}
                    <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-slate-100 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 shadow-sm">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Today's Log</h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Recent Sales activity</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center py-10 opacity-30">
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-100 mb-4 animate-spin-slow">
                                <ReceiptText size={28} />
                            </div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">No sales activity yet</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default POS;
