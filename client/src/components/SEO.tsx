import { Helmet } from 'react-helmet-async';
import { site } from '../data/site';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string;
  schema?: object;
}

export default function SEO({ title, description, path = '/', image, keywords, schema }: SEOProps) {
  const isHome = title === 'Home';
  const fullTitle = isHome
    ? 'Lisgraphix | Web Designer in Accra Ghana — Websites That Get You Customers'
    : `${title} | Lisgraphix — Web Design Agency Accra Ghana`;

  const desc = description || site.description;
  const url = `${site.url}${path}`;
  const ogImage = image || site.ogImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Lisgraphix" />
      <meta property="og:locale" content="en_GH" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lisgraphix" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Per-page schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
