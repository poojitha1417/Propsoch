import React from 'react';
import { Target, FileCheck, Map, Search, Handshake as Deal, Building } from 'lucide-react';

const stages = [
    {
        step: "Stage 1",
        title: "Discovery",
        subtitle: "Tell us about you & your ideal home",
        icon: <Target className="w-8 h-8 text-blue-600" />,
        points: [
            "You can start with the location, budget & purpose",
            "We'll help prioritise your family's top deal-breakers",
            "We'll dig deeper on past homes to tailor the search"
        ]
    },
    {
        step: "Stage 2",
        title: "Shortlisting",
        subtitle: "Cherry-pick from curated options",
        icon: <FileCheck className="w-8 h-8 text-blue-600" />,
        points: [
            "Explore homes sorted by location, builder & budget",
            "Get insights on areas, return potential & floor plans",
            "Cherry-pick the ones you like & book guided visits"
        ]
    },
    {
        step: "Stage 3",
        title: "Site visits",
        subtitle: "Visit sites with our market wizards",
        icon: <Map className="w-8 h-8 text-blue-600" />,
        points: [
            "Assess the project, builder & areas with our wizards",
            "Get latest pricing, availability, offers & legal terms"
        ]
    },
    {
        step: "Stage 4",
        title: "Analysis",
        subtitle: "Foresee design, legal & financial risks",
        icon: <Search className="w-8 h-8 text-blue-600" />,
        points: [
            "Lighting & Ventilation / Vastu Analysis",
            "Builder Pedigree / Construction Delays",
            "Hidden Costs / Legal Troubles"
        ]
    },
    {
        step: "Stage 5",
        title: "Negotiation",
        subtitle: "Negotiate & seal the deal confidently",
        icon: <Deal className="w-8 h-8 text-blue-600" />,
        points: [
            "Negotiate on your behalf.",
            "Secure the best possible offer.",
            "Ensure you book with total peace of mind."
        ]
    },
    {
        step: "Stage 6",
        title: "Home sweet Home",
        subtitle: "Connect with financial & legal experts",
        icon: <Building className="w-8 h-8 text-blue-600" />,
        points: [
            "Title and encumbrance checks",
            "Agreement reviews",
            "Loan offers & more"
        ]
    }
];

export default function JourneyStages() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                        We're with you every <span className="text-blue-600">step of the journey</span>
                    </h2>
                    <p className="text-xl text-slate-600">
                        Lost souls fall prey to FOMO, spam & deceit. Not you. Our experts will guide you home.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stages.map((stage, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                                {React.cloneElement(stage.icon, { className: 'w-32 h-32' })}
                            </div>
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-6 tracking-wide uppercase">
                                    {stage.step}
                                </span>
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {React.cloneElement(stage.icon, { className: 'w-7 h-7 group-hover:text-white transition-colors' })}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{stage.title}</h3>
                                    </div>
                                </div>
                                <p className="text-slate-700 font-medium mb-6 text-lg">
                                    {stage.subtitle}
                                </p>
                                <ul className="space-y-3">
                                    {stage.points.map((point, i) => (
                                        <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
