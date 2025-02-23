import {
  Logo,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';
import { cities } from '@/content';
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
    <html lang="en" className="h-full overflow-x-hidden">
      <body className={`${inter.variable} ${poppins.variable} min-h-full`}>
        <nav className="sticky top-0 z-50 border-b border-gray-950/10 bg-white/95 backdrop-blur-lg">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <TooltipProvider delayDuration={50}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold hover:text-blue-600"
                    >
                      <Logo />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>
                    Return to home
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-foreground/50">
                Curated {cities.length} best cities
              </p>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t bg-gray-100 py-16">
          <div className="max-w-8xl mx-auto px-4 text-center text-sm text-gray-400">
            CSMuseum is proudly non-profit, ad-free, independent, and
            open-source. All contents belong to their original creators.
          </div>
        </footer>
      </body>
    </html>
  );
}
