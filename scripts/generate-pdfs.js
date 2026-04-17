/**
 * generate-pdfs.js
 * Run: node scripts/generate-pdfs.js
 * Outputs: client/public/downloads/*.pdf
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../client/public/downloads');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Design tokens ───────────────────────────────────────────────────────────
const GOLD   = '#c9a96e';
const BLACK  = '#0a0a0a';
const WHITE  = '#ffffff';
const GRAY   = '#888888';
const LIGHT  = '#cccccc';
const DARK   = '#1a1a1a';

// ── Helpers ──────────────────────────────────────────────────────────────────

function newDoc() {
  return new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Author: 'Lisgraphix — lisgraphix.dev',
      Creator: 'Lisgraphix',
    },
  });
}

function drawCover(doc, title, subtitle, tag) {
  // Full-page dark background
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(BLACK);

  // Gold top bar
  doc.rect(0, 0, doc.page.width, 6).fill(GOLD);

  // Gold vertical accent left
  doc.rect(0, 6, 4, doc.page.height - 6).fill(GOLD);

  // Brand name top-left
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(GOLD)
    .text('LISGRAPHIX', 30, 28, { characterSpacing: 4 });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(GRAY)
    .text('lisgraphix.dev  ·  lisgraphix17@gmail.com', 30, 44);

  // Tag pill
  doc
    .roundedRect(30, 200, tag.length * 7.5 + 24, 26, 13)
    .fill(GOLD);
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(BLACK)
    .text(tag.toUpperCase(), 30, 208, { width: tag.length * 7.5 + 24, align: 'center', characterSpacing: 1 });

  // Main title
  doc
    .font('Helvetica-Bold')
    .fontSize(38)
    .fillColor(WHITE)
    .text(title, 30, 245, { width: doc.page.width - 60, lineGap: 6 });

  // Underline accent
  const titleHeight = doc.heightOfString(title, { width: doc.page.width - 60, fontSize: 38 });
  doc.rect(30, 245 + titleHeight + 10, 60, 3).fill(GOLD);

  // Subtitle
  doc
    .font('Helvetica')
    .fontSize(14)
    .fillColor(LIGHT)
    .text(subtitle, 30, 245 + titleHeight + 26, { width: doc.page.width - 60, lineGap: 4 });

  // Bottom footer band
  doc.rect(0, doc.page.height - 52, doc.page.width, 52).fill(DARK);
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(GRAY)
    .text('Free resource — no email required. Share freely.', 30, doc.page.height - 35);
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(GOLD)
    .text('lisgraphix.dev', doc.page.width - 110, doc.page.height - 35);
}

function contentPage(doc) {
  doc.addPage();
  // Subtle dark bg
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#111111');
  // Left gold bar
  doc.rect(0, 0, 4, doc.page.height).fill(GOLD);
  // Return starting Y
  return 40;
}

function sectionHeader(doc, text, y) {
  // Gold background pill
  doc.rect(25, y, doc.page.width - 50, 30).fill('#1e1a12');
  doc.rect(25, y, 4, 30).fill(GOLD);
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(GOLD)
    .text(text.toUpperCase(), 38, y + 9, { characterSpacing: 1 });
  return y + 44;
}

function bullet(doc, text, y, indent = 38) {
  const maxW = doc.page.width - indent - 30;
  // Gold dot
  doc.circle(indent - 10, y + 5, 2.5).fill(GOLD);
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(LIGHT)
    .text(text, indent, y, { width: maxW, lineGap: 2 });
  return y + doc.heightOfString(text, { width: maxW, fontSize: 10 }) + 8;
}

function numbered(doc, num, text, y, indent = 38) {
  const maxW = doc.page.width - indent - 30;
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(GOLD)
    .text(`${num}.`, indent - 14, y);
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(LIGHT)
    .text(text, indent, y, { width: maxW, lineGap: 2 });
  return y + doc.heightOfString(text, { width: maxW, fontSize: 10 }) + 8;
}

function bodyText(doc, text, y) {
  const maxW = doc.page.width - 60;
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(LIGHT)
    .text(text, 30, y, { width: maxW, lineGap: 3 });
  return y + doc.heightOfString(text, { width: maxW, fontSize: 10 }) + 10;
}

function checkBox(doc, text, y) {
  const maxW = doc.page.width - 70;
  // Checkbox square
  doc.rect(30, y, 12, 12).stroke(GOLD);
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(LIGHT)
    .text(text, 50, y, { width: maxW, lineGap: 2 });
  return y + doc.heightOfString(text, { width: maxW, fontSize: 10 }) + 9;
}

function pageFooter(doc, pageNum) {
  const y = doc.page.height - 32;
  doc.rect(0, y - 8, doc.page.width, 40).fill(BLACK);
  doc.font('Helvetica').fontSize(8).fillColor(GRAY)
    .text(`Page ${pageNum}  ·  © Lisgraphix  ·  lisgraphix.dev`, 30, y);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(GOLD)
    .text('FREE RESOURCE', doc.page.width - 110, y);
}

// ════════════════════════════════════════════════════════════════════════════
// PDF 1 — Website Launch Checklist
// ════════════════════════════════════════════════════════════════════════════
function pdf1() {
  const doc = newDoc();
  const out = fs.createWriteStream(path.join(OUT_DIR, 'website-launch-checklist.pdf'));
  doc.pipe(out);

  // Cover
  drawCover(doc,
    'Website Launch\nChecklist',
    '47 steps to launch your website the right way — design, SEO, performance, security & more.',
    'Free Checklist'
  );

  // Page 2 — Design & Content
  let y = contentPage(doc);
  y = sectionHeader(doc, 'Section 1 — Design & Content', y);
  const design = [
    'All pages have unique, descriptive titles',
    'Meta descriptions written for every page (150–160 characters)',
    'All images have descriptive alt text',
    'Logo is high-quality (SVG or 2× PNG)',
    'Favicon is set and visible in browser tab',
    'Fonts load correctly on all devices',
    'Brand colours are consistent throughout',
    'All placeholder text (Lorem Ipsum) has been removed',
    'Contact details are correct — phone, email, location',
    'Business hours are accurate',
    'All prices are correct and up to date',
  ];
  design.forEach(item => { y = checkBox(doc, item, y); });

  y += 8;
  y = sectionHeader(doc, 'Section 2 — Mobile & Performance', y);
  const perf = [
    'Website looks great on mobile (test on real phone)',
    'Website looks great on tablet',
    'All buttons are easy to tap on mobile (minimum 44px)',
    'Images are compressed (use squoosh.app)',
    'Website loads in under 3 seconds',
    'No broken images or missing files',
    'Videos do not auto-play with sound',
    'Google PageSpeed score is above 80',
  ];
  perf.forEach(item => { y = checkBox(doc, item, y); });
  pageFooter(doc, 2);

  // Page 3 — SEO & Functionality
  y = contentPage(doc);
  y = sectionHeader(doc, 'Section 3 — SEO (Get Found on Google)', y);
  const seo = [
    'Google Search Console connected to your domain',
    'Google Analytics 4 installed and tracking visitors',
    'sitemap.xml submitted to Google Search Console',
    'robots.txt file is in place and correct',
    'Every page has a clear H1 heading',
    'Keywords relevant to your business appear in headings',
    'Business is listed on Google Business Profile (free)',
    'Name, Address, Phone are consistent across the web (NAP)',
  ];
  seo.forEach(item => { y = checkBox(doc, item, y); });

  y += 8;
  y = sectionHeader(doc, 'Section 4 — Functionality', y);
  const func = [
    'Contact form sends emails correctly (test it yourself)',
    'WhatsApp button opens the correct number',
    'All links work with no 404 errors',
    'Social media links go to the correct profiles',
    'Payment system tested (if e-commerce)',
    'Booking system tested (if applicable)',
    'SSL certificate is active (https:// in address bar)',
    'Privacy Policy page exists',
  ];
  func.forEach(item => { y = checkBox(doc, item, y); });

  y += 8;
  y = sectionHeader(doc, 'Section 5 — Security & Backup', y);
  const sec = [
    'Website backup is configured',
    'Admin password is strong (not your name or "1234")',
    'Hosting plan confirmed and paid',
    'Domain renewal date noted in your calendar',
    'Developer contact saved (Lisgraphix: +233 54 449 0241)',
  ];
  sec.forEach(item => { y = checkBox(doc, item, y); });
  pageFooter(doc, 3);

  // Page 4 — CTA
  y = contentPage(doc);
  y += 40;
  doc.font('Helvetica-Bold').fontSize(22).fillColor(WHITE)
    .text('Need help launching\nyour website?', 30, y, { width: doc.page.width - 60 });
  y += 90;
  doc.font('Helvetica').fontSize(12).fillColor(LIGHT)
    .text('Lisgraphix builds modern, fast, mobile-friendly websites for businesses in Ghana — from ₵1,000.', 30, y, { width: doc.page.width - 60, lineGap: 4 });
  y += 60;

  // Contact block
  const contacts = [
    ['WhatsApp', '+233 54 449 0241 — wa.me/233544490241'],
    ['Email', 'lisgraphix17@gmail.com'],
    ['Website', 'lisgraphix.dev'],
  ];
  contacts.forEach(([label, val]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(label, 30, y);
    doc.font('Helvetica').fontSize(10).fillColor(LIGHT).text(val, 110, y);
    y += 22;
  });
  pageFooter(doc, 4);

  doc.end();
  console.log('✓ website-launch-checklist.pdf');
}

// ════════════════════════════════════════════════════════════════════════════
// PDF 2 — Brand Colour Guide
// ════════════════════════════════════════════════════════════════════════════
function pdf2() {
  const doc = newDoc();
  const out = fs.createWriteStream(path.join(OUT_DIR, 'brand-color-guide.pdf'));
  doc.pipe(out);

  drawCover(doc,
    'Brand Colour Guide\nfor Ghanaian Businesses',
    'Choose colours that build trust, attract customers, and make your brand unforgettable.',
    'Free Guide'
  );

  let y = contentPage(doc);
  y = sectionHeader(doc, 'Why Colour Matters for Your Brand', y);
  y = bodyText(doc, 'Colour is the first thing people notice — before they read a single word. Research shows that colour increases brand recognition by up to 80%. The right palette makes your business look professional, trustworthy, and memorable.', y);

  y += 6;
  y = sectionHeader(doc, 'Colour Psychology — What Each Colour Says', y);
  const colours = [
    ['BLACK & DARK', 'Luxury, authority, sophistication. Perfect for premium brands, fashion, and professional services.'],
    ['GOLD / YELLOW', 'Prosperity, success, warmth. Resonates strongly with Ghanaian culture and premium positioning.'],
    ['WHITE', 'Clean, modern, trustworthy. Great for healthcare, tech, and minimalist brands.'],
    ['BLUE', 'Trust, reliability, calm. Best for finance, legal, healthcare, and corporate services.'],
    ['GREEN', 'Growth, nature, health. Excellent for food, agriculture, wellness, and eco brands.'],
    ['RED', 'Energy, urgency, passion. Works for food, retail, sales promotions, and bold brands.'],
    ['ORANGE', 'Friendly, affordable, energetic. Popular for food delivery, youth brands, and retail.'],
    ['PURPLE', 'Creative, royal, spiritual. Good for beauty, spirituality, and creative agencies.'],
  ];
  colours.forEach(([col, desc]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(col, 38, y);
    y += 14;
    doc.font('Helvetica').fontSize(10).fillColor(LIGHT)
      .text(desc, 38, y, { width: doc.page.width - 68, lineGap: 2 });
    y += doc.heightOfString(desc, { width: doc.page.width - 68, fontSize: 10 }) + 10;
  });
  pageFooter(doc, 2);

  y = contentPage(doc);
  y = sectionHeader(doc, 'How to Build Your Brand Palette', y);
  const steps = [
    'Choose 1 PRIMARY colour — this is your dominant brand colour (60% of usage)',
    'Choose 1 SECONDARY colour — complements your primary (30% of usage)',
    'Choose 1 ACCENT colour — for buttons, highlights, calls to action (10% of usage)',
    'Add WHITE or LIGHT GREY for backgrounds and breathing room',
    'Add BLACK or DARK GREY for body text and contrast',
  ];
  steps.forEach((s, i) => { y = numbered(doc, i + 1, s, y); });

  y += 10;
  y = sectionHeader(doc, 'Proven Colour Combinations for Ghanaian Businesses', y);
  const combos = [
    ['Luxury & Premium', 'Black + Gold + White', 'Fashion, salons, real estate, premium services'],
    ['Trust & Corporate', 'Navy Blue + White + Gold', 'Finance, legal, consulting, insurance'],
    ['Fresh & Modern', 'White + Black + Green', 'Health, food, wellness, eco products'],
    ['Bold & Energetic', 'Red + White + Black', 'Fast food, retail, promotions, youth brands'],
    ['Creative & Unique', 'Purple + Gold + White', 'Beauty, creative agencies, spirituality'],
    ['Clean & Minimal', 'Grey + White + Blue', 'Tech, software, professional services'],
  ];
  combos.forEach(([name, palette, useCase]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE).text(name, 38, y);
    doc.font('Helvetica').fontSize(10).fillColor(GOLD).text(palette, 38, y + 14, { width: 220 });
    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text(useCase, 38, y + 26, { width: doc.page.width - 68 });
    y += 50;
  });
  pageFooter(doc, 3);

  y = contentPage(doc);
  y = sectionHeader(doc, 'Practical Tips for Using Colour', y);
  const tips = [
    'Never use more than 3–4 colours in your brand palette',
    'Always check contrast — dark text on light backgrounds, light text on dark',
    'Use your primary colour on your logo, website header, and main CTA buttons',
    'Keep colours consistent across your website, social media, and printed materials',
    'Test your colours on a phone screen — most Ghanaians browse on mobile',
    'Use Coolors.co or Adobe Color to generate harmonious palettes for free',
    'Get your brand colours in HEX codes (for web) and CMYK (for print)',
    'Create a simple brand guide document with your exact colour codes',
  ];
  tips.forEach(t => { y = bullet(doc, t, y); });

  y += 10;
  y = sectionHeader(doc, 'Canva Tips for Ghanaian Business Owners', y);
  const canva = [
    'Open Canva (canva.com) — free version is enough for most businesses',
    'Click "Brand Kit" and enter your HEX colour codes to save your palette',
    'Create templates for WhatsApp flyers, Facebook posts, and business cards',
    'Use the same colours every time — consistency builds recognition',
  ];
  canva.forEach((t, i) => { y = numbered(doc, i + 1, t, y); });
  pageFooter(doc, 4);

  doc.end();
  console.log('✓ brand-color-guide.pdf');
}

// ════════════════════════════════════════════════════════════════════════════
// PDF 3 — SEO Quick Wins
// ════════════════════════════════════════════════════════════════════════════
function pdf3() {
  const doc = newDoc();
  const out = fs.createWriteStream(path.join(OUT_DIR, 'seo-quick-wins.pdf'));
  doc.pipe(out);

  drawCover(doc,
    'SEO Quick Wins\nfor Local Businesses',
    '10 actions you can take today to rank higher on Google and get found by customers in Ghana.',
    'Free Guide'
  );

  let y = contentPage(doc);
  y = sectionHeader(doc, 'What is SEO and Why Should You Care?', y);
  y = bodyText(doc, 'SEO (Search Engine Optimisation) is the process of making your website appear higher in Google search results — without paying for ads. When someone in Accra searches "barbershop near me" or "web designer Ghana", you want your business to show up first. That is what SEO does.', y);
  y = bodyText(doc, 'The good news: most small businesses in Ghana do very little SEO. That means even basic improvements can get you ranking above your competitors quickly.', y);

  y += 6;
  y = sectionHeader(doc, 'The 10 Quick Wins', y);

  const wins = [
    {
      title: 'Claim Your Google Business Profile',
      body: 'Go to business.google.com and claim your free listing. Add your business name, category, phone number, location, photos, and opening hours. This is the single most powerful local SEO action you can take — it makes you appear on Google Maps.',
    },
    {
      title: 'Use Your City Name in Your Page Title',
      body: 'Instead of "Welcome to My Shop", write "Accra\'s Best Barbershop — Sharp Cuts Tema". Include your city or neighbourhood in your H1 heading and page title. Google uses this to decide which local searches to show you for.',
    },
    {
      title: 'Write a Keyword-Rich Meta Description',
      body: 'The meta description is the two lines of text shown under your link in Google. Write 150–160 characters that include your main service and city. Example: "Professional web design in Accra, Ghana. We build modern, fast websites for businesses — starting from ₵1,000. Get a free quote today."',
    },
    {
      title: 'Get Your Speed Above 80 on Google PageSpeed',
      body: 'Visit pagespeed.web.dev and test your website. A slow site ranks lower and loses customers. Fix issues: compress images using squoosh.app, remove unused scripts, use modern image formats (WebP instead of JPEG/PNG).',
    },
    {
      title: 'Make Your Website Mobile-Friendly',
      body: 'Over 85% of Ghanaians use their phone to browse the web. Google ranks mobile-friendly websites higher. Test yours at search.google.com/test/mobile-friendly. If it fails, your web designer needs to fix it immediately.',
    },
  ];

  wins.slice(0, 5).forEach((w, i) => {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD)
      .text(`${i + 1}. ${w.title}`, 30, y, { width: doc.page.width - 60 });
    y += doc.heightOfString(`${i + 1}. ${w.title}`, { width: doc.page.width - 60 }) + 4;
    y = bodyText(doc, w.body, y);
    y += 6;
  });
  pageFooter(doc, 2);

  y = contentPage(doc);
  wins.slice(5).forEach((w, i) => {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD)
      .text(`${i + 6}. ${w.title}`, 30, y, { width: doc.page.width - 60 });
    y += doc.heightOfString(`${i + 6}. ${w.title}`, { width: doc.page.width - 60 }) + 4;
    y = bodyText(doc, w.body, y);
    y += 6;
  });

  const wins2 = [
    {
      title: 'Add Your Business to Local Directories',
      body: 'List your business on Ghana-specific directories: GhanaYello, Tonaton, Jumia, and Facebook Marketplace. Each listing creates a backlink to your website and increases your visibility in local searches.',
    },
    {
      title: 'Ask Customers for Google Reviews',
      body: 'Send your Google Business Profile link to happy customers and ask them to leave a review. Five genuine 5-star reviews will boost your local ranking significantly. Respond to every review — positive or negative.',
    },
    {
      title: 'Create a Simple Blog Post Once a Month',
      body: 'Write one 500-word article per month answering a common question your customers ask. Example: "How much does a website cost in Ghana?" or "Best barbershop in Accra". This signals to Google that your site is active and relevant.',
    },
    {
      title: 'Use Free Tools to Monitor Your Rankings',
      body: 'Set up Google Search Console (free) to see which keywords bring people to your site. Check it monthly. You will see exactly what people searched when they found you — use this to write more content on those topics.',
    },
    {
      title: 'Fix Your Internal Links',
      body: 'Every page on your website should link to at least one other page. Example: your homepage should link to your Services page, which links to your Contact page. This helps Google understand your site structure and crawl all your pages.',
    },
  ];

  wins2.forEach((w, i) => {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD)
      .text(`${i + 6}. ${w.title}`, 30, y, { width: doc.page.width - 60 });
    y += doc.heightOfString(`${i + 6}. ${w.title}`, { width: doc.page.width - 60 }) + 4;
    y = bodyText(doc, w.body, y);
    y += 6;
  });
  pageFooter(doc, 3);

  doc.end();
  console.log('✓ seo-quick-wins.pdf');
}

// ════════════════════════════════════════════════════════════════════════════
// PDF 4 — WhatsApp Business Guide
// ════════════════════════════════════════════════════════════════════════════
function pdf4() {
  const doc = newDoc();
  const out = fs.createWriteStream(path.join(OUT_DIR, 'whatsapp-business-guide.pdf'));
  doc.pipe(out);

  drawCover(doc,
    'WhatsApp Business\nSetup Guide',
    'Complete step-by-step guide to set up WhatsApp Business professionally and get more customers.',
    'Free Guide'
  );

  let y = contentPage(doc);
  y = sectionHeader(doc, 'Why WhatsApp Business?', y);
  y = bodyText(doc, 'WhatsApp has over 2.5 billion users worldwide and is the #1 messaging app in Ghana. WhatsApp Business is a free app that turns your business number into a professional communication tool — with automated replies, catalogues, labels, and quick responses.', y);

  y += 6;
  y = sectionHeader(doc, 'Step 1 — Download & Set Up', y);
  const setup = [
    'Download "WhatsApp Business" from the Play Store or App Store (it is FREE)',
    'Register with your business phone number',
    'Set your Business Name — use your real business name (this cannot be changed easily)',
    'Add your Profile Photo — use your logo or a professional photo',
    'Go to Settings → Business Profile and fill in every field',
  ];
  setup.forEach((s, i) => { y = numbered(doc, i + 1, s, y); });

  y += 6;
  y = sectionHeader(doc, 'Step 2 — Complete Your Business Profile', y);
  const profile = [
    ['Business Description', 'Write 2–3 sentences about what you do and who you serve. Include your city.'],
    ['Category', 'Choose the most accurate category for your business type'],
    ['Address', 'Add your location — helps customers find you and builds trust'],
    ['Email', 'Add your professional email address'],
    ['Website', 'Add your website URL — send people from WhatsApp to your website'],
    ['Opening Hours', 'Set accurate hours so customers know when to reach you'],
  ];
  profile.forEach(([field, desc]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(field, 38, y);
    y += 14;
    doc.font('Helvetica').fontSize(10).fillColor(LIGHT)
      .text(desc, 38, y, { width: doc.page.width - 68, lineGap: 2 });
    y += doc.heightOfString(desc, { width: doc.page.width - 68, fontSize: 10 }) + 8;
  });
  pageFooter(doc, 2);

  y = contentPage(doc);
  y = sectionHeader(doc, 'Step 3 — Set Up Automated Messages', y);
  y = bodyText(doc, 'Go to Settings → Business Tools → Greeting Message / Away Message / Quick Replies', y);

  doc.font('Helvetica-Bold').fontSize(11).fillColor(WHITE).text('Greeting Message (sent to new contacts):', 30, y); y += 20;
  doc.rect(30, y, doc.page.width - 60, 70).fill('#1a1a1a').stroke(GOLD);
  doc.font('Helvetica').fontSize(10).fillColor(LIGHT)
    .text('Hello! 👋 Welcome to [Business Name].\n\nThank you for reaching out. We are here to help you.\n\nPlease tell us what you need and we will get back to you shortly.', 38, y + 8, { width: doc.page.width - 76, lineGap: 3 });
  y += 84;

  doc.font('Helvetica-Bold').fontSize(11).fillColor(WHITE).text('Away Message (sent outside business hours):', 30, y); y += 20;
  doc.rect(30, y, doc.page.width - 60, 60).fill('#1a1a1a').stroke(GOLD);
  doc.font('Helvetica').fontSize(10).fillColor(LIGHT)
    .text('Hi! We are currently closed but will respond as soon as we open.\n\nOur hours: Mon–Sat, 8am–6pm.\n\nFor urgent matters, leave your message and we will respond first thing.', 38, y + 8, { width: doc.page.width - 76, lineGap: 3 });
  y += 74;

  y += 6;
  y = sectionHeader(doc, 'Step 4 — Quick Replies (Save Time)', y);
  y = bodyText(doc, 'Quick Replies let you save frequent messages and send them with a shortcut. Go to Settings → Business Tools → Quick Replies.', y);

  const qr = [
    ['/price', 'Our prices start from ₵[X]. For a full quote, please share more details about what you need.'],
    ['/location', 'We are located at [Your Address], [City]. You can also reach us via this link: [Google Maps link]'],
    ['/hours', 'We are open Monday to Saturday, 8am to 6pm. Closed on Sundays and public holidays.'],
    ['/thanks', 'Thank you so much! It was a pleasure working with you. Please refer us to your friends and family 🙏'],
  ];
  qr.forEach(([shortcut, message]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(shortcut, 38, y);
    y += 14;
    doc.font('Helvetica').fontSize(9).fillColor(LIGHT)
      .text(message, 38, y, { width: doc.page.width - 68, lineGap: 2 });
    y += doc.heightOfString(message, { width: doc.page.width - 68, fontSize: 9 }) + 10;
  });
  pageFooter(doc, 3);

  y = contentPage(doc);
  y = sectionHeader(doc, 'Step 5 — Create a Product Catalogue', y);
  y = bodyText(doc, 'WhatsApp Business lets you add up to 500 products or services in a catalogue. Customers can browse without leaving the app.', y);
  const cat = [
    'Go to Settings → Business Tools → Catalogue',
    'Tap "Add Item" and upload a clear, well-lit photo',
    'Write a clear product name and description',
    'Add the price in GHS',
    'Share your catalogue link in your bio and messages',
  ];
  cat.forEach((s, i) => { y = numbered(doc, i + 1, s, y); });

  y += 10;
  y = sectionHeader(doc, 'Step 6 — Professional Tips', y);
  const pro = [
    'Use a real business logo as your profile photo — not a personal photo',
    'Reply within 2 hours during business hours — speed builds trust',
    'Use voice messages for complex answers — they feel personal and save time',
    'Label conversations: New Customer, Pending, Paid, Follow Up',
    'Never spam broadcast lists — only message people who opted in',
    'Add wa.me/233XXXXXXXXX to your website, social media, and business cards',
    'Separate personal and business numbers — use two phones or dual SIM',
  ];
  pro.forEach(t => { y = bullet(doc, t, y); });
  pageFooter(doc, 4);

  doc.end();
  console.log('✓ whatsapp-business-guide.pdf');
}

// ════════════════════════════════════════════════════════════════════════════
// PDF 5 — 30-Day Social Media Calendar
// ════════════════════════════════════════════════════════════════════════════
function pdf5() {
  const doc = newDoc();
  const out = fs.createWriteStream(path.join(OUT_DIR, 'social-media-calendar.pdf'));
  doc.pipe(out);

  drawCover(doc,
    '30-Day Social Media\nContent Calendar',
    'A full month of post ideas, caption templates, hashtags and scheduling tips for Ghanaian businesses.',
    'Free Template'
  );

  let y = contentPage(doc);
  y = sectionHeader(doc, 'How to Use This Calendar', y);
  const how = [
    'Plan one week at a time — don\'t try to do everything at once',
    'Batch-create content: set aside 2 hours every Sunday to create that week\'s posts',
    'Use Canva (free) to design graphics using your brand colours',
    'Post at the best times: 7am–9am, 12pm–2pm, and 7pm–9pm Ghana time',
    'Engage with every comment and DM within 2 hours',
    'Track what performs best and do more of that',
  ];
  how.forEach((h, i) => { y = numbered(doc, i + 1, h, y); });

  y += 8;
  y = sectionHeader(doc, 'Content Mix (The 70-20-10 Rule)', y);
  const mix = [
    ['70% — Value Content', 'Tips, tutorials, behind-the-scenes, educational posts that help your audience'],
    ['20% — Social Proof', 'Customer testimonials, before/after photos, reviews, case studies'],
    ['10% — Promotional', 'Direct offers, pricing, special deals, new services'],
  ];
  mix.forEach(([pct, desc]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(pct, 38, y);
    y += 14;
    doc.font('Helvetica').fontSize(10).fillColor(LIGHT)
      .text(desc, 38, y, { width: doc.page.width - 68 });
    y += 24;
  });
  pageFooter(doc, 2);

  // Week-by-week calendar
  const weeks = [
    {
      title: 'Week 1 — Introduction & Brand Awareness',
      days: [
        ['Day 1 — Monday', 'Introduce your business', '"We are [Business Name] — here\'s what we do and why we started." Share your story.'],
        ['Day 2 — Tuesday', 'Tip post', '"3 things to look for when choosing a [your service] in Accra." Add value.'],
        ['Day 3 — Wednesday', 'Behind the scenes', 'Show your workspace, your tools, your process. Humanise your brand.'],
        ['Day 4 — Thursday', 'Customer testimonial', 'Share a quote from a happy client. Add their photo if possible.'],
        ['Day 5 — Friday', 'Weekend deal or promo', '"Friday Special — book this weekend and get [bonus or discount]."'],
        ['Day 6 — Saturday', 'Before & after', 'Show the transformation your service or product creates.'],
        ['Day 7 — Sunday', 'Motivational quote', 'Something inspiring for your target audience. Keep it relevant to business.'],
      ],
    },
    {
      title: 'Week 2 — Education & Trust Building',
      days: [
        ['Day 8 — Monday', 'FAQ post', '"Our most asked question: [question]? Here is the honest answer."'],
        ['Day 9 — Tuesday', 'How-to tutorial', '"How to [solve a problem your customers face] in 3 simple steps."'],
        ['Day 10 — Wednesday', 'Team or process spotlight', 'Introduce yourself or a team member. Share your qualifications.'],
        ['Day 11 — Thursday', 'Case study or project reveal', '"We recently completed this project for [client type]. Here is what we did."'],
        ['Day 12 — Friday', 'Myth busting post', '"5 myths about [your industry] — and the truth behind each one."'],
        ['Day 13 — Saturday', 'Poll or question', '"Which do you prefer — [Option A] or [Option B]?" Encourages engagement.'],
        ['Day 14 — Sunday', 'Week in review', 'Share a highlight from the past week — a win, lesson, or grateful moment.'],
      ],
    },
  ];

  weeks.forEach((week, wi) => {
    y = contentPage(doc);
    y = sectionHeader(doc, week.title, y);
    week.days.forEach(([day, type, caption]) => {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE).text(day, 30, y);
      doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD).text(type, 30, y + 14);
      y += 26;
      doc.font('Helvetica').fontSize(9).fillColor(LIGHT)
        .text(caption, 38, y, { width: doc.page.width - 68, lineGap: 2 });
      y += doc.heightOfString(caption, { width: doc.page.width - 68, fontSize: 9 }) + 10;
    });
    pageFooter(doc, wi + 3);
  });

  // Weeks 3 & 4 combined on 2 pages
  const weeks34 = [
    {
      title: 'Week 3 — Social Proof & Community',
      days: [
        ['Day 15', 'Client spotlight', 'Feature a real client and their success story. Tag them if they agree.'],
        ['Day 16', 'Statistics post', '"Did you know? 78% of customers check a website before visiting a business."'],
        ['Day 17', 'Local community post', 'Support local events, shoutout another business, join the conversation.'],
        ['Day 18', 'Offer or service highlight', 'Explain one specific service in detail — pricing, process, timeline.'],
        ['Day 19', 'Challenge or contest', '"Comment your city below and win a free [consultation/mini service]."'],
        ['Day 20', 'Repost & engage', 'Share relevant content from your industry, add your own opinion.'],
        ['Day 21', 'Gratitude post', '"Thank you to all our clients this month. Here is what we accomplished together."'],
      ],
    },
    {
      title: 'Week 4 — Conversion & Call to Action',
      days: [
        ['Day 22', 'Problem & solution', '"Struggling with [problem]? Here is exactly how we solve it."'],
        ['Day 23', 'Pricing transparency post', '"Here is what our [service] costs and exactly what you get."'],
        ['Day 24', 'Limited offer', '"Only 3 slots available this month. Book now before they are gone."'],
        ['Day 25', 'Success story', '"This client came to us with [problem]. Today, [result]."'],
        ['Day 26', 'Behind the brand', 'Share your values, your why, and what makes you different.'],
        ['Day 27', 'WhatsApp CTA', '"Ready to start? WhatsApp us now — we reply within 2 hours."'],
        ['Day 28–30', 'Reflect & plan', 'Review your top 3 posts. What worked? Do more of that next month.'],
      ],
    },
  ];

  weeks34.forEach((week, wi) => {
    y = contentPage(doc);
    y = sectionHeader(doc, week.title, y);
    week.days.forEach(([day, type, caption]) => {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE).text(day, 30, y);
      doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD).text(type, 30, y + 14);
      y += 26;
      doc.font('Helvetica').fontSize(9).fillColor(LIGHT)
        .text(caption, 38, y, { width: doc.page.width - 68, lineGap: 2 });
      y += doc.heightOfString(caption, { width: doc.page.width - 68, fontSize: 9 }) + 10;
    });
    pageFooter(doc, wi + 5);
  });

  // Hashtag bank page
  y = contentPage(doc);
  y = sectionHeader(doc, 'Ghana Business Hashtag Bank', y);
  y = bodyText(doc, 'Copy and paste these hashtags into your posts. Mix popular and niche tags for best reach.', y);

  const hashGroups = [
    ['Ghana Business', '#GhanaBusiness #AccraBusiness #MadeInGhana #GhanaEntrepreneur #AccraLife #GhanaFashion #GhanaFood #GhanaReal Estate'],
    ['Web & Tech', '#WebDesignGhana #GhanaTech #AccraWebDesigner #DigitalGhana #GhanaDigital #WebsiteGhana'],
    ['Small Business', '#SmallBusinessGhana #SupportLocalGhana #GhanaStartup #GhanaMarket #AccraShops'],
    ['Growth', '#BusinessGrowthGhana #MarketingGhana #BrandingGhana #GhanaMarketing #DigitalMarketingGhana'],
  ];

  hashGroups.forEach(([label, tags]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(label, 30, y); y += 16;
    doc.font('Helvetica').fontSize(9).fillColor(LIGHT)
      .text(tags, 30, y, { width: doc.page.width - 60, lineGap: 3 });
    y += doc.heightOfString(tags, { width: doc.page.width - 60, fontSize: 9 }) + 12;
  });

  y += 10;
  y = sectionHeader(doc, 'Best Posting Times for Ghana', y);
  const times = [
    ['Morning Commute', '7:00am – 9:00am', 'People checking phones before/during commute'],
    ['Lunch Break', '12:00pm – 2:00pm', 'Office workers scrolling during break'],
    ['Evening Prime', '7:00pm – 9:00pm', 'Highest engagement — people relaxing at home'],
    ['Saturday', '10:00am – 12:00pm', 'Weekend browsing — great for promotions'],
  ];
  times.forEach(([time, hours, note]) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE).text(time, 30, y);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text(hours, 200, y);
    y += 14;
    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
      .text(note, 30, y, { width: doc.page.width - 60 });
    y += 20;
  });
  pageFooter(doc, 7);

  doc.end();
  console.log('✓ social-media-calendar.pdf');
}

// ── Run all ──────────────────────────────────────────────────────────────────
console.log('\nGenerating Lisgraphix PDF resources...\n');
pdf1();
pdf2();
pdf3();
pdf4();
pdf5();
console.log('\nAll PDFs saved to client/public/downloads/\n');
