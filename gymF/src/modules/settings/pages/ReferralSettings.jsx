import React from 'react';
import { Gift } from 'lucide-react';

const ReferralSettings = () => {
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto font-sans">
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 transition-all duration-300">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 shadow-sm border border-slate-100">
                        <Gift size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2">
                            Referral Program Settings
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            Configure rewards for members who refer new members
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralSettings;
