import { Helmet } from 'react-helmet-async';
import { site } from '../data/site';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export default function SEO({ title, description, path = '/', image }: SEOProps) {
  const fullTitle = title === 'Home' ? `Lisgraphix | ${site.tagline}` : `${title} | Lisgraphix`;
  const desc = description || site.description;
  const url = `${site.url}${path}`;
  const ogImage = image || site.ogImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Lisgraphix" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
