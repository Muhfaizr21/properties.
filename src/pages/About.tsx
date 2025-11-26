import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alexander Montgomery',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      description: '20+ years in luxury real estate development',
      social: ['💼', '📘', '🐦']
    },
    {
      id: 2,
      name: 'Isabella Rodriguez',
      position: 'Head of Luxury Sales',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      description: 'Specialized in premium properties and VIP clients',
      social: ['💼', '📘', '💎']
    },
    {
      id: 3,
      name: 'James Vanderbilt',
      position: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop&crop=face',
      description: 'Pioneering proptech solutions for elite market',
      social: ['💼', '🔗', '🚀']
    },
    {
      id: 4,
      name: 'Sophia Chen',
      position: 'Client Experience Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      description: 'Ensuring unparalleled service for discerning clients',
      social: ['💼', '✨', '🌟']
    }
  ];

  const stats = [
    { number: '1.2K+', label: 'Luxury Properties', suffix: 'Listings', color: 'from-yellow-400 to-orange-400' },
    { number: '250+', label: 'Elite Agents', suffix: 'Network', color: 'from-purple-400 to-pink-400' },
    { number: '75K+', label: 'Premium Clients', suffix: 'Served', color: 'from-blue-400 to-cyan-400' },
    { number: '25+', label: 'Prime Locations', suffix: 'Cities', color: 'from-green-400 to-emerald-400' }
  ];

  const values = [
    {
      icon: '💎',
      title: 'Excellence',
      description: 'Uncompromising quality in every property and service we deliver'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Complete transparency and honesty in all our transactions'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Pioneering technology for superior real estate experiences'
    },
    {
      icon: '👑',
      title: 'Service',
      description: 'White-glove treatment for our discerning clientele'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded with vision to revolutionize luxury real estate', icon: '🚀' },
    { year: '2021', event: 'Expanded to 10 major cities across Indonesia', icon: '🏙️' },
    { year: '2022', event: 'Launched exclusive VIP client program', icon: '👑' },
    { year: '2023', event: 'Reached 1,000+ luxury property listings', icon: '💎' },
    { year: '2024', event: 'Pioneering AI-powered property matching', icon: '🤖' }
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
              <span className="text-yellow-400 text-2xl">✨</span>
              <span className="tracking-widest uppercase">The PropertyKu Legacy</span>
              <span className="text-yellow-400 text-2xl">✨</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Redefining
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                Luxury
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                Real Estate
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
              PropertyKu stands as the pinnacle of luxury property platforms, connecting discerning individuals 
              with exceptional real estate opportunities through unparalleled service and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Luxury Stats Section */}
      <section className="py-24 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,215,0,0.03)_50%,transparent_52%)] bg-[length:80px_80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group text-center p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-slate-200"
                style={{ 
                  animation: `luxuryFadeIn 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500`}>
                  {stat.number}
                </div>
                <div className="text-slate-800 font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-slate-500 text-sm font-light tracking-widest uppercase">
                  {stat.suffix}
                </div>
                
                {/* Animated Underline */}
                <div className={`w-0 h-1 bg-gradient-to-r ${stat.color} mx-auto mt-4 group-hover:w-16 transition-all duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story - Luxury Version */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.03),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-bold mb-6">
                  <span className="text-lg">📖</span>
                  OUR JOURNEY
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                  The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PropertyKu</span> Story
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light">
                <p>
                  Founded in 2020 with a visionary approach to luxury real estate, PropertyKu emerged 
                  from a simple yet powerful idea: to create a platform where exceptional properties 
                  meet discerning buyers through technology and unparalleled service.
                </p>
                <p>
                  What began as a boutique service for elite clients has evolved into Indonesia's 
                  premier luxury property platform, setting new standards in real estate excellence 
                  and client experience.
                </p>
                <p>
                  Today, we stand as the trusted partner for luxury property transactions, 
                  combining cutting-edge technology with personalized service to deliver 
                  exceptional results for our distinguished clientele.
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                      {milestone.icon}
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold text-lg">{milestone.year}</div>
                      <div className="text-slate-600 text-sm">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop"
                  alt="Our Story"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 p-8 rounded-3xl shadow-2xl transform rotate-6">
                <div className="text-4xl font-black">4+</div>
                <div className="text-sm font-bold tracking-widest uppercase">Years of Excellence</div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - Luxury Design */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[length:100px_100px] bg-[linear-gradient(45deg,transparent_45%,#ffffff_50%,transparent_55%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-yellow-400 text-2xl">🌟</span>
              OUR CORE VALUES
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              The <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Pillars</span> of Excellence
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              These fundamental principles guide every decision we make and every service we provide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative text-center p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 transform hover:-translate-y-6 transition-all duration-500 overflow-hidden"
                style={{ 
                  animation: `luxurySlideIn 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <span className="text-3xl text-white">{value.icon}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/30 via-orange-400/30 to-pink-500/30 rounded-3xl blur-2xl group-hover:scale-125 transition-all duration-500"></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-black text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-orange-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Team Section */}
      <section className="py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-bold mb-8">
              <span className="text-lg">👑</span>
              LEADERSHIP TEAM
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              Meet Our <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Elite</span> Team
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Industry veterans and visionaries dedicated to redefining luxury real estate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="group text-center p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 border border-slate-200"
              >
                {/* Image */}
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-2xl object-cover border-4 border-slate-200 group-hover:border-yellow-400 transition-all duration-500 shadow-lg"
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                  </div>
                </div>
                
                {/* Info */}
                <h3 className="text-xl font-black text-slate-900 mb-2">{member.name}</h3>
                <p className="text-yellow-600 font-bold mb-3 tracking-wide">{member.position}</p>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                
                {/* Social */}
                <div className="flex justify-center space-x-3">
                  {member.social.map((icon, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-yellow-100 hover:text-slate-800 transition-all duration-300 transform hover:scale-110"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section className="relative py-32 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_60%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-sm font-light mb-8">
              <span className="text-yellow-400 text-2xl">💫</span>
              JOIN THE ELITE
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready to <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Elevate</span> Your Real Estate Journey?
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Whether you're seeking exceptional properties, partnership opportunities, 
              or a career in luxury real estate, we welcome you to experience the PropertyKu difference.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                to="/contact"
                className="group relative bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-12 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105 font-black text-lg shadow-2xl hover:shadow-3xl overflow-hidden min-w-[250px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-2xl">👑</span>
                  Connect With Us
                </span>
              </Link>
              
              <Link
                to="/properties"
                className="group relative border-2 border-white/30 text-white px-12 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105 font-bold text-lg backdrop-blur-xl overflow-hidden min-w-[250px]"
              >
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-xl">💎</span>
                  Explore Properties
                  <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>
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
        
        @keyframes luxurySlideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default About;