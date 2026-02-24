"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, CheckCircle2, Home, Scale, Calculator, Search, Sun, PenTool, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Testimonials from "./components/Testimonials";
import JourneyStages from "./components/JourneyStages";
import ComparisonTable from "./components/ComparisonTable";
import SmartSaveSection from "./components/SmartSaveSection";
import PeaceOfMind from "./components/PeaceOfMind";
import ResourcesSection from "./components/ResourcesSection";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  const services = [
    { icon: <Calculator className="w-6 h-6" />, title: "Home Loan Offers", desc: "Get the best negotiated interest rates from top banks." },
    { icon: <Scale className="w-6 h-6" />, title: "Legal Due Diligence", desc: "Thorough property background checks by expert lawyers." },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Tax Planning", desc: "Optimize your real estate investments for maximum tax savings." },
    { icon: <Search className="w-6 h-6" />, title: "Quality Inspection", desc: "Comprehensive structural and finishing audits before handover." },
    { icon: <Sun className="w-6 h-6" />, title: "Vastu Advisors", desc: "Consultations with renowned Vastu experts for your peace of mind." },
    { icon: <PenTool className="w-6 h-6" />, title: "Interior Designers", desc: "End-to-end interior design and execution services." }
  ];

  const faqs = [
    { q: "What is Propsoch?", a: "Propsoch is Bangalore & Mumbai's smartest real estate advisory service representing homebuyers. We help you find, vet, and buy your dream home with zero bias." },
    { q: "How are you different from brokers?", a: "Unlike brokers who represent developers, we represent YOU. We provide deep data insights, legal checks, and negotiation support to save you money." },
    { q: "Do you charge a fee?", a: "We believe in transparent pricing. We charge a fixed advisory fee, meaning our incentives aren't tied to the property's price." },
    { q: "What areas do you cover?", a: "We currently cover all major micro-markets across Bangalore and Mumbai, focusing on premium and luxury segments." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">P</div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">Propsoch</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Why Propsoch?</a>
              <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#faq" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Insights</a>
              <Link href="/login" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5" aria-label="Login to dashboard">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Bangalore &amp; Mumbai&apos;s smartest real estate service
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Visit curated homes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                negotiate smarter
              </span><br /> &amp; buy intelligently.
            </h1>

            <p className="text-xl text-slate-600 max-w-lg leading-relaxed mb-10">
              Get end-to-end guidance from property wizards who&apos;ve helped intelligent homebuyers like you buy 200+ homes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/get-started" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-1 block text-center">
                Talk to an Advisor
              </Link>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full font-semibold text-lg transition-all shadow-sm flex items-center justify-center"
              >
                See how it works
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
              <div>
                <p className="text-2xl font-bold text-slate-900">1000+</p>
                <p className="text-sm text-slate-500 font-medium">Trusted by homebuyers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2750+</p>
                <p className="text-sm text-slate-500 font-medium">Hours of Advice</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">520M+</p>
                <p className="text-sm text-slate-500 font-medium">Sq. Feet Analyzed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">210+</p>
                <p className="text-sm text-slate-500 font-medium">Partner Builders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500 font-medium">Projects Across Bangalore</p>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100">
            {/* Using a placeholder layout since we don't have a real image asset of a house right now, 
                 but keeping the Next.js <Image /> component strictly as requested */}
            <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Premium modern home exterior representing curated real estate"
              fill
              className="object-cover z-10"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SmartSaveSection />
      <Testimonials />
      <JourneyStages />
      <ComparisonTable />

      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`bg-white p-8 rounded-2xl border ${idx === 0 ? 'border-blue-500 border-2' : 'border-slate-200'} hover:border-blue-500 transition-all cursor-pointer flex flex-col h-full`}
                tabIndex={0}
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PeaceOfMind />

      {/* Community Section from Propsoch */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join an exclusive club of empowered homebuyers
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Hometrust Collective: An exclusive community of buyers, owners & experts who help each other stay updated about the market
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all outline-none focus:ring-4 focus:ring-blue-300">
              Join Bangalore Community
            </a>
            <a href="#" className="px-8 py-4 bg-blue-700 text-white border border-blue-500 rounded-full font-bold hover:bg-blue-800 hover:border-white transition-all outline-none focus:ring-4 focus:ring-blue-300">
              Join Mumbai Community
            </a>
          </div>
        </div>
      </section>

      <ResourcesSection />

      {/* Accessible FAQ Section */}
      <section id="faq" className="py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              99% of your queries should get answered here.
            </h2>
            <p className="text-slate-600">
              Everything you need to know about how Propsoch works.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 py-4 border-t border-slate-100" : "max-h-0"}`}
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center p-8 bg-blue-50 rounded-3xl border border-blue-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-6">Our property experts are standing by to help you.</p>
            <Link href="/get-started" className="inline-block px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
              Contact an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction SEO Footer Section */}
      <section className="py-20 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white text-2xl font-bold">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">P</div>
                Propsoch
              </div>
              <p className="mb-6 leading-relaxed">
                Propsoch is an intelligent homebuyer's concierge and their true friend. Propsoch is designed to eliminate stress and bring transparency to your homebuying journey.
              </p>
              <p className="leading-relaxed">
                Whether you're exploring an apartment for sale in Bangalore or checking the Mumbai real estate prices before a big decision, we offer personalized property recommendations, verified insights, and end-to-end guidance.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Top Locations</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Bangalore (Whitefield, HSR...)</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mumbai (Bandra, BKC...)</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Flats for sale in Bangalore</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mumbai real estate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Popular Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Guided Home Buying</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Peace of Mind (POM) Reports</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Property Comparison Tool</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Loyalty Reward Calculator</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-slate-950 py-12 text-center text-slate-500 border-t border-slate-800">
        <p className="text-sm">Thinkr Proptech Private Limited</p>
        <p className="text-sm mt-2">RERA: PRM/KA/RERA/1251/446/AG/220927/003103</p>
        <p className="text-sm mt-6">Built with Next.js &amp; Tailwind. © {new Date().getFullYear()}</p>
      </footer>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsVideoOpen(false)}
          ></div>
          <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/20"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-slate-900">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/RqBYQJRqUXs?autoplay=1"
                title="Propsoch Guided Homebuying Program"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
