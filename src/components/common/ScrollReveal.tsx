import { useEffect } from 'react';

/**
 * Mount once in your app root.
 * Observes all [data-reveal] elements and adds .reveal-visible when they enter the viewport.
 * Uses a MutationObserver to pick up elements added after initial render (e.g. async data).
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    // Observe an element only if it hasn't been revealed yet
    const observe = (el: Element) => {
      if (!el.classList.contains('reveal-visible')) {
        io.observe(el);
      }
    };

    // Observe all existing [data-reveal] elements
    document.querySelectorAll('[data-reveal]').forEach(observe);

    // Watch for new [data-reveal] elements added to the DOM asynchronously
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as Element;
          if (el.hasAttribute('data-reveal')) observe(el);
          el.querySelectorAll?.('[data-reveal]').forEach(observe);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
