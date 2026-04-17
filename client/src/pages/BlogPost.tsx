import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { posts } from '../data/posts';
import NotFound from './NotFound';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const paragraphs = post.content.trim().split(/\n\n+/);

  return (
    <PageTransition>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
      />

      {/* Header */}
      <section className="pt-28 pb-0 bg-ink">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted text-sm hover:text-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-4 block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-8">{post.excerpt}</p>

            <div className="flex items-center gap-5 text-muted text-sm pb-8 border-b border-white/5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold" /> {post.readTime}
              </span>
              <span className="ml-auto text-xs">By Lisgraphix</span>
            </div>
          </Reveal>
        </div>

        {/* Cover */}
        <div className="max-w-5xl mx-auto px-6 mt-8">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="prose-custom space-y-6">
              {paragraphs.map((para, i) => {
                if (para.startsWith('**') && para.endsWith('**')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-white mt-10 mb-3">
                      {para.replace(/\*\*/g, '')}
                    </h2>
                  );
                }
                if (para.includes('**')) {
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} className="text-white/70 leading-relaxed text-base">
                      {parts.map((part, j) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                          <strong key={j} className="text-white font-semibold">
                            {part.replace(/\*\*/g, '')}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                }
                return (
                  <p key={i} className="text-white/70 leading-relaxed text-base">
                    {para}
                  </p>
                );
              })}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-16 p-8 rounded-2xl border border-gold/20 bg-gold/5 text-center">
              <p className="text-white font-bold text-xl mb-2">Ready to grow your business online?</p>
              <p className="text-muted text-sm mb-6">Book a free consultation with Lisgraphix today.</p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-ink font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                Book a Free Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </PageTransition>
  );
}
