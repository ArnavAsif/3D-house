import './globals.css';

export const metadata = {
  title: 'Villa Lumina | 3D Luxury Architectural Showroom',
  description:
    'Interactive 3D modern luxury showroom residence rendered with React Three Fiber, Three.js, and custom Next.js + Supabase Commerce backend.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  );
}
