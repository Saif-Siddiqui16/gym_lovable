import React, { useState } from 'react';
import { Search, User, Filter, Download, FileText, UserPlus, Users, CheckCircle, XCircle, Snowflake, Clock, Camera } from 'lucide-react';
import '../../styles/GlobalDesign.css';
import CustomDropdown from '../../components/common/CustomDropdown';
import StatsCard from '../../modules/dashboard/components/StatsCard';
import RightDrawer from '../../components/common/RightDrawer';

const StaffMemberList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleStatusFilter = (value) => setStatusFilter(value);

    const [newMemberData, setNewMemberData] = useState({
        name: '', email: '', phone: '', gender: '', dob: '', source: 'Walk-in',
        referralCode: '', idType: '', idNumber: '', address: '',
        emergencyName: '', emergencyPhone: '', fitnessGoal: '', healthConditions: ''
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 p-4 md:p-8 space-y-8 animate-fadeIn">

            {/* Header Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-10 pointer-events-none"></div>
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                                <Users size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Members</h1>
                                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">
                                    Manage your gym members and their memberships
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsAddDrawerOpen(true)}
                            className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200 hover:scale-105 transition-all"
                        >
                            <UserPlus size={18} /> Add Member
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <StatsCard title="Total Members" value="0" icon={Users} color="primary" isEarningsLayout={true} />
                <StatsCard title="Active" value="0" icon={CheckCircle} color="success" isEarningsLayout={true} />
                <StatsCard title="Inactive" value="0" icon={XCircle} color="danger" isEarningsLayout={true} />
                <StatsCard title="Frozen" value="0" icon={Snowflake} color="secondary" isEarningsLayout={true} />
                <StatsCard title="Expiring Soon" value="0" icon={Clock} color="warning" isEarningsLayout={true} />
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by name, email, phone, or member code..."
                        className="pl-12 h-14 w-full rounded-2xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                    />
                </div>
                <div className="w-full md:w-56">
                    <CustomDropdown
                        options={['All', 'Active', 'Inactive', 'Frozen', 'Expired']}
                        value={statusFilter}
                        onChange={handleStatusFilter}
                        placeholder="All Status"
                        icon={Filter}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="h-14 px-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-violet-600 hover:border-violet-100 transition-all shadow-sm">
                        <Download size={20} />
                    </button>
                    <button className="h-14 px-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-violet-600 hover:border-violet-100 transition-all shadow-sm">
                        <FileText size={20} />
                    </button>
                </div>
            </div>

            {/* Empty State / Table Placeholder */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-20 flex flex-col items-center justify-center text-center gap-6">
                <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner">
                    <User size={48} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">No members found</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Start by clicking the "Add Member" button</p>
                </div>
            </div>

            {/* Add Member Drawer */}
            <RightDrawer
                isOpen={isAddDrawerOpen}
                onClose={() => setIsAddDrawerOpen(false)}
                title="Add New Member"
                maxWidth="max-w-2xl"
                footer={
                    <div className="flex gap-3 w-full justify-end">
                        <button
                            type="button"
                            onClick={() => setIsAddDrawerOpen(false)}
                            className="px-6 h-11 border-2 border-slate-200 bg-white text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-6 h-11 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                        >
                            Add Member
                        </button>
                    </div>
                }
            >
                <div className="px-6 py-6 space-y-8 pb-20">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center gap-3 pb-6 border-b border-slate-100">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600 flex items-center justify-center text-4xl font-black border-4 border-white shadow-xl shadow-violet-100 transition-transform group-hover:scale-105">
                                N
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-2xl bg-white text-slate-400 flex items-center justify-center shadow-lg border-2 border-slate-50 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all">
                                <Camera size={20} />
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload photo</p>
                    </div>

                    {/* Section 1: Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email *</label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Phone *</label>
                                <input
                                    type="tel"
                                    placeholder="+91 00000 00000"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                                <select className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 appearance-none">
                                    <option value="">Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Date of Birth</label>
                                <input
                                    type="text"
                                    placeholder="dd-mm-yyyy"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Source</label>
                                <select className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 appearance-none">
                                    <option>Walk-in</option>
                                    <option>Online</option>
                                    <option>Social Media</option>
                                    <option>Referral</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Referral */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Referral</h3>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Referral Code (Member Code)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter member code"
                                    className="flex-1 h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                                <button className="px-6 h-11 bg-white border-2 border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-violet-500 hover:text-violet-600 transition-all">
                                    Verify
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Government ID */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Government ID</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">ID Type</label>
                                <select className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 appearance-none">
                                    <option value="">Select ID Type</option>
                                    <option>Aadhaar Card</option>
                                    <option>PAN Card</option>
                                    <option>Driving License</option>
                                    <option>Passport</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">ID Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter ID number"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Address */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Address</h3>
                        <div>
                            <textarea
                                placeholder="Enter full address"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 resize-none"
                            />
                        </div>
                    </div>

                    {/* Section 5: Emergency Contact */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Emergency contact name"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Emergency Phone</label>
                                <input
                                    type="tel"
                                    placeholder="Emergency phone number"
                                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 6: Fitness & Health */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Fitness &amp; Health</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Fitness Goal</label>
                                <select className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 appearance-none">
                                    <option value="">Select fitness goal</option>
                                    <option>Weight Loss</option>
                                    <option>Muscle Gain</option>
                                    <option>General Fitness</option>
                                    <option>Competition Prep</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Health Conditions</label>
                                <textarea
                                    placeholder="Any medical conditions..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-sm font-semibold transition-all outline-none bg-slate-50/50 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </RightDrawer>

        </div>
    );
};

export default StaffMemberList;
