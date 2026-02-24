import React from 'react';
import Link from 'next/link';
import { UserCog, Map, FileSearch, ShieldAlert, BadgeIndianRupee, Gift } from 'lucide-react';

const benefits = [
    { icon: <UserCog className="w-6 h-6 text-blue-500" />, text: "Work with trained architects" },
    { icon: <Map className="w-6 h-6 text-blue-500" />, text: "Check builders, areas & projects" },
    { icon: <FileSearch className="w-6 h-6 text-blue-500" />, text: "See pros & cons exhaustively" },
    { icon: <ShieldAlert className="w-6 h-6 text-blue-500" />, text: "Assess livability & financial risks" },
    { icon: <BadgeIndianRupee className="w-6 h-6 text-blue-500" />, text: "Lowest price negotiations" },
    { icon: <Gift className="w-6 h-6 text-blue-500" />, text: "Get rewarded handsomely" }
];

export default function SmartSaveSection() {
    return (
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Choose the smart way to save <br />
                            <span className="text-slate-300">~₹4.78 L &amp; 3 months of your life.</span>
                        </h2>
                        <p className="text-lg text-slate-400 mb-12 max-w-lg leading-relaxed">
                            You're about to make the biggest purchase of your life. <br />
                            We make sure you do it intelligently.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="shrink-0 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                                        {benefit.icon}
                                    </div>
                                    <span className="font-medium text-slate-200">{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (Card) */}
                    <div className="relative">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"></div>

                        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <h3 className="text-3xl font-bold mb-6">Guided Home Buying</h3>
                            <p className="text-slate-400 leading-relaxed mb-12 max-w-md">
                                9 in 10 homebuyers have bought a home via us within 25 days.
                                Trusted by 1000+ buyers from Google, Amazon, Peak XV etc.
                            </p>

                            <div className="mb-12">
                                <p className="text-slate-400 mb-2">Save</p>
                                <p className="text-5xl md:text-6xl font-bold text-white tracking-tight">₹4,78,125/-</p>
                            </div>

                            <p className="text-slate-300 mb-8 font-medium">
                                Experience truly unbiased advisory &amp; get total peace of mind
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800/80">
                                <Link href="/get-started" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors text-center block sm:inline-block">
                                    Book An Appointment
                                </Link>
                                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-white rounded-xl font-bold transition-all">
                                    See How You Will Save
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
