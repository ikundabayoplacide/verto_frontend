import type { ReactNode } from 'react';
import { ScrollReveal } from '../common/ScrollReveal';
import { WhatsAppFAB } from '../common/WhatsAppFAB';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
  /** Optional className on the main element */
  className?: string;
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className={['flex flex-col min-h-screen', className].join(' ')}>
        {children}
      </main>
      <Footer />
      <WhatsAppFAB phone="250782170000" message="Hello! I'd like to discuss a project." />
    </>
  );
}
