import type { SectionProps } from '../../types';

export function Section({ children, id, className = '', container = true }: SectionProps) {
  return (
    <section id={id} className={['w-full py-16 px-4', className].join(' ')}>
      {container ? (
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
