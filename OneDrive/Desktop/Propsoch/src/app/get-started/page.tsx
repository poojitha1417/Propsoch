"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft } from 'lucide-react';

export default function GetStartedPage() {
    const [step, setStep] = useState(1);
    const totalSteps = 6;

    const areas = [
        { label: 'North', sub: 'Starting from ₹ 1 Cr' },
        { label: 'East', sub: 'Starting from ₹ 1.5 Cr' },
        { label: 'South', sub: 'Starting from ₹ 1.5 Cr' },
        { label: 'Central', sub: 'Starting from ₹ 2 Cr' },
        { label: 'Need Advise', sub: 'Starting from ₹ 1.5 Cr' },
    ];

    const propertyTypes = [
        { label: '2 BHK', sub: '~900-1200sqft' },
        { label: '3 BHK', sub: '~1100-2000sqft' },
        { label: '4 BHK', sub: '~2000-4000sqft' },
        { label: 'Villa', sub: '~2000-8000sqft' },
        { label: 'Plot', sub: '~1200-8000sqft' },
    ];

    const budgets = [
        { label: 'Less than ₹ 2.5 Cr', sub: 'EMI starting ~₹1L' },
        { label: '₹ 2.5 Cr - ₹ 4 Cr', sub: 'EMI starting ~₹1.4L' },
        { label: 'More than ₹ 4 Cr', sub: 'EMI starting ~₹2.2L' },
    ];

    const timelines = [
        { label: 'I am flexible', sub: 'Recommended' },
        { label: '3+ years', sub: 'Good Supply' },
        { label: '2+ years', sub: 'Good Supply' },
        { label: '1+ years', sub: 'Low Supply' },
        { label: 'Ready To Move / Resale', sub: 'No Supply' },
    ];

    const handleNext = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => Math.min(prev + 1, totalSteps));
    };

    const handleBack = () => {
        setStep(prev => Math.max(1, prev - 1));
    };

    // 4-point star to match the screenshot style
    const SparkleStar = ({ active }: { active: boolean }) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke={active ? "none" : "currentColor"} strokeWidth="1.5" className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-300'}`}>
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Simple Header */}
            <header className="bg-white border-b border-slate-200 py-4">
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-start pt-12 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">

                    <div className="p-8 md:p-12">

                        {/* Progress Stars (only show step 2+) */}
                        {step > 1 && step < 6 && (
                            <div className="flex items-center gap-1.5 mb-6">
                                {[...Array(totalSteps - 1)].map((_, i) => (
                                    <SparkleStar key={i} active={i < step} />
                                ))}
                            </div>
                        )}

                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Let's find you a <span className="text-blue-600">home</span>
                        </h1>
                        <p className="text-slate-500 mb-10 pb-6 border-b border-slate-100">
                            Help us tailor the journey for you. It'll take &lt; 30s.
                        </p>

                        {/* STEP 1: Area */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    What's your preferred area in Bengaluru?
                                </h2>
                                <div className="space-y-4">
                                    {areas.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={handleNext}
                                            className="w-full flex items-center justify-between p-5 md:px-8 md:py-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 group cursor-pointer shadow-sm"
                                        >
                                            <span className="font-semibold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{option.label}</span>
                                            <span className="text-sm text-slate-500 font-medium group-hover:text-blue-600 transition-colors">{option.sub}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 text-center border-t border-slate-100">
                                    <p className="text-sm text-slate-400">Already a member? <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign In</Link></p>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Property Type */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    What type of property are you looking for?
                                </h2>
                                <div className="space-y-4">
                                    {propertyTypes.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={handleNext}
                                            className="w-full flex items-center justify-between p-5 md:px-8 md:py-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 group cursor-pointer shadow-sm"
                                        >
                                            <span className="font-semibold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{option.label}</span>
                                            <span className="text-sm text-slate-400 font-medium group-hover:text-blue-600 transition-colors">{option.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Budget Range */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    What's your budget range?
                                </h2>
                                <div className="space-y-4">
                                    {budgets.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={handleNext}
                                            className="w-full flex items-center justify-between p-5 md:px-8 md:py-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 group cursor-pointer shadow-sm"
                                        >
                                            <span className="font-semibold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{option.label}</span>
                                            <span className="text-sm text-slate-400 font-medium group-hover:text-blue-600 transition-colors">{option.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Possession Timeline */}
                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    What possession timeline do you prefer the most?
                                </h2>
                                <div className="space-y-4">
                                    {timelines.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={handleNext}
                                            className="w-full flex items-center justify-between p-5 md:px-8 md:py-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 group cursor-pointer shadow-sm"
                                        >
                                            <span className="font-semibold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{option.label}</span>
                                            <span className="text-sm text-slate-400 font-medium group-hover:text-blue-600 transition-colors">{option.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 5: Full Name */}
                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    What's your full name?
                                </h2>
                                <div className="flex gap-4 mb-2">
                                    <input type="text" placeholder="First Name" className="w-1/2 p-4 md:py-5 md:px-6 text-lg border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all" />
                                    <input type="text" placeholder="Last Name" className="w-1/2 p-4 md:py-5 md:px-6 text-lg border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all" />
                                </div>
                                <p className="text-sm text-slate-400 mb-12">Your tailored journey starts with your name</p>

                                <div className="flex items-center gap-6">
                                    <button onClick={handleBack} className="flex items-center text-slate-600 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap px-2">
                                        <ChevronLeft className="w-5 h-5 mr-1" /> Back
                                    </button>
                                    <button
                                        className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg text-center"
                                        onClick={handleNext}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 6: Final Destination (Login trigger) */}
                        {step === 6 && (
                            <div className="animate-in fade-in zoom-in-95 duration-300 text-center py-8">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <SparkleStar active={true} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                    You're all set!
                                </h2>
                                <p className="text-lg text-slate-500 mb-10 max-w-sm mx-auto">
                                    Let's verify your identity quickly so that we can assign a dedicated advisor to you.
                                </p>
                                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                                    <Link href="/login" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md text-center text-lg">
                                        Proceed to Login
                                    </Link>
                                    <button onClick={handleBack} className="w-full py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all text-center">
                                        Go Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Universal Back button & Terms for Steps 2 to 4 */}
                        {step > 1 && step < 5 && (
                            <div className="mt-8 animate-in fade-in duration-300">
                                <button onClick={handleBack} className="flex items-center text-slate-600 hover:text-blue-600 font-semibold transition-colors mb-12 px-2">
                                    <ChevronLeft className="w-5 h-5 mr-1" /> Back
                                </button>
                                <div className="text-center">
                                    <p className="text-xs text-slate-400">
                                        By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> &amp; <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Specific Terms text for Step 5 */}
                        {step === 5 && (
                            <div className="text-center mt-10 animate-in fade-in duration-300">
                                <p className="text-xs text-slate-400">
                                    By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> &amp; <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
