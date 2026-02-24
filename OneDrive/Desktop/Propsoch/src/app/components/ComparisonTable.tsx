import React from 'react';
import { Check, X } from 'lucide-react';

const comparisonData = [
    { feature: "Information Depth", propsoch: "80+ data points", portals: "20-40 data points" },
    { feature: "Transparency", propsoch: "Detailed pros & cons", portals: "Only pros highlighted" },
    { feature: "Data Accuracy", propsoch: "Verified by architects", portals: "Loose verification" },
    { feature: "Service Validity", propsoch: "Till you find your home", portals: "Based on no. of contacts" },
    { feature: "Data Sources", propsoch: "RERA, GMaps, CDP etc.", portals: "Added by developer & broker" }
];

export default function ComparisonTable() {
    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                        What makes us <span className="text-blue-600">different?</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Our homebuyers say we're refreshing, intelligent and supportive. Here's why.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 md:p-8 bg-slate-50 border-b border-r border-slate-200 text-slate-500 font-semibold w-1/3">
                                        What you care about
                                    </th>
                                    <th className="p-6 md:p-8 bg-blue-600 border-b border-blue-700 text-white font-bold text-xl md:text-2xl w-1/3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-white text-blue-600 rounded flex items-center justify-center text-sm font-bold">P</div>
                                            Propsoch
                                        </div>
                                    </th>
                                    <th className="p-6 md:p-8 bg-slate-100 border-b border-slate-200 text-slate-700 font-bold w-1/3">
                                        Online portals
                                        <span className="block text-xs font-normal text-slate-500 mt-1">
                                            (Housing/99Acres/Magicbricks)
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-6 border-b border-r border-slate-200 font-medium text-slate-900">
                                            {row.feature}
                                        </td>
                                        <td className="p-6 border-b border-slate-200 bg-blue-50/50">
                                            <div className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                                <span className="font-semibold text-slate-900">{row.propsoch}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 border-b border-slate-200">
                                            <div className="flex items-start gap-3">
                                                <X className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                                <span className="text-slate-600">{row.portals}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
