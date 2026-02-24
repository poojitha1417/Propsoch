import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-200">
            {/* Navbar matching screenshot (simplified) */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">P</div>
                            <span className="font-bold text-2xl tracking-tight text-slate-900">Propsoch</span>
                        </Link>

                        <div className="hidden lg:flex space-x-8 items-center">
                            <span className="text-slate-600 font-medium cursor-pointer hover:text-blue-600">Properties <span className="text-xs opacity-50">▼</span></span>
                            <span className="text-slate-600 font-medium cursor-pointer hover:text-blue-600">Services <span className="text-xs opacity-50">▼</span></span>
                            <span className="text-slate-600 font-medium cursor-pointer hover:text-blue-600">Resources <span className="text-xs opacity-50">▼</span></span>
                            <span className="text-slate-600 font-medium cursor-pointer hover:text-blue-600">Company <span className="text-xs opacity-50">▼</span></span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link href="/get-started" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-bold transition-all shadow-md">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
                <div className="max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 flex flex-col md:flex-row min-h-[600px] border border-slate-100 relative z-10">

                    {/* Left Column - Image Container with beige background */}
                    <div className="w-full md:w-1/2 relative bg-[#fdf5ed] hidden md:flex items-center justify-center p-8 lg:p-12">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                                alt="Beautiful house exterior"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome Back!</h1>
                        <p className="text-slate-500 mb-8 text-lg">Please verify your WhatsApp number</p>

                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all mb-4">
                            <div className="flex items-center justify-center px-4 py-3.5 bg-white border-r border-slate-300 cursor-pointer hover:bg-slate-50">
                                <span className="text-xl leading-none">🇮🇳</span>
                                <svg className="w-4 h-4 ml-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                            <div className="px-4 text-slate-900 font-semibold bg-white">
                                +91
                            </div>
                            <input
                                type="tel"
                                className="w-full py-3.5 px-2 outline-none text-slate-900 font-medium placeholder-slate-300"
                                placeholder=""
                                maxLength={10}
                            />
                        </div>

                        <p className="text-sm text-blue-600/80 font-medium mb-10">We only call when you ask. No spam.</p>

                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors mb-8 shadow-md">
                            Send OTP
                        </button>

                        <p className="text-slate-600 mb-8">
                            Do not have a Propsoch account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign up</a>
                        </p>

                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <p className="text-sm text-slate-500">
                                By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline font-medium">Terms</a> &amp; <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Background decorative sparkle (inspired by screenshot) */}
                <div className="absolute right-0 bottom-0 text-slate-200 pointer-events-none opacity-50 z-0 select-none">
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </div>
            </main>
        </div>
    );
}
