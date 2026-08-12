import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://uriv-portfolio.vercel.app'),
  title: 'Virender Gupta — Machine Learning Engineer & Full-Stack Developer',
  description: 'Portfolio of Virender Gupta (Uriv) — ML Engineer and Full-Stack Developer building local-first AI systems, geospatial engines, and production web applications.',
  keywords: ['Virender Gupta', 'Uriv', 'Machine Learning Engineer', 'Full-Stack Developer', 'Portfolio', 'RAG', 'GeoAI'],
  openGraph: {
    title: 'Virender Gupta — Uriv',
    description: 'Machine Learning Engineer & Full-Stack Developer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virender Gupta — Uriv',
    description: 'Machine Learning Engineer & Full-Stack Developer',
  },
};

export const viewport = {
  themeColor: '#0B0E14',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
