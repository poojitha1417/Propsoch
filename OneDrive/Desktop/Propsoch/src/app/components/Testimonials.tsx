import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        name: "Abhipsha Jana",
        role: "Product Management @TATA Communications",
        text: "If you're thinking of buying a house and are daunted by the whole process of searching, setting up visits and deciding which property is worthy of your investment, you should reach out to them. The real-estate market is full of brokers that will spam call you to death, who only want to sell you a property, sometimes even without taking your requirements into consideration. PropSoch takes a refreshing approach with the buyer's requirement at the centre, and the entire home buying journey becomes hassle-free to the point of being enjoyable."
    },
    {
        name: "Ankur Anand",
        role: "Intelligent Homebuyer",
        text: "Had a great experience with them. They were with me throughout the journey, right from the sourcing of the options, going over the pros and cons, site visits and then helping my shortlist based on my requirements. Prashant and Stuti were very prompt in their communications, answered my query with patience and the right details and always helped me move forward with the right facts and details about each project. Would highly recommend them for anyone starting their real estate investment journey"
    },
    {
        name: "Ankita Srivastava",
        role: "Intelligent Homebuyer",
        text: "Propsoch: A name we will remember throughout our life. Despite juggling between busy schedule and aimlessly looking for the flats on weekends along with random brokers and third party, little did we know about checkpoints for our 'dream home' in our not so tiny head. Now we were more clear and foussed on what we wanted with their help. Stuti, explored solutions to all my important & silly questions. Prashant, with his unwavering guidance, helped us out during site visits."
    },
    {
        name: "Pratik Dongaonkar",
        role: "Marketing Director @TMRW",
        text: "Fantastic team, they simplify and ease the process of decision making. Ashish along with his team Stuti and Prashanth were very helpful in enabling our decision. They have a very refreshing approach to home searching and at no point were they salesy or pushing you for vested interests. In fact they called out certain no-gos that helped. Anyone who is serious about house searching should look no further"
    },
    {
        name: "Divya Bhansali",
        role: "Intelligent Homebuyer",
        text: "Absolutely amazing experience with Propsoch team!!! I was lookin for a plot to invest in North Bangalore and trust me, these guys know what they're doing. I wasn't sure where to start but they guided me through the whole thing with so much patience & detail, explaining all the complicated stuff with ease. Their insights were mind-blowing! It was not just like working with a consultant, but more like a partner who really cared bout my investment."
    }
];

export default function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Hear from your fellow homeowners.
                        </h2>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            1000+ intelligent homebuyers trusted us with their biggest life decision because we helped them know if it was the right one.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-white outline-none"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-white outline-none"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="min-w-[320px] md:min-w-[400px] bg-slate-800 p-8 rounded-2xl snap-start border border-slate-700 hover:border-slate-500 transition-colors"
                        >
                            <div className="flex text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-slate-300 mb-8 leading-relaxed h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                "{t.text}"
                            </p>
                            <div>
                                <p className="font-bold text-lg text-white">{t.name}</p>
                                <p className="text-sm text-slate-400">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
