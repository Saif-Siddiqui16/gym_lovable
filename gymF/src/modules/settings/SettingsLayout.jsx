import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
    Settings,
    Building2,
    MapPin,
    Gift,
    Users,
    FileText,
    Sparkles,
    DollarSign,
    Puzzle,
    Bell,
    Shield,
    Globe
} from 'lucide-react';

const SettingsLayout = ({ role }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        { name: 'Organization', path: `/branchadmin/settings/general`, icon: Building2 },
        { name: 'Branches', path: `/branchadmin/settings/branches`, icon: MapPin },
        { name: 'Benefits', path: `/branchadmin/settings/benefits`, icon: Gift },
        { name: 'Referrals', path: `/branchadmin/settings/referrals`, icon: Users },
        { name: 'Templates', path: `/branchadmin/settings/templates`, icon: FileText },
        { name: 'Plan & Benefit Templates', path: `/branchadmin/settings/plan-benefit-templates`, icon: Sparkles },
        { name: 'Expenses', path: `/branchadmin/settings/expenses`, icon: DollarSign },
        { name: 'Integrations', path: `/branchadmin/settings/integrations`, icon: Puzzle },
        { name: 'Notifications', path: `/branchadmin/settings/communication`, icon: Bell },
        { name: 'Security', path: `/branchadmin/settings/security`, icon: Shield },
        { name: 'Website', path: `/branchadmin/settings/website`, icon: Globe },
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 font-black">
            {/* Sidebar */}
            <div className="w-full lg:w-80 bg-white/80 backdrop-blur-md border-r border-slate-100 flex-shrink-0 lg:p-8 lg:min-h-screen shadow-sm">
                <div className="p-6 lg:p-0 mb-8 lg:mb-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:scale-110 hover:rotate-6">
                            <Settings size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <h1 className="text-2xl text-slate-800 tracking-tight">Settings</h1>
                            <p className="text-[10px] text-violet-500 uppercase tracking-widest">Master Control</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 lg:p-0 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs transition-all duration-300 group border-2 ${isActive
                                    ? 'bg-white border-violet-100 text-violet-600 shadow-xl shadow-violet-500/5'
                                    : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-violet-50 text-violet-600' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                                    }`}>
                                    <item.icon size={18} strokeWidth={3} />
                                </div>
                                <span className="tracking-tight">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1">
                <main className="min-h-full">
                    <Outlet context={{ role }} />
                </main>
            </div>
        </div>
    );
};

export default SettingsLayout;
