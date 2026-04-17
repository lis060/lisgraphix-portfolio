export default function EleganceDemo() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden font-sans selection:bg-[#c9a96e] selection:text-black">
      {/* ───── Top Nav ───── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <a href="#" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <line x1="5" y1="5" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="23" y1="5" x2="5" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="6.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="21.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold tracking-[0.2em] text-sm md:text-base">ELEGANCE</span>
            <span className="text-white/60 text-[10px] md:text-xs tracking-[0.3em] uppercase">Barbering &amp; Spa</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8 text-white/75 text-sm tracking-wide">
          <a href="#about" className="hover:text-white transition-colors">about</a>
          <a href="#services" className="hover:text-white transition-colors">services</a>
          <a href="#gallery" className="hover:text-white transition-colors">gallery</a>
          <a href="#pricing" className="hover:text-white transition-colors">pricing</a>
          <a href="#team" className="hover:text-white transition-colors">team</a>
          <a href="#contact" className="hover:text-white transition-colors">contact</a>
        </div>

        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </nav>

      {/* ───── Hero ───── */}
      <section className="relative min-h-screen w-full">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1800&h=1200&fit=crop"
          alt="Premium barber straight razor shave"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-16">
          <h1 className="font-black tracking-tight leading-[0.88] text-white text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] uppercase">
            <span className="block">Premium</span>
            <span className="block">Groom</span>
            <span className="block">Grooming</span>
            <span className="block">Experience</span>
          </h1>

          <div className="mt-10 md:mt-14">
            <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-5">
              Services:&nbsp;&nbsp;Haircut&nbsp; | &nbsp;Hot Shave&nbsp; | &nbsp;Grooming&nbsp; | &nbsp;Spa
            </p>

            <div className="flex items-center gap-6 md:gap-8 text-white/90">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="8" rx="1.5" /><path d="M6 12v4M18 12v4M4 20h16M8 16h8" /></svg>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14l10-10 3 3-10 10z" /><path d="M14 17l7-7" /></svg>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="4" /><path d="M5 21c0-4 3-7 7-7s7 3 7 7" /><path d="M9 10h.01M15 10h.01" /></svg>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M20 20L8.12 8.12" /></svg>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><path d="M9 5h6l1 3v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l1-3z" /><path d="M9 13h6" /></svg>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4c0-1 2-2 5-2s5 1 5 2v4H7V4z" /><rect x="8" y="8" width="8" height="3" rx="1" /><path d="M9 11l1 10h4l1-10" /></svg>
            </div>
          </div>

          <div className="mt-12 md:mt-0 md:absolute md:bottom-10 md:right-10 lg:bottom-14 lg:right-16">
            <a href="#booking" className="group inline-flex items-center gap-3 rounded-full border border-[#c9a96e] bg-black/70 backdrop-blur-sm px-9 py-4 text-white font-bold tracking-[0.25em] text-sm md:text-base hover:bg-[#c9a96e] hover:text-black transition-all duration-300">
              BOOK NOW
              <span className="text-[#c9a96e] group-hover:text-black text-lg">✦</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───── About ───── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=1000&fit=crop" alt="Barbershop interior" className="rounded-2xl w-full h-[500px] object-cover" />
            <div className="absolute -bottom-6 -right-6 bg-[#c9a96e] text-black px-8 py-6 rounded-xl">
              <p className="text-4xl font-black">5+</p>
              <p className="text-sm font-medium">Years of Excellence</p>
            </div>
          </div>
          <div>
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">About Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Where Style Meets<br /><span className="text-[#c9a96e]">Sophistication</span></h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              ELEGANCE Barbering &amp; Spa is more than just a barbershop — it is a destination for the modern gentleman. 
              We combine traditional barbering techniques with contemporary style to deliver an unparalleled grooming experience.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Our master barbers are trained in the art of precision cutting, hot towel shaves, and luxury spa treatments. 
              Every visit is designed to be a moment of relaxation and transformation.
            </p>
            <div className="flex gap-8">
              <div><p className="text-3xl font-black text-[#c9a96e]">2000+</p><p className="text-white/60 text-sm">Happy Clients</p></div>
              <div><p className="text-3xl font-black text-[#c9a96e]">15+</p><p className="text-white/60 text-sm">Expert Barbers</p></div>
              <div><p className="text-3xl font-black text-[#c9a96e]">4.9</p><p className="text-white/60 text-sm">Google Rating</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Services ───── */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Premium Grooming<br /><span className="text-[#c9a96e]">Services</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✂', title: 'Precision Haircut', desc: 'Classic & modern cuts tailored to your face shape and style preference.', price: 'GHS 80' },
              { icon: '🪒', title: 'Hot Towel Shave', desc: 'Traditional straight razor shave with hot towels and premium oils.', price: 'GHS 100' },
              { icon: '🧔', title: 'Beard Grooming', desc: 'Beard shaping, trimming, and conditioning for a sharp look.', price: 'GHS 60' },
              { icon: '💆', title: 'Facial Treatment', desc: 'Deep cleansing facial with steam, exfoliation, and moisturising mask.', price: 'GHS 120' },
              { icon: '🎨', title: 'Hair Colouring', desc: 'Professional hair colouring, highlights, and grey coverage.', price: 'GHS 150' },
              { icon: '✨', title: 'Scalp Treatment', desc: 'Therapeutic scalp massage and treatment for healthy hair growth.', price: 'GHS 90' },
              { icon: '🧖', title: 'Full Spa Package', desc: 'Complete grooming experience: haircut, shave, facial, and massage.', price: 'GHS 350' },
              { icon: '👶', title: 'Kids Haircut', desc: 'Gentle and patient service for young gentlemen under 12.', price: 'GHS 50' },
            ].map((s, i) => (
              <div key={i} className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-[#c9a96e] transition-all duration-300">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm mb-4">{s.desc}</p>
                <p className="text-[#c9a96e] font-bold text-lg">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Gallery ───── */}
      <section id="gallery" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Our<span className="text-[#c9a96e]"> Work</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1593702295094-aea8c5b87d61?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop',
            ].map((src, i) => (
              <div key={i} className="relative group overflow-hidden rounded-xl aspect-square">
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[#c9a96e] text-2xl">✦</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Pricing ───── */}
      <section id="pricing" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Premium<span className="text-[#c9a96e]"> Packages</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Essential', price: 'GHS 150', desc: 'Perfect for a quick refresh', items: ['Haircut', 'Beard Trim', 'Styling'] },
              { name: 'Classic', price: 'GHS 250', desc: 'The complete gentleman', items: ['Haircut', 'Hot Towel Shave', 'Beard Grooming', 'Facial Cleanse'], popular: true },
              { name: 'Luxury', price: 'GHS 450', desc: 'The ultimate experience', items: ['Haircut', 'Hot Towel Shave', 'Full Facial', 'Scalp Treatment', 'Neck Massage'] },
            ].map((p, i) => (
              <div key={i} className={`relative bg-[#0a0a0a] border rounded-2xl p-8 ${p.popular ? 'border-[#c9a96e]' : 'border-white/10'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a96e] text-black text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-4xl font-black text-[#c9a96e] mb-2">{p.price}</p>
                <p className="text-white/60 text-sm mb-6">{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/80">
                      <span className="text-[#c9a96e]">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <a href="#booking" className={`block text-center py-3 rounded-full font-bold transition-colors ${p.popular ? 'bg-[#c9a96e] text-black hover:bg-[#b8965e]' : 'border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-black'}`}>
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Team ───── */}
      <section id="team" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Our Team</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Master<span className="text-[#c9a96e]"> Barbers</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Kwame Mensah', role: 'Master Barber', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=500&fit=crop' },
              { name: 'Daniel Owusu', role: 'Senior Stylist', img: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=500&fit=crop' },
              { name: 'Kofi Asante', role: 'Beard Specialist', img: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=500&fit=crop' },
              { name: 'Michael Boateng', role: 'Color Expert', img: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=400&h=500&fit=crop' },
            ].map((t, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img src={t.img} alt={t.name} className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.name}</h3>
                <p className="text-[#c9a96e]">{t.role}</p>
              </div>
            ))}
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
            { name: 'Kwame Mensah', text: 'Best barbershop in Accra. The attention to detail is incredible. I leave feeling like a new man every time.', role: 'Business Executive', avatar: 'https://images.unsplash.com/photo-1578376026533-4e5e1bf14824?w=200&h=200&fit=crop&crop=face' },
              { name: 'Emmanuel Addo', text: 'The hot towel shave is an experience like no other. Professional, relaxing, and the results are perfect.', role: 'Banker', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face' },
              { name: 'Samuel Darko', text: 'Finally found a place that understands modern grooming. My go-to spot for haircuts and beard maintenance.', role: 'Entrepreneur', avatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=200&h=200&fit=crop&crop=face' },
            ].map((r, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                <div className="text-[#c9a96e] text-2xl mb-4">★★★★★</div>
                <p className="text-white/80 mb-6 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-bold">{r.name}</p>
                    <p className="text-white/60 text-sm">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Contact / Booking ───── */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Contact Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Book Your<br /><span className="text-[#c9a96e]">Appointment</span></h2>
            <p className="text-white/70 text-lg mb-8">
              Ready to experience premium grooming? Book your appointment today and let our master barbers transform your look.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">📍</div>
                <div><p className="text-white font-medium">Location</p><p className="text-white/60">East Legon, Accra, Ghana</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">📞</div>
                <div><p className="text-white font-medium">Phone</p><p className="text-white/60">+233 54 449 0241</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">🕐</div>
                <div><p className="text-white font-medium">Hours</p><p className="text-white/60">Mon–Sat: 9AM – 8PM | Sun: 12PM – 6PM</p></div>
              </div>
            </div>
          </div>

          <div id="booking" className="bg-[#111] border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Book Online</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none" />
              </div>
              <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a96e] focus:outline-none">
                <option value="">Select Service</option>
                <option>Precision Haircut</option>
                <option>Hot Towel Shave</option>
                <option>Beard Grooming</option>
                <option>Facial Treatment</option>
                <option>Full Spa Package</option>
              </select>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="date" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a96e] focus:outline-none" />
                <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a96e] focus:outline-none">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                </select>
              </div>
              <textarea placeholder="Special requests..." rows={3} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none"></textarea>
              <button type="submit" className="w-full bg-[#c9a96e] text-black font-bold py-4 rounded-xl hover:bg-[#b8965e] transition-colors">
                Confirm Booking
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
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#c9a96e]">
                  <line x1="5" y1="5" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="23" y1="5" x2="5" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="6.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="21.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-bold tracking-[0.2em] text-sm">ELEGANCE</span>
                  <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase">Barbering &amp; Spa</span>
                </div>
              </div>
              <p className="text-white/60 max-w-sm">Premium grooming for the modern gentleman. Experience the art of traditional barbering with contemporary style.</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#about" className="hover:text-[#c9a96e] transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-[#c9a96e] transition-colors">Services</a></li>
                <li><a href="#pricing" className="hover:text-[#c9a96e] transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-[#c9a96e] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>East Legon, Accra</li>
                <li>+233 54 449 0241</li>
                <li>Mon–Sat: 9AM – 8PM</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2025 ELEGANCE Barbering &amp; Spa. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a96e] transition-colors">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a96e] transition-colors">TikTok</a>
              <a href="https://wa.me/233544490241" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a96e] transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
