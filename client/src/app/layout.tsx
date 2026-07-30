import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TripStack',
  description: 'Travel content guidebook publisher for creators and consumers',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
