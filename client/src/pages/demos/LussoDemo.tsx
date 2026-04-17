export default function LussoDemo() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden font-sans selection:bg-[#c9a96e] selection:text-black">
      {/* ───── Top Nav ───── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <a href="#" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 12v18h10v-10h8v10h10V12L16 2z" stroke="#c9a96e" strokeWidth="2" fill="none" />
            <rect x="12" y="16" width="8" height="6" fill="#c9a96e" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold tracking-[0.15em] text-sm md:text-base">LUSSO</span>
            <span className="text-[#c9a96e] text-[10px] md:text-xs tracking-[0.2em] uppercase">Homes Accra</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8 text-white/75 text-sm tracking-wide">
          <a href="#portfolio" className="hover:text-[#c9a96e] transition-colors">Portfolio</a>
          <a href="#services" className="hover:text-[#c9a96e] transition-colors">Services</a>
          <a href="#properties" className="hover:text-[#c9a96e] transition-colors">Properties</a>
          <a href="#about" className="hover:text-[#c9a96e] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#c9a96e] transition-colors">Contact</a>
        </div>

        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#c9a96e]">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </nav>

      {/* ───── Hero ───── */}
      <section className="relative min-h-screen w-full">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop"
          alt="Luxury modern home in Accra"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-16">
          <div className="max-w-4xl">
            <h1 className="font-black tracking-tight leading-[0.95] text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
              <span className="block">Find Your</span>
              <span className="block">Dream Home</span>
              <span className="block">In Accra's</span>
              <span className="block text-[#c9a96e]">Best Addresses</span>
            </h1>

            <p className="mt-8 text-white/70 text-sm md:text-base tracking-[0.2em] uppercase">
              Services: Listings | Sales | Property Management | Investment
            </p>

            {/* Property Cards Row */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { name: 'Villagio Vista', price: '$950K', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&h=150&fit=crop' },
                { name: 'Cantonments Estate', price: '$1.2M', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=150&fit=crop' },
                { name: 'Airport Residential Villa', price: '$1.5M', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=150&fit=crop' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:border-[#c9a96e] transition-colors cursor-pointer">
                  <img src={p.img} alt={p.name} className="w-16 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white text-sm font-medium">{p.name}</p>
                    <p className="text-[#c9a96e] text-xs font-bold">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 md:mt-0 md:absolute md:bottom-10 md:right-10 lg:bottom-14 lg:right-16">
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-full border border-[#c9a96e] bg-black/70 backdrop-blur-sm px-10 py-4 text-white font-bold tracking-[0.2em] text-sm hover:bg-[#c9a96e] hover:text-black transition-all duration-300">
              INQUIRE NOW
              <span className="text-[#c9a96e] group-hover:text-black">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───── Featured Properties ───── */}
      <section id="properties" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Featured Listings</p>
              <h2 className="text-4xl md:text-5xl font-black text-white">Exclusive<span className="text-[#c9a96e]"> Properties</span></h2>
            </div>
            <a href="#" className="text-[#c9a96e] text-sm font-medium hover:underline mt-4 md:mt-0">View All Properties →</a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Villagio Vista', location: 'East Legon', price: '$950,000', beds: 4, baths: 4, sqft: '3,500', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop', tag: 'For Sale' },
              { name: 'Cantonments Estate', location: 'Cantonments', price: '$1,200,000', beds: 5, baths: 5, sqft: '4,200', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', tag: 'For Sale' },
              { name: 'Airport Residential Villa', location: 'Airport Residential', price: '$1,500,000', beds: 6, baths: 6, sqft: '5,000', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop', tag: 'Premium' },
              { name: 'Labone Heights', location: 'Labone', price: '$750,000', beds: 3, baths: 3, sqft: '2,800', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop', tag: 'For Sale' },
              { name: 'Ridge Luxury Apartment', location: 'Ridge', price: '$2,500/mo', beds: 2, baths: 2, sqft: '1,800', img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop', tag: 'For Rent' },
              { name: 'Osu Penthouse', location: 'Osu', price: '$1,800,000', beds: 4, baths: 4, sqft: '4,500', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop', tag: 'Luxury' },
            ].map((p, i) => (
              <div key={i} className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c9a96e] transition-all duration-300">
                <div className="relative">
                  <img src={p.img} alt={p.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#c9a96e] text-black text-xs font-bold px-3 py-1 rounded-full">{p.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-white/60 text-sm mb-4">📍 {p.location}</p>
                  <div className="flex gap-4 text-white/70 text-sm mb-4">
                    <span>🛏 {p.beds} Beds</span>
                    <span>🚿 {p.baths} Baths</span>
                    <span>📐 {p.sqft} sqft</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <p className="text-[#c9a96e] text-2xl font-black">{p.price}</p>
                    <button className="text-white/70 hover:text-[#c9a96e] transition-colors">Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Services ───── */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Our<span className="text-[#c9a96e]"> Services</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏠', title: 'Property Sales', desc: 'Buy and sell premium residential and commercial properties in Accra\'s prime locations.' },
              { icon: '📋', title: 'Property Listings', desc: 'Exclusive access to off-market properties and new developments before they hit the market.' },
              { icon: '🔑', title: 'Property Management', desc: 'Full-service management for landlords including tenant screening, maintenance, and rent collection.' },
              { icon: '📈', title: 'Investment Advisory', desc: 'Expert guidance on real estate investments, market analysis, and portfolio diversification.' },
            ].map((s, i) => (
              <div key={i} className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center hover:border-[#c9a96e] transition-all duration-300">
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Why Choose Us ───── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Why Lusso Homes</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Accra's Premier<br /><span className="text-[#c9a96e]">Real Estate Partner</span></h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              With over a decade of experience in Ghana's luxury real estate market, Lusso Homes Accra has established 
              itself as the trusted partner for discerning buyers, sellers, and investors.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Our deep understanding of Accra's prime neighborhoods — from Cantonments to Airport Residential, 
              East Legon to Labone — ensures you find not just a property, but a home that matches your lifestyle.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <p className="text-4xl font-black text-[#c9a96e]">500+</p>
                <p className="text-white/60">Properties Sold</p>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <p className="text-4xl font-black text-[#c9a96e]">$200M+</p>
                <p className="text-white/60">Sales Volume</p>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <p className="text-4xl font-black text-[#c9a96e]">98%</p>
                <p className="text-white/60">Client Satisfaction</p>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <p className="text-4xl font-black text-[#c9a96e]">12+</p>
                <p className="text-white/60">Years Experience</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop" alt="Luxury home interior" className="rounded-2xl w-full h-[600px] object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-[#c9a96e] text-black px-8 py-6 rounded-xl">
              <p className="text-4xl font-black">#1</p>
              <p className="text-sm font-medium">Luxury Agency</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">What Our<span className="text-[#c9a96e]"> Clients Say</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
            { name: 'Dr. Kwame Asante', role: 'Business Owner', avatar: 'https://images.unsplash.com/photo-1578376026533-4e5e1bf14824?w=200&h=200&fit=crop&crop=face', text: 'Lusso Homes made buying our family home in East Legon seamless. Their knowledge of the market and attention to our needs was exceptional.' },
              { name: 'Akua Mitchell', role: 'Diplomat', avatar: 'https://images.unsplash.com/photo-1589156206699-bc21e38c8ee5?w=200&h=200&fit=crop&crop=face', text: 'As an expat, I needed someone I could trust. Lusso Homes found us the perfect apartment in Cantonments within two weeks.' },
              { name: 'Emmanuel Boateng', role: 'Investor', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face', text: 'I\'ve worked with them on multiple investment properties. Their market insights and professional service are unmatched in Accra.' },
            ].map((t, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                <div className="text-[#c9a96e] text-xl mb-4">★★★★★</div>
                <p className="text-white/80 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Contact ───── */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start Your<br /><span className="text-[#c9a96e]">Property Journey</span></h2>
            <p className="text-white/70 text-lg mb-8">
              Whether you're buying, selling, or investing, our team is ready to help you navigate Accra's luxury real estate market.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">📍</div>
                <div><p className="text-white font-medium">Office</p><p className="text-white/60">Cantonments, Accra, Ghana</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">📞</div>
                <div><p className="text-white font-medium">Phone</p><p className="text-white/60">+233 54 449 0241</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">✉️</div>
                <div><p className="text-white font-medium">Email</p><p className="text-white/60">info@lussohomesaccra.com</p></div>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Request Information</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none" />
                <input type="text" placeholder="Last Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none" />
              <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a96e] focus:outline-none">
                <option value="">I'm interested in...</option>
                <option>Buying a Property</option>
                <option>Selling a Property</option>
                <option>Property Management</option>
                <option>Investment Advisory</option>
              </select>
              <textarea placeholder="Tell us more about what you're looking for..." rows={4} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none"></textarea>
              <button type="submit" className="w-full bg-[#c9a96e] text-black font-bold py-4 rounded-xl hover:bg-[#b8965e] transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="py-16 px-6 md:px-16 lg:px-24 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L2 12v18h10v-10h8v10h10V12L16 2z" stroke="#c9a96e" strokeWidth="2" fill="none" />
                  <rect x="12" y="16" width="8" height="6" fill="#c9a96e" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-bold tracking-[0.15em] text-sm">LUSSO</span>
                  <span className="text-[#c9a96e] text-[10px] tracking-[0.2em] uppercase">Homes Accra</span>
                </div>
              </div>
              <p className="text-white/60 max-w-sm">Accra's premier luxury real estate agency. We connect discerning clients with exceptional properties in Ghana's most prestigious neighborhoods.</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#properties" className="hover:text-[#c9a96e] transition-colors">Properties</a></li>
                <li><a href="#services" className="hover:text-[#c9a96e] transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-[#c9a96e] transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-[#c9a96e] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>Cantonments, Accra</li>
                <li>+233 54 449 0241</li>
                <li>info@lussohomesaccra.com</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2025 Lusso Homes Accra. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-[#c9a96e] transition-colors">Instagram</a>
              <a href="#" className="text-white/60 hover:text-[#c9a96e] transition-colors">LinkedIn</a>
              <a href="https://wa.me/233544490241" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a96e] transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
