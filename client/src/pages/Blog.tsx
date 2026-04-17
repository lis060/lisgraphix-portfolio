import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { posts } from '../data/posts';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function Blog() {
  const [featured, ...rest] = posts;

  return (
    <PageTransition>
      <SEO
        title="Blog"
        description="Web design tips, SEO strategies, and business growth insights for Ghanaian entrepreneurs from the Lisgraphix team."
        path="/blog"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Blog & Insights
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl">
              Grow your business online with free knowledge
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Practical guides, strategies, and insights for Ghanaian entrepreneurs who want to win online.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        {/* Featured post */}
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-5 rounded-3xl border border-white/10 bg-charcoal/60 hover:border-gold/40 transition-all overflow-hidden mb-12 hover:-translate-y-1 duration-300"
          >
            <div className="md:col-span-3 aspect-video md:aspect-auto overflow-hidden">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="md:col-span-2 p-8 flex flex-col justify-center">
              <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                Featured · {featured.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-muted text-xs mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Rest of posts */}
        <div className="grid md:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gold text-xs font-medium uppercase tracking-widest">{post.category}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-muted text-xs pt-4 border-t border-white/5">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
