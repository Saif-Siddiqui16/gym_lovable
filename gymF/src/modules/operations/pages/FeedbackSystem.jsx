import React, { useState, useEffect } from 'react';
import { feedbackApi } from '../../../api/feedbackApi';
import toast from 'react-hot-toast';
import { Star, MessageSquare, ExternalLink, ThumbsUp, RefreshCw, MessageCircle, BarChart2, CheckCircle, Clock } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useBranchContext } from '../../../context/BranchContext';

const FeedbackSystem = ({ role = 'ADMIN' }) => {
    const isMember = role === 'MEMBER';
    const [isConnected, setIsConnected] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [feedbackType, setFeedbackType] = useState('Suggestion');
    const [memberRating, setMemberRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const [REVIEWS, setReviews] = useState([]);
    const { selectedBranch } = useBranchContext();
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isMember) {
            loadFeedback();
        }
    }, [isMember, selectedBranch]);

    const loadFeedback = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedBranch && selectedBranch !== 'all') {
                params.branchId = selectedBranch;
            }
            const data = await feedbackApi.getAllFeedback(params);
            const formatted = data.map(f => ({
                id: f.id,
                user: f.member,
                rating: f.rating,
                date: f.date,
                text: f.comment,
                source: 'App',
                status: f.status
            }));
            setReviews(formatted);
        } catch (error) {
            toast.error('Failed to load feedback');
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (id) => {
        try {
            await feedbackApi.updateFeedbackStatus(id, 'Resolved');
            toast.success('Feedback marked as resolved');
            loadFeedback();
            setReplyingTo(null);
            setReplyText('');
        } catch (error) {
            toast.error('Failed to resolve feedback');
        }
    };

    const handleConnect = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsConnected(true);
            setIsSyncing(false);
            alert("Successfully connected to 'Kiaan Gyms' Google Business Profile!");
        }, 1500);
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await feedbackApi.addFeedback({
                memberId: 1, // Optional: normally extract from context or let backend use token
                rating: memberRating,
                comment: `[${feedbackType}] ${comment}`
            });
            setSubmitted(true);
        } catch (error) {
            toast.error('Failed to submit feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isMember) {
        return (
            <div className="fade-in space-y-8 p-4 md:p-8">
                {/* Custom Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b-2 border-slate-100 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Feedback Hub</h1>
                        <p className="text-slate-500 font-medium">Help us evolve by sharing your experience.</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {!submitted ? (
                        <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50 rounded-[32px]">
                            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                                {/* Left Side: Design Element */}
                                <div className="md:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                                            <MessageSquare size={28} className="text-blue-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black leading-tight">Your Voice <br />Matters.</h2>
                                            <p className="text-blue-100 text-sm font-medium leading-relaxed opacity-80">
                                                Every piece of feedback helps us build a more premium experience for you.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 pt-10">
                                        <div className="flex items-center gap-2 text-xs font-bold text-blue-200 uppercase tracking-widest">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            Active System
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Form */}
                                <div className="md:col-span-3 p-8 lg:p-12 bg-white">
                                    <form onSubmit={handleSubmitFeedback} className="space-y-8">
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">How would you rate us?</label>
                                            <div className="flex gap-3">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setMemberRating(star)}
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${memberRating >= star
                                                            ? 'bg-amber-100 text-amber-500 scale-105 shadow-md shadow-amber-200'
                                                            : 'bg-slate-50 text-slate-300 hover:bg-slate-100'
                                                            }`}
                                                    >
                                                        <Star size={20} fill={memberRating >= star ? 'currentColor' : 'none'} strokeWidth={memberRating >= star ? 0 : 2} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">What's this about?</label>
                                            <select
                                                value={feedbackType}
                                                onChange={(e) => setFeedbackType(e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all cursor-pointer text-slate-700"
                                            >
                                                <option>Suggestion</option>
                                                <option>Complaint</option>
                                                <option>Praise</option>
                                                <option>Equipment Request</option>
                                            </select>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Your Message</label>
                                            <textarea
                                                rows="4"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Tell us what's on your mind..."
                                                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all resize-none placeholder:text-slate-300 text-slate-700"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || memberRating === 0}
                                            className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-200"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center gap-3">
                                                    <RefreshCw className="animate-spin" size={18} />
                                                    Transmitting...
                                                </div>
                                            ) : (
                                                "Submit Feedback"
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="bg-white rounded-[4rem] shadow-2xl p-20 text-center space-y-10 animate-in fade-in zoom-in duration-700 border border-slate-100">
                            <div className="relative mx-auto w-24 h-24">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                                <div className="relative w-full h-full bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                                    <ThumbsUp size={36} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Submission Received!</h2>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm mx-auto">
                                    We've received your feedback. Our team will review it shortly.
                                </p>
                            </div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-lg"
                            >
                                Send Another
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const filteredReviews = statusFilter === 'All Status'
        ? REVIEWS
        : REVIEWS.filter(r => r.status === statusFilter);

    const averageRating = REVIEWS.length ? (REVIEWS.reduce((acc, curr) => acc + curr.rating, 0) / REVIEWS.length).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            Member Feedback
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Review and manage feedback submitted by members</p>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-slate-500">Total Feedback</p>
                            <div className="w-8 h-8 rounded-lg bg-slate-100/50 flex items-center justify-center text-slate-600">
                                <MessageSquare size={16} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mt-4 text-slate-900">{REVIEWS.length}</h3>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-slate-500">Average Rating</p>
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                <Star size={16} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mt-4 text-red-500">{averageRating}</h3>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-slate-500">Pending Review</p>
                            <div className="w-8 h-8 rounded-lg bg-slate-100/50 flex items-center justify-center text-slate-600">
                                <Clock size={16} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mt-4 text-slate-900">{REVIEWS.filter(r => r.status === 'Pending').length}</h3>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-slate-500">Resolved</p>
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                                <CheckCircle size={16} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mt-4 text-green-500">{REVIEWS.filter(r => r.status === 'Resolved').length}</h3>
                    </div>
                </div>

                {/* Filter */}
                <div className="w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm bg-white text-slate-600"
                    >
                        <option value="All Status">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">All Feedback</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                        </div>
                    ) : filteredReviews.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {filteredReviews.map(review => (
                                <div key={review.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                            {review.user.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{review.user}</h4>
                                                    <p className="text-xs text-slate-500">{review.date}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex gap-1 text-amber-400">
                                                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                                                    </div>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${review.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 label-status-resolved' : 'bg-amber-50 text-amber-600 label-status-pending'
                                                        }`}>
                                                        {review.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-slate-600 text-sm mb-3">"{review.text}"</p>

                                            {review.status !== 'Resolved' && (
                                                <button
                                                    onClick={() => handleResolve(review.id)}
                                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                                >
                                                    Mark as Resolved
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <MessageSquare size={40} className="mb-4 text-slate-200" />
                            <p className="text-sm">No feedback found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSystem;
