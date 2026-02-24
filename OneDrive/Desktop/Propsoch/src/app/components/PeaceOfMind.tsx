import React from 'react';
import Link from 'next/link';

export default function PeaceOfMind() {
    return (
        <section className="py-12 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3 tracking-tight">
                            All this &amp; lot more, for your peace of mind
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Insights you won't find anywhere else on locations, builders &amp; projects
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                        <a href="https://d1zk2x7mtoyb2b.cloudfront.net/websiteAssets/sample-report.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-sm text-center">
                            See Sample Report
                        </a>
                        <Link href="/get-started" className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl font-bold transition-colors shadow-sm text-center">
                            Book An Appointment
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
