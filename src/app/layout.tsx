import { Logo } from '@/components';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'CSMuseum',
  description: 'A collection of meticulously crafted Cities: Skylines cities',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${poppins.variable} min-h-full`}>
        <nav>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold hover:text-blue-600"
              >
                <Logo />
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/cities"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  All Cities
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t py-8">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-400">
            CSMuseum is proudly ad-free, independent, and open-source
          </div>
        </footer>
      </body>
    </html>
  );
}
