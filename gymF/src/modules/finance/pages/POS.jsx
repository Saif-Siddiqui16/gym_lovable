import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, User, Store, Package, Users, Info, ChevronDown, X, ReceiptText, Clock } from 'lucide-react';
import { getStoreProducts, checkoutStoreOrder, getCategories, getStoreStats } from '../../../api/storeApi';
import { membershipApi } from '../../../api/membershipApi';
import toast from 'react-hot-toast';

const POS = () => {
    // Data States
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [members, setMembers] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [todaySalesTotal, setTodaySalesTotal] = useState(0);

    // UI States
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState([]);

    // Customer States
    const [customerMode, setCustomerMode] = useState('search'); // 'search' or 'guest_form'
    const [selectedCustomer, setSelectedCustomer] = useState(null); // { type: 'member', data: memberObj } or { type: 'guest', data: { name, phone, email } }
    const [customerSearch, setCustomerSearch] = useState('');
    const [guestData, setGuestData] = useState({ name: '', phone: '', email: '' });
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const [productData, catData, memberData, statsData] = await Promise.all([
                getStoreProducts({ allStatus: 'false' }), // only active products
                getCategories(),
                membershipApi.getMembers(),
                getStoreStats()
            ]);

            setProducts(productData);
            setCategories(['All', ...catData.map(c => c.name)]);
            setMembers(memberData);
            setRecentSales(statsData.recentTransactions || []);
            setTodaySalesTotal(statsData.stats?.todayPos || 0);
        } catch (error) {
            console.error("Failed to load POS data", error);
            toast.error("Failed to sync with backend");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredProducts = products.filter(p =>
        (selectedCategory === 'All' || p.category === selectedCategory) &&
        (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase()))
    );

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        m.phone?.includes(customerSearch) ||
        m.memberId?.toLowerCase().includes(customerSearch.toLowerCase())
    );

    const addToCart = (product) => {
        if (product.stock <= 0) {
            toast.error("Item out of stock");
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.qty >= product.stock) {
                    toast.error("Stock limit reached");
                    return prev;
                }
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            toast.success(`${product.name} added to cart`);
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta;
                if (newQty > item.stock) {
                    toast.error("Stock limit reached");
                    return item;
                }
                return { ...item, qty: Math.max(0, newQty) };
            }
            return item;
        }).filter(item => item.qty > 0));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
        toast.error("Item removed from cart");
    };

    const handleCheckout = async () => {
        if (!selectedCustomer) {
            toast.error("Please select a customer or add a guest");
            return;
        }

        if (cart.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        try {
            const orderData = {
                memberId: selectedCustomer.type === 'member' ? selectedCustomer.data.id : null,
                guestInfo: selectedCustomer.type === 'guest' ? selectedCustomer.data : null,
                cartItems: cart.map(item => ({
                    id: item.id,
                    quantity: item.qty,
                    price: item.price
                })),
                totalAmount: cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
            };

            await checkoutStoreOrder(orderData);
            toast.success("Transaction completed successfully!");

            // Clean up
            setCart([]);
            setSelectedCustomer(null);
            setGuestData({ name: '', phone: '', email: '' });
            setCustomerMode('search');
            loadData(); // Refresh stock and recent sales
        } catch (error) {
            toast.error(error);
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
                <div className="w-10 h-10 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Sales Terminal...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen p-4 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Point of Sale</h1>
                <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-slate-900 font-black">Today's Sales: <span className="text-violet-600">₹{todaySalesTotal.toLocaleString()}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Product Selection */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-all" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-slate-400 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                        <div className="w-full sm:w-48">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none appearance-none cursor-pointer shadow-sm"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 min-h-[500px]">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        className="group cursor-pointer flex flex-col items-center text-center p-2 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                                    >
                                        <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-4 overflow-hidden relative border border-slate-100 group-hover:border-violet-200">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <Package size={40} />
                                                </div>
                                            )}
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black uppercase rounded-full">Low Stock</div>
                                            )}
                                            {product.stock === 0 && (
                                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                                                    <span className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-red-600 rounded-full">Sold Out</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 truncate w-full px-2">{product.name}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{product.category}</p>
                                        <p className="text-base font-black text-slate-900 mt-2">₹{product.price.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 opacity-30">
                                <Package size={64} className="text-slate-400 mb-4" />
                                <p className="text-slate-500 font-black italic">No products found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Customer & Cart */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Customer Selection Section */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <User size={18} className="text-slate-400" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Customer</h3>
                        </div>

                        {customerMode === 'search' ? (
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search by code, name, phone, email..."
                                        value={customerSearch}
                                        onChange={(e) => {
                                            setCustomerSearch(e.target.value);
                                            setShowCustomerDropdown(true);
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-slate-300"
                                    />
                                    {showCustomerDropdown && customerSearch.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 max-h-48 overflow-y-auto">
                                            {filteredMembers.map(member => (
                                                <div
                                                    key={member.id}
                                                    onClick={() => {
                                                        setSelectedCustomer({ type: 'member', data: member });
                                                        setCustomerSearch('');
                                                        setShowCustomerDropdown(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none"
                                                >
                                                    <p className="text-xs font-bold text-slate-900">{member.name}</p>
                                                    <p className="text-[10px] text-slate-500">{member.memberId || member.phone}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {!selectedCustomer ? (
                                    <button
                                        onClick={() => setCustomerMode('guest_form')}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100 border-dashed"
                                    >
                                        <Plus size={14} /> Walk-in Guest
                                    </button>
                                ) : (
                                    <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-violet-600 font-black text-[10px]">
                                                {selectedCustomer.type === 'member' ? 'M' : 'G'}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{selectedCustomer.type === 'member' ? selectedCustomer.data.name : selectedCustomer.data.name}</p>
                                                <p className="text-[9px] text-violet-600 font-black uppercase tracking-widest">{selectedCustomer.type === 'member' ? 'Member' : 'Guest Customer'}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-red-500">
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    placeholder="Guest Name"
                                    value={guestData.name}
                                    onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={guestData.phone}
                                    onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Email (optional)"
                                    value={guestData.email}
                                    onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (guestData.name && guestData.phone) {
                                                setSelectedCustomer({ type: 'guest', data: guestData });
                                                setCustomerMode('search');
                                            } else {
                                                toast.error("Name and Phone are required for guest");
                                            }
                                        }}
                                        className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black"
                                    >
                                        Apply Guest
                                    </button>
                                    <button
                                        onClick={() => setCustomerMode('search')}
                                        className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart Section */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col min-h-[300px]">
                        <div className="flex items-center gap-2 mb-6 px-2">
                            <ShoppingCart size={18} className="text-slate-400" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Cart ({cart.length})</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[400px] mb-6 space-y-4">
                            {cart.length > 0 ? (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 relative overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <Package size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-slate-900 truncate">{item.name}</p>
                                            <p className="text-[10px] text-violet-600 font-black mt-0.5">₹{item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-lg">
                                            <button onClick={() => updateQty(item.id, -1)} className="p-1 text-slate-400 hover:text-slate-900">
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-[10px] font-black text-slate-900 w-4 text-center">{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="p-1 text-slate-400 hover:text-slate-900">
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center opacity-20">
                                    <ShoppingCart size={48} className="text-slate-400 mb-2" />
                                    <p className="text-sm font-black italic">Cart is empty</p>
                                </div>
                            )}
                        </div>

                        {/* Checkout Footer */}
                        <div className="pt-6 border-t border-slate-100">
                            <div className="flex justify-between items-center mb-6 px-2">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Amount</p>
                                <p className="text-2xl font-black text-slate-900">₹{total.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0 || !selectedCustomer}
                                className="w-full py-4 bg-[#7c3aed] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-violet-200 hover:bg-[#6d28d9] transition-all disabled:opacity-30 disabled:shadow-none"
                            >
                                Process Checkout
                            </button>
                        </div>
                    </div>

                    {/* Recent Sales Section */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 px-2">
                            <Clock size={18} className="text-slate-400" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Recent Sales</h3>
                        </div>

                        <div className="space-y-4">
                            {recentSales.length > 0 ? (
                                recentSales.map((sale, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                                                <ReceiptText size={14} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">#ORD-{sale.id.slice(-4)}</p>
                                                <p className="text-[9px] text-slate-400 font-bold">{new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-black text-slate-900">₹{parseFloat(sale.amount).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-400 text-xs font-bold italic py-8">No sales today</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POS;
