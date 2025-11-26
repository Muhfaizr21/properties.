import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! Our luxury concierge team will contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'Concierge Line',
      details: '(021) 1234-5678',
      description: 'Dedicated luxury support team',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: '✉️',
      title: 'Premium Email',
      details: 'concierge@propertyku.com',
      description: 'Priority response within 2 hours',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: '🏢',
      title: 'Headquarters',
      details: 'SCBD Tower, Jakarta',
      description: 'Luxury business district',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: '💎',
      title: 'VIP Service',
      details: 'By Appointment',
      description: 'Personalized consultations',
      color: 'from-green-400 to-emerald-400'
    }
  ];

  const faqs = [
    {
      question: 'How do I schedule a private property viewing?',
      answer: 'Our VIP concierge team can arrange private viewings at your convenience. Contact us to schedule an exclusive tour with one of our luxury property specialists.'
    },
    {
      question: 'What makes PropertyKu different from other real estate platforms?',
      answer: 'We specialize in luxury properties and offer white-glove service, exclusive listings, personalized matching, and dedicated support for discerning clients.'
    },
    {
      question: 'Do you offer international property services?',
      answer: 'Yes, we have partnerships with luxury real estate agencies worldwide and can assist with international property acquisitions and investments.'
    },
    {
      question: 'How can I become a preferred partner agent?',
      answer: 'We select only the top-performing agents with proven luxury market experience. Contact our partnership team to discuss eligibility and benefits.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Luxury Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.15),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-yellow-400 text-2xl">💎</span>
              <span className="tracking-widest uppercase">Premium Concierge Service</span>
              <span className="text-yellow-400 text-2xl">💎</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Connect With
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
              Experience white-glove service from our dedicated luxury concierge team. 
              Whether you're buying, selling, or seeking investment opportunities, we provide personalized solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Luxury Contact Methods */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,215,0,0.02)_50%,transparent_52%)] bg-[length:60px_60px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="group text-center p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-slate-200"
                style={{ 
                  animation: `luxuryFadeIn 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${method.color} rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <span className="text-3xl text-white">{method.icon}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${method.color} rounded-3xl blur-2xl group-hover:scale-125 transition-all duration-500 opacity-30`}></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-black text-slate-900 mb-3">{method.title}</h3>
                <p className="text-slate-700 font-bold text-lg mb-2">{method.details}</p>
                <p className="text-slate-500 text-sm font-light">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Luxury Info */}
      <section className="py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Luxury Contact Form */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-bold mb-6">
                  <span className="text-lg">✉️</span>
                  SEND US A MESSAGE
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                  Get <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Personalized</span> Assistance
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our luxury concierge team is ready to provide you with exceptional service and expert guidance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 shadow-sm"
                      placeholder="Alexander Montgomery"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 shadow-sm"
                      placeholder="alexander@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 shadow-sm"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 shadow-sm appearance-none"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="luxury-buying">Luxury Property Purchase</option>
                      <option value="premium-listing">Premium Property Listing</option>
                      <option value="investment">Investment Consultation</option>
                      <option value="vip-service">VIP Concierge Service</option>
                      <option value="partnership">Strategic Partnership</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 shadow-sm resize-none"
                    placeholder="Please share details about your luxury property needs, preferred locations, budget range, and any specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105 font-black text-lg shadow-2xl hover:shadow-3xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">🚀</span>
                        Send Premium Message
                        <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>

            {/* Luxury Info Sidebar */}
            <div className="space-y-8">
              {/* Premium Office Map */}
              <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl">
                <div className="h-80 bg-slate-800 flex items-center justify-center relative">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl mb-4">🏙️</div>
                    <h3 className="text-2xl font-black mb-2">SCBD Headquarters</h3>
                    <p className="text-gray-300 font-light">Luxury Business District</p>
                    <p className="text-gray-400 text-sm mt-2">Sudirman Central Business District, Jakarta</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                    PREMIUM LOCATION
                  </div>
                </div>
              </div>

              {/* VIP Office Info */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-yellow-500">👑</span>
                  VIP Headquarters
                </h3>
                <div className="space-y-4 text-slate-600">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                    <span className="text-2xl text-yellow-500">🏢</span>
                    <div>
                      <div className="font-bold text-slate-800">SCBD Tower, 28th Floor</div>
                      <div className="text-sm">Jl. Jend. Sudirman Kav. 52-53</div>
                      <div className="text-sm">Jakarta Selatan 12190</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <span className="text-2xl text-yellow-500">📞</span>
                    <div>
                      <div className="font-bold text-slate-800">+62 21 1234 5678</div>
                      <div className="text-sm">Concierge Hotline</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <span className="text-2xl text-yellow-500">✉️</span>
                    <div>
                      <div className="font-bold text-slate-800">concierge@propertyku.com</div>
                      <div className="text-sm">Priority Response</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <span className="text-2xl text-yellow-500">🕒</span>
                    <div>
                      <div className="font-bold text-slate-800">24/7 VIP Service</div>
                      <div className="text-sm">By appointment</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elite Partnership CTA */}
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-slate-900 shadow-2xl">
                <h3 className="text-2xl font-black mb-4">Elite Partnership Program</h3>
                <p className="mb-6 font-medium leading-relaxed">
                  Join our exclusive network of luxury real estate professionals and access premium clients, advanced tools, and higher commissions.
                </p>
                <Link
                  to="/register"
                  className="block w-full bg-slate-900 text-white text-center py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
                >
                  Apply for Partnership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[length:80px_80px] bg-[linear-gradient(45deg,transparent_45%,#ffffff_50%,transparent_55%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-yellow-400 text-2xl">💫</span>
              PREMIUM SUPPORT
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Luxury <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Concierge</span> FAQ
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Answers to common questions about our premium services and exclusive offerings
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-500"
              >
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-3">
                  <span className="text-yellow-400 text-2xl">❔</span>
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <style>{`
        @keyframes luxuryFadeIn {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Contact;