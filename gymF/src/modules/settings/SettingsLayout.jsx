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
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <div className="w-full lg:w-72 bg-white border-r border-slate-200 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen overflow-y-auto no-scrollbar">
                <div className="p-6 mb-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Settings</h1>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Management</p>
                        </div>
                    </div>
                </div>

                <nav className="px-3 pb-6 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary/5 text-primary shadow-sm'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                <div className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'
                                    }`}>
                                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={`text-sm tracking-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 bg-[#F8FAFC]">
                <main className="p-4 lg:p-8 max-w-6xl">
                    <Outlet context={{ role }} />
                </main>
            </div>
        </div>
    );
};

export default SettingsLayout;
