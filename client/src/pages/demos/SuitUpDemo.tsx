import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  description: string;
  sizes: string[];
}

interface CartItem extends Product {
  size: string;
  qty: number;
}

const products: Product[] = [
  { id: 1, name: 'The Regent Suit', price: 799, category: 'Suits', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop', description: 'Italian wool blend, slim fit, fully canvassed chest piece.', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 2, name: 'The Oxford Blazer', price: 549, category: 'Suits', img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop', description: 'Single-breasted blazer in premium navy worsted wool.', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 3, name: 'Emerald Silk Tie', price: 125, category: 'Accessories', img: 'https://images.unsplash.com/photo-1614252234419-b936fe0f3159?w=600&h=800&fit=crop', description: 'Hand-rolled Italian silk tie in deep emerald green.', sizes: ['One Size'] },
  { id: 4, name: 'Navy Pocket Square', price: 45, category: 'Accessories', img: 'https://images.unsplash.com/photo-1553808181-41bcac1fa8cf?w=600&h=800&fit=crop', description: 'Pure cotton pocket square with hand-rolled edges.', sizes: ['One Size'] },
  { id: 5, name: 'Mayfair Oxfords', price: 350, category: 'Shoes', img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop', description: 'Goodyear-welted full brogue oxfords in cognac leather.', sizes: ['40', '41', '42', '43', '44', '45'] },
  { id: 6, name: 'Chelsea Boots', price: 295, category: 'Shoes', img: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=800&fit=crop', description: 'Sleek elastic-sided boots in smooth black calf leather.', sizes: ['40', '41', '42', '43', '44', '45'] },
  { id: 7, name: 'Gold Cufflinks', price: 89, category: 'Accessories', img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=800&fit=crop', description: '18k gold-plated oval cufflinks with brushed finish.', sizes: ['One Size'] },
  { id: 8, name: 'Italian Leather Belt', price: 75, category: 'Accessories', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=800&fit=crop', description: 'Full-grain leather belt with polished silver buckle.', sizes: ['S', 'M', 'L', 'XL'] },
];

const collections = [
  { name: 'Suits', count: '24 items', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop' },
  { name: 'Shirts', count: '36 items', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop' },
  { name: 'Shoes', count: '18 items', img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=600&fit=crop' },
  { name: 'Accessories', count: '42 items', img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&h=600&fit=crop' },
];

export default function SuitUpDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState<string | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [emailVal, setEmailVal] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product: Product, size: string) => {
    if (!size) { showToast('Please select a size'); return; }
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1 }];
    });
    showToast(`${product.name} added to cart ✓`);
    setQuickView(null);
    setSelectedSize('');
  };

  const quickAdd = (product: Product) => {
    const size = product.sizes[0];
    addToCart(product, size);
  };

  const removeFromCart = (id: number, size: string) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  const updateQty = (id: number, size: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter(i => i.qty > 0));
  };
  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
    const p = products.find(p => p.id === id);
    showToast(wishlist.includes(id) ? 'Removed from wishlist' : `${p?.name} saved ♥`);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden font-sans selection:bg-[#c9a96e] selection:text-black">

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-[#c9a96e] text-black px-6 py-3 rounded-full font-bold text-sm shadow-xl animate-pulse">
          {toast}
        </div>
      )}

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[150] flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-[#111] border-l border-white/10 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-black text-white">Your Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/60 hover:text-white text-2xl">✕</button>
            </div>
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/40">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
                <p>Your cart is empty</p>
                <button onClick={() => setCartOpen(false)} className="text-[#c9a96e] text-sm hover:underline">Continue Shopping →</button>
              </div>
            ) : (
              <>
                <div className="flex-1 p-6 space-y-4">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-[#0a0a0a] rounded-xl p-4 border border-white/10">
                      <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{item.name}</p>
                        <p className="text-white/50 text-xs mt-0.5">Size: {item.size}</p>
                        <p className="text-[#c9a96e] font-black mt-1">${item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.id, item.size, -1)} className="w-6 h-6 rounded-full border border-white/20 text-white text-xs hover:border-[#c9a96e] hover:text-[#c9a96e] flex items-center justify-center">−</button>
                          <span className="text-white text-sm font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.size, 1)} className="w-6 h-6 rounded-full border border-white/20 text-white text-xs hover:border-[#c9a96e] hover:text-[#c9a96e] flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
                        <p className="text-white font-bold text-sm">${(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-white/70 text-sm"><span>Subtotal</span><span>${cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-white/70 text-sm"><span>Shipping</span><span className="text-green-400">Free</span></div>
                  <div className="flex justify-between text-white font-black text-lg border-t border-white/10 pt-3"><span>Total</span><span className="text-[#c9a96e]">${cartTotal.toLocaleString()}</span></div>
                  <a
                    href={`https://wa.me/233544490241?text=Hello%20Suit%20Up!%20I%20want%20to%20order:%20${cart.map(i => `${i.name}%20(${i.size})%20x${i.qty}`).join('%2C%20')}%20-%20Total:%20$${cartTotal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#c9a96e] text-black font-black py-4 rounded-xl text-center tracking-[0.1em] uppercase hover:bg-[#b8965e] transition-colors"
                  >
                    Order via WhatsApp
                  </a>
                  <button onClick={() => setCart([])} className="block w-full text-white/40 text-sm text-center hover:text-white/70 transition-colors">Clear Cart</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Quick View Modal ── */}
      {quickView && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setQuickView(null); setSelectedSize(''); }} />
          <div className="relative z-10 bg-[#111] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full grid md:grid-cols-2">
            <img src={quickView.img} alt={quickView.name} className="w-full h-72 md:h-full object-cover" />
            <div className="p-8 flex flex-col justify-between">
              <div>
                <button onClick={() => { setQuickView(null); setSelectedSize(''); }} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl">✕</button>
                <p className="text-[#c9a96e] text-xs tracking-[0.25em] uppercase mb-2">{quickView.category}</p>
                <h3 className="text-2xl font-black text-white mb-2">{quickView.name}</h3>
                <p className="text-3xl font-black text-[#c9a96e] mb-4">${quickView.price}</p>
                <p className="text-white/70 text-sm mb-6">{quickView.description}</p>
                <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {quickView.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedSize === s ? 'border-[#c9a96e] bg-[#c9a96e] text-black' : 'border-white/20 text-white/70 hover:border-[#c9a96e] hover:text-[#c9a96e]'}`}
                    >{s}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => addToCart(quickView, selectedSize)}
                  className="w-full bg-[#c9a96e] text-black font-black py-4 rounded-xl tracking-[0.1em] uppercase hover:bg-[#b8965e] transition-colors"
                >
                  {selectedSize ? 'Add to Cart' : 'Select a Size'}
                </button>
                <button onClick={() => { toggleWishlist(quickView.id); }} className="w-full border border-white/20 text-white/70 py-3 rounded-xl text-sm hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
                  {wishlist.includes(quickView.id) ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <a href="#" className="flex items-baseline gap-1">
          <span className="text-white font-black tracking-tight text-2xl md:text-3xl uppercase">Suit</span>
          <span className="text-[#c9a96e] text-2xl md:text-3xl font-bold italic" style={{ fontFamily: '"Brush Script MT","Segoe Script",cursive' }}>Up!</span>
        </a>

        <div className="hidden md:flex items-center gap-5 text-white/75 text-xs tracking-[0.2em] uppercase">
          {['Collections', 'Suits', 'Accessories', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#c9a96e] transition-colors">[{l}]</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#c9a96e] hidden md:block">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <button onClick={() => setCartOpen(true)} className="relative text-white/75 hover:text-[#c9a96e] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#c9a96e] text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white/75">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 text-2xl font-black uppercase tracking-widest">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/50 text-3xl">✕</button>
          {['collections', 'products', 'about', 'contact'].map(l => (
            <a key={l} href={`#${l}`} onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a96e] transition-colors capitalize">{l}</a>
          ))}
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div className="absolute top-0 right-0 w-full md:w-[55%] h-full">
          <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&h=1600&fit=crop" alt="Man in navy suit" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-16">
          <div className="max-w-3xl">
            <h1 className="font-black tracking-tight leading-[0.9] text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase">
              <span className="block">Dress Like</span>
              <span className="block">A <span className="text-[#c9a96e]">Gentleman</span></span>
            </h1>
            <p className="mt-8 text-white/80 text-xs md:text-sm tracking-[0.25em] uppercase">
              Featured: Savile Row Suit &nbsp;|&nbsp; Italian Silk Tie &nbsp;|&nbsp; Formal Accessories
            </p>
            <div className="mt-6 flex items-center gap-6 text-[#c9a96e]">
              {[
                <><path d="M12 4a2 2 0 1 0-2 2" /><path d="M12 6v2l10 6H2l10-6" /></>,
                <><path d="M9 3h6l-1 3 2 3-4 13-4-13 2-3z" /></>,
                <><path d="M2 17h20l-1 4H3z" /><path d="M4 17V9c0-1 1-2 2-2h3l2 3h4c3 0 7 2 7 7" /></>,
                <><circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" /><path d="M10 12h4" /></>,
              ].map((icon, i) => (
                <svg key={i} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
              ))}
            </div>

            {/* Featured 3 product cards */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
              {products.slice(0, 3).map(p => (
                <div key={p.id} className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 hover:border-[#c9a96e] transition-all group cursor-pointer" onClick={() => { setQuickView(p); setSelectedSize(''); }}>
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-[#111]">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="text-white text-[11px] font-medium leading-tight mb-0.5 line-clamp-1">{p.name}</p>
                  <p className="text-[#c9a96e] text-sm font-black">${p.price}</p>
                  <button
                    className="mt-1.5 w-full text-[9px] tracking-[0.15em] uppercase border border-[#c9a96e]/50 text-[#c9a96e] py-1 rounded hover:bg-[#c9a96e] hover:text-black transition-colors"
                    onClick={(e) => { e.stopPropagation(); quickAdd(p); }}
                  >Add to Cart</button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 md:mt-0 md:absolute md:bottom-10 md:right-10 lg:bottom-14 lg:right-16">
            <a href="#products" className="group inline-flex items-center gap-3 rounded-full border border-[#c9a96e] bg-black/70 backdrop-blur-sm px-10 py-4 text-white font-bold tracking-[0.25em] text-sm hover:bg-[#c9a96e] hover:text-black transition-all duration-300">
              SHOP NOW <span className="text-[#c9a96e] group-hover:text-black">✦</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-24 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Shop By Category</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Our <span className="text-[#c9a96e]">Collections</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((c, i) => (
              <button key={i} onClick={() => setFilter(c.name === 'Shirts' ? 'All' : c.name)} className="group relative rounded-2xl overflow-hidden aspect-[3/4] text-left w-full">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black text-white mb-1">{c.name}</h3>
                  <p className="text-[#c9a96e] text-sm">{c.count}</p>
                  <p className="mt-2 text-white/70 text-xs tracking-[0.2em] uppercase group-hover:text-[#c9a96e] transition-colors">Shop Now →</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section id="products" className="py-24 px-6 md:px-16 lg:px-24 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Featured Products</p>
              <h2 className="text-4xl md:text-5xl font-black text-white">The Essential <span className="text-[#c9a96e]">Edit</span></h2>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2 text-xs tracking-[0.15em] uppercase">
              {['All', 'Suits', 'Shoes', 'Accessories'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-bold transition-colors ${filter === f ? 'bg-[#c9a96e] text-black' : 'border border-white/20 text-white/70 hover:border-[#c9a96e] hover:text-[#c9a96e]'}`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c9a96e] transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111] cursor-pointer" onClick={() => { setQuickView(p); setSelectedSize(''); }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-black"
                  >
                    <span className={`text-lg ${wishlist.includes(p.id) ? 'text-red-400' : 'text-white/60 hover:text-red-400'}`}>{wishlist.includes(p.id) ? '♥' : '♡'}</span>
                  </button>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
                    <button onClick={(e) => { e.stopPropagation(); setQuickView(p); setSelectedSize(''); }} className="w-full bg-white/10 backdrop-blur-sm text-white text-xs font-bold py-2 rounded-lg tracking-[0.15em] uppercase hover:bg-white/20 transition-colors">Quick View</button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase mb-1">{p.category}</p>
                  <h3 className="text-white font-bold mb-3 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[#c9a96e] text-xl font-black">${p.price}</p>
                    <button
                      onClick={() => quickAdd(p)}
                      className="text-[10px] tracking-[0.15em] uppercase border border-[#c9a96e]/60 text-[#c9a96e] px-3 py-2 rounded-lg hover:bg-[#c9a96e] hover:text-black transition-colors font-bold"
                    >Add +</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Client Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Gentlemen <span className="text-[#c9a96e]">Speak</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Alexander Mensah', role: 'CEO, Finance', avatar: 'https://images.unsplash.com/photo-1578376026533-4e5e1bf14824?w=200&h=200&fit=crop&crop=face', text: 'The fit, the fabric, the attention to detail — Suit Up! has become my exclusive tailor. Every piece is a statement.' },
              { name: 'James Kwarteng', role: 'Architect', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face', text: 'I receive compliments every time I wear my Regent Suit. The quality rivals anything from Savile Row at half the price.' },
              { name: 'Marcus Asante', role: 'Entrepreneur', avatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=200&h=200&fit=crop&crop=face', text: 'Finally, a menswear brand that understands modern elegance. The accessories collection alone is worth the visit.' },
            ].map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-8">
                <div className="text-[#c9a96e] text-xl mb-4">★★★★★</div>
                <p className="text-white/80 mb-6 leading-relaxed italic">"{t.text}"</p>
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

      {/* ── About ── */}
      <section id="about" className="py-24 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=1000&fit=crop" alt="Tailoring craft" className="rounded-2xl w-full h-[600px] object-cover" />
            <div className="absolute -bottom-6 -right-6 bg-[#c9a96e] text-black px-8 py-6 rounded-xl">
              <p className="text-4xl font-black">1952</p>
              <p className="text-sm font-medium">Est. Heritage</p>
            </div>
          </div>
          <div>
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">The Modern<br />Gentleman's<br /><span className="text-[#c9a96e]">Wardrobe</span></h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">Suit Up! is where heritage tailoring meets contemporary style. Every garment is crafted from the finest fabrics sourced from Italy, England, and Scotland — finished by master tailors who understand the art of a perfect fit.</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[['100%', 'Italian Wool'], ['Hand', 'Finished'], ['Free', 'Alterations']].map(([v, l]) => (
                <div key={l}><p className="text-3xl font-black text-[#c9a96e]">{v}</p><p className="text-white/60 text-sm">{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 md:px-16 lg:px-24 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Members Only</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Join the<br /><span className="text-[#c9a96e]">Gentleman's Club</span></h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">Get exclusive access to new collections, private sales, and 15% off your first order.</p>
          {subscribed ? (
            <div className="bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-2xl p-8">
              <p className="text-[#c9a96e] text-2xl font-black">Welcome to the Club ✦</p>
              <p className="text-white/60 mt-2">Check your inbox for your 15% discount code.</p>
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); if (emailVal) { setSubscribed(true); showToast('Welcome to the Gentleman\'s Club!'); } }}>
              <input type="email" required placeholder="your@email.com" value={emailVal} onChange={e => setEmailVal(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:border-[#c9a96e] focus:outline-none text-sm" />
              <button type="submit" className="bg-[#c9a96e] text-black font-black px-8 py-4 rounded-full tracking-[0.2em] text-sm uppercase hover:bg-[#b8965e] transition-colors">Join Now</button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-16 px-6 md:px-16 lg:px-24 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-white font-black text-2xl uppercase">Suit</span>
                <span className="text-[#c9a96e] text-2xl font-bold italic" style={{ fontFamily: '"Brush Script MT","Segoe Script",cursive' }}>Up!</span>
              </div>
              <p className="text-white/60 max-w-sm">Where heritage tailoring meets contemporary style. Crafted for the modern gentleman who values quality, precision, and timeless elegance.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                {['Suits', 'Shoes', 'Accessories'].map(l => (
                  <li key={l}><button onClick={() => { setFilter(l); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#c9a96e] transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Osu, Accra, Ghana</li>
                <li><a href="tel:+233544490241" className="hover:text-[#c9a96e] transition-colors">+233 54 449 0241</a></li>
                <li><a href="mailto:hello@suitup.co" className="hover:text-[#c9a96e] transition-colors">hello@suitup.co</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2025 Suit Up! All rights reserved.</p>
            <div className="flex gap-6 text-sm">
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
