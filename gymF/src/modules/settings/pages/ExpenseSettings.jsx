import React, { useState } from 'react';
import { DollarSign, Plus, Tag, FileText } from 'lucide-react';
import RightDrawer from '../../../components/common/RightDrawer';

const ExpenseSettings = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        // Handle creation logic here (backend skip for now)
        setIsDrawerOpen(false);
        setFormData({ name: '', description: '' });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto font-sans animate-in fade-in duration-500">
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                            <DollarSign size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2">
                                Expense Categories
                            </h1>
                            <p className="text-slate-500 text-sm font-medium">
                                Manage expense categories for financial tracking
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-100 self-start sm:self-center active:scale-95"
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                </div>

                {/* Empty State */}
                <div className="py-24 flex flex-col items-center justify-center text-center">
                    <div className="p-4 rounded-full bg-slate-50 mb-4">
                        <DollarSign size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-medium italic">No expense categories found</p>
                    <p className="text-slate-300 text-[10px] uppercase tracking-widest mt-2 font-bold">Start by adding your first category</p>
                </div>
            </div>

            {/* Add Category Drawer */}
            <RightDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Add Category"
                subtitle="Create a new expense category"
            >
                <form onSubmit={handleCreate} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                                <Tag size={12} strokeWidth={3} /> Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Utilities"
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:border-indigo-500/30 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                                <FileText size={12} strokeWidth={3} /> Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Electricity, Water, Internet"
                                rows={4}
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:border-indigo-500/30 focus:bg-white transition-all shadow-sm resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:from-indigo-700 hover:to-violet-700 transition-all active:scale-95"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </RightDrawer>
        </div>
    );
};

export default ExpenseSettings;
