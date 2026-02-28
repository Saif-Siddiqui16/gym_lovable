import React, { useState } from 'react';
import { lockerApi } from '../../../api/lockerApi';
import toast from 'react-hot-toast';
import { useBranchContext } from '../../../context/BranchContext';

const BulkCreateLockersDrawer = ({ onClose, onSuccess }) => {
    const { selectedBranch } = useBranchContext();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        prefix: 'L-',
        startNumber: '1',
        endNumber: '10',
        size: 'Medium',
        isChargeable: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.prefix) return toast.error('Prefix is required');
        if (parseInt(formData.startNumber) > parseInt(formData.endNumber)) {
            return toast.error('Start number must be less than or equal to end number');
        }

        try {
            setLoading(true);
            await lockerApi.bulkCreateLockers({
                ...formData,
                tenantId: selectedBranch
            });
            toast.success(`${previewCount} lockers created successfully`);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to bulk create lockers');
        } finally {
            setLoading(false);
        }
    };

    const previewCount = Math.max(0, parseInt(formData.endNumber) - parseInt(formData.startNumber) + 1);

    const generatePreview = () => {
        const preview = [];
        const count = Math.min(previewCount, 12); // Show max 12 in preview
        const start = parseInt(formData.startNumber) || 1;

        for (let i = 0; i < count; i++) {
            const num = (start + i).toString().padStart(3, '0');
            preview.push(`${formData.prefix}${num}`);
        }
        return preview;
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-800">Bulk Create Lockers</h2>
                <p className="text-sm text-slate-500 mt-1">Create multiple lockers at once with a common prefix and numbering</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Prefix</label>
                        <input
                            type="text"
                            value={formData.prefix}
                            onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Start Number</label>
                        <input
                            type="number"
                            value={formData.startNumber}
                            onChange={(e) => setFormData({ ...formData, startNumber: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                            min="1"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">End Number</label>
                        <input
                            type="number"
                            value={formData.endNumber}
                            onChange={(e) => setFormData({ ...formData, endNumber: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                            min="1"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Size (all)</label>
                    <select
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-800">Is Chargeable?</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Enable to set a monthly rental fee</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.isChargeable}
                            onChange={(e) => setFormData({ ...formData, isChargeable: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                    </label>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Preview ({isNaN(previewCount) ? 0 : previewCount} lockers)</h4>
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-wrap gap-2 min-h[100px]">
                        {isNaN(previewCount) || previewCount <= 0 ? (
                            <p className="text-sm text-slate-400 w-full text-center py-4">Invalid range</p>
                        ) : (
                            <>
                                {generatePreview().map((lockerId, idx) => (
                                    <div key={idx} className="bg-white px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium whitespace-nowrap">
                                        {lockerId}
                                    </div>
                                ))}
                                {previewCount > 12 && (
                                    <div className="bg-white px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-500 font-medium whitespace-nowrap">
                                        ...and {previewCount - 12} more
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 border border-slate-300 text-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading || isNaN(previewCount) || previewCount <= 0}
                    className="px-5 py-2.5 bg-[#0a1b2e] text-white font-medium rounded-lg hover:bg-[#1a2b3e] disabled:opacity-50 text-sm"
                >
                    {loading ? 'Creating...' : `Create ${isNaN(previewCount) ? 0 : previewCount} Lockers`}
                </button>
            </div>
        </form>
    );
};

export default BulkCreateLockersDrawer;
