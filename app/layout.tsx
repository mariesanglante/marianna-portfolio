import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Marianna Gonchar — Senior Product Designer',
  description: 'Senior product designer working across AI and fintech. Selected work for Semaverse and Lumio, from product strategy and research to thoughtful digital experiences.',
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
