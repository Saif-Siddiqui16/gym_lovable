import React, { useState, useEffect } from 'react';
import { feedbackApi } from '../../../api/feedbackApi';
import toast from 'react-hot-toast';
import {
    Star,
    MessageSquare,
    History,
    ChevronRight,
    ThumbsUp,
    RefreshCw,
    CheckCircle2,
    Sparkles,
    Send
} from 'lucide-react';
import Button from '../../../components/ui/Button';

const FeedbackSystem = ({ role = 'ADMIN' }) => {
    const isMember = role === 'MEMBER';

    // Member specific states
    const [feedbackType, setFeedbackType] = useState('General');
    const [memberRating, setMemberRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [myFeedback, setMyFeedback] = useState([]);

    // Admin specific states
    const [REVIEWS, setReviews] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, [isMember]);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await feedbackApi.getAllFeedback();

            if (isMember) {
                // Simulating member-specific feedback for UI demonstration
                setMyFeedback(data.filter(f => f.status === 'Pending' || f.status === 'Resolved').slice(0, 4));
            } else {
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
            }
        } catch (error) {
            console.error('Failed to load feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        if (memberRating === 0) {
            toast.error("Please provide a rating");
            return;
        }
        setIsSubmitting(true);
        try {
            await feedbackApi.addFeedback({
                memberId: 1,
                rating: memberRating,
                comment: `[${feedbackType}] ${comment}`
            });
            setSubmitted(true);
            toast.success("Feedback submitted!");
            loadData();
        } catch (error) {
            toast.error('Failed to submit feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResolve = async (id) => {
        try {
            await feedbackApi.updateFeedbackStatus(id, 'Resolved');
            toast.success('Feedback resolved');
            loadData();
        } catch (error) {
            toast.error('Failed to resolve feedback');
        }
    };

    if (isMember) {
        return (
            <div className="saas-container min-h-screen bg-white p-6 md:p-10 fade-in scrollbar-thin scrollbar-thumb-gray-200">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Feedback</h1>
                        <p className="text-slate-500 font-medium text-lg">Share your experience and help us improve</p>
                    </div>
                    {/* Subtle Divider */}
                    <div className="w-full h-px bg-slate-100 mt-8" />
                </div>

                {!submitted ? (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Column 1: Submit Feedback Form */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Submit Feedback</h2>
                                <p className="text-slate-500 text-sm font-medium">We value your opinion! Let us know how we can serve you better.</p>
                            </div>

                            <form onSubmit={handleSubmitFeedback} className="space-y-8">
                                {/* Rating Input */}
                                <div className="space-y-4">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest px-1">How would you rate your experience?</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setMemberRating(star)}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${memberRating >= star
                                                        ? 'bg-indigo-50 text-indigo-600 scale-105 shadow-sm'
                                                        : 'bg-slate-50 text-slate-300 hover:bg-slate-100/80 hover:text-slate-400'
                                                    }`}
                                            >
                                                <Star
                                                    size={22}
                                                    fill={memberRating >= star ? 'currentColor' : 'none'}
                                                    strokeWidth={memberRating >= star ? 0 : 2}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category Dropdown */}
                                <div className="space-y-4">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Category</label>
                                    <select
                                        value={feedbackType}
                                        onChange={(e) => setFeedbackType(e.target.value)}
                                        className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer text-slate-700 appearance-none"
                                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                                    >
                                        <option>General</option>
                                        <option>Facilities</option>
                                        <option>Trainers</option>
                                        <option>Equipment</option>
                                        <option>App Performance</option>
                                    </select>
                                </div>

                                {/* Textarea */}
                                <div className="space-y-4">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Your detailed experience</label>
                                    <textarea
                                        rows="5"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us more about your experience..."
                                        className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-300 text-slate-700 h-40"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || memberRating === 0}
                                    className="w-full h-14 bg-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <RefreshCw className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            Submit Feedback
                                            <Send size={16} />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Column 2: Previous Feedback */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[500px] flex flex-col">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">My Previous Feedback</h2>
                                <p className="text-slate-500 text-sm font-medium">View your submitted feedback and their status</p>
                            </div>

                            <div className="flex-1 space-y-4">
                                {myFeedback.length > 0 ? (
                                    myFeedback.map((item) => (
                                        <div key={item.id} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex gap-0.5 text-amber-500">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} strokeWidth={i < item.rating ? 0 : 2} />
                                                    ))}
                                                </div>
                                                <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'Resolved'
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-amber-50 text-amber-600'
                                                    }`}>
                                                    {item.status}
                                                </div>
                                            </div>
                                            <p className="text-slate-700 font-medium text-sm leading-relaxed mb-3 line-clamp-2">
                                                {item.comment || "No comment provided."}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <History size={12} />
                                                {item.date}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-40">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                            <MessageSquare size={32} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">You haven't submitted any feedback yet.</p>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Tip */}
                            <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-center">
                                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                    <Sparkles size={14} />
                                    Your voice helps us grow
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto py-20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-10" />
                            <div className="relative w-full h-full bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={48} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Thank You!</h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                We've received your feedback. Our team will review it shortly.
                            </p>
                        </div>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            Return to Feedback
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // --- ADMIN VIEW (Simplified for context) ---
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Feedback Management</h1>
                {/* Admin cards and list... */}
                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center py-40">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">Management Dashboard Active</p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackSystem;
