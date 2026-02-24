import React from 'react';
import Image from 'next/image';

const resources = [
    {
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Modern building exterior
        tag: "Blog",
        title: "2025 Bangalore Real Estate",
        desc: "Explore micro-markets, price trends & upcoming hotspots."
    },
    {
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", // Desk, calc, paperwork
        tag: "Blog",
        title: "Home Buying Checklist",
        desc: "Navigate the home buying journey with confidence - from property search to final paperwork."
    },
    {
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80", // Couple touring a house
        tag: "Blog",
        title: "Home Buying Guide 101",
        desc: "Track your purchase journey with an essential checklist of documents, inspections, and key milestones"
    }
];

export default function ResourcesSection() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <p className="text-blue-600 font-medium mb-3">Join an exclusive club of empowered homebuyers</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-2xl leading-tight">
                        Empower yourself with our guides, hacks &amp; resources
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer group flex flex-col h-full transform hover:-translate-y-1">
                            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-blue-600 text-sm font-semibold mb-3">{item.tag}</span>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
