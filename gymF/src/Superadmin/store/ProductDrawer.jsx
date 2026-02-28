import React, { useState, useEffect } from 'react';
import { X, Box, Tag, DollarSign, Package, CheckCircle, XCircle, ImagePlus, Upload, HelpCircle, ChevronDown } from 'lucide-react';
import { getCategories, addStoreProduct, updateStoreProduct } from '../../api/storeApi';
import { useBranchContext } from '../../context/BranchContext';
import toast from 'react-hot-toast';

const ProductDrawer = ({ isOpen, onClose, product, mode = 'add', onSubmit }) => {
    const { branches } = useBranchContext();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        price: '',
        costPrice: '',
        taxRate: '0',
        stock: '',
        status: 'Active',
        image: '',
        description: '',
        branch: 'All Branches'
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                if (data.length > 0 && !formData.category && mode === 'add') {
                    setFormData(prev => ({ ...prev, category: data[0].name }));
                }
            } catch (error) {
                console.error("Failed to load categories");
            }
        };
        if (isOpen) fetchCategories();
    }, [isOpen]);

    useEffect(() => {
        if (product && mode === 'edit') {
            setFormData({
                ...product,
                price: parseFloat(product.price),
                costPrice: parseFloat(product.costPrice || 0),
                taxRate: parseFloat(product.taxRate || 0).toString(),
                branch: product.branch || 'All Branches',
                description: product.description || ''
            });
        } else {
            setFormData({
                name: '',
                sku: `PRD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                category: categories.length > 0 ? categories[0].name : '',
                price: '',
                costPrice: '',
                taxRate: '0',
                stock: '',
                status: 'Active',
                image: '',
                description: '',
                branch: 'All Branches'
            });
        }
    }, [product, mode, isOpen, categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price),
                costPrice: parseFloat(formData.costPrice || 0),
                taxRate: parseFloat(formData.taxRate),
                stock: parseInt(formData.stock)
            };

            if (mode === 'add') {
                await addStoreProduct(dataToSubmit);
                toast.success('Product added successfully');
            } else {
                await updateStoreProduct(product.id, dataToSubmit);
                toast.success('Product updated successfully');
            }
            if (onSubmit) {
                await onSubmit();
            }
            onClose();
        } catch (error) {
            toast.error(error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1001] overflow-hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300"
                    onClick={onClose}
                ></div>
                <div className="fixed inset-y-0 right-0 flex max-w-full pl-0">
                    <div className="relative w-screen sm:max-w-[480px] transform transition-transform duration-300 ease-in-out shadow-2xl translate-x-0">
                        <div className="flex h-full flex-col bg-white overflow-y-auto">
                            {/* Header */}
                            <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{mode === 'edit' ? 'Edit Product' : 'Add New Product'}</h2>
                                    <p className="text-slate-400 text-xs mt-1">
                                        {mode === 'edit' ? 'Update product details in your inventory' : 'Add a new product to your inventory'}
                                    </p>
                                </div>
                                <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Form content */}
                            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
                                {/* Product Image */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700">Product Image</label>
                                    <label className="w-full h-40 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#0f172a] hover:bg-slate-100 transition-all group relative overflow-hidden">
                                        {formData.image ? (
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload className="text-slate-400 mb-2" size={24} />
                                                <p className="text-xs font-bold text-slate-900">Click to upload image</p>
                                                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">PNG, JPG up to 5MB</p>
                                            </>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                </div>

                                {/* Name & Description */}
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Product Name *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Whey Protein"
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a] border-orange-200 focus:ring-4 focus:ring-orange-50"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Description</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Product description..."
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a] transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                {/* SKU & Category */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">SKU</label>
                                        <input
                                            type="text"
                                            value={formData.sku}
                                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                            placeholder="PRD-001"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                        >
                                            <option value="" disabled>Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Prices */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Selling Price (₹) *</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="999"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Cost Price (₹)</label>
                                        <input
                                            type="number"
                                            value={formData.costPrice}
                                            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                                            placeholder="500"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                        />
                                    </div>
                                </div>

                                {/* Tax & Branch */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                            Tax Rate (%) <HelpCircle size={12} className="text-slate-400" />
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.taxRate}
                                            onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Branch</label>
                                        <select
                                            value={formData.branch}
                                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                        >
                                            <option value="All Branches">All Branches</option>
                                            {branches.map(branch => (
                                                <option key={branch.id} value={branch.name}>{branch.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Stock Quantity */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Initial Stock Quantity *</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        placeholder="50"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0f172a]"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Set the starting inventory for this product</p>
                                </div>

                                {/* Active Toggle */}
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Active</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Product is available for sale</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: formData.status === 'Active' ? 'Inactive' : 'Active' })}
                                        className={`w-12 h-6 rounded-full transition-all relative ${formData.status === 'Active' ? 'bg-[#0f172a]' : 'bg-slate-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.status === 'Active' ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </form>

                            {/* Actions */}
                            <div className="p-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full px-6 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full px-6 py-3 bg-[#0f172a] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    {mode === 'edit' ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDrawer;
