import {
  Children,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

// Observe the available content width, including changes caused by the sidebar.
export function ResponsiveCardRow({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [capacity, setCapacity] = useState(2);
  const cards = Children.toArray(children);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = (width: number) => {
      const count = Math.max(1, Math.floor((width + 13) / (140 + 13)));
      setCapacity((previous) => (previous === count ? previous : count));
    };
    update(element.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => update(entries[0].contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const count = Math.min(capacity, cards.length);
  return (
    <div
      ref={ref}
      className={className + ' responsive-card-row'}
      style={{ '--visible-cards': Math.max(1, count) } as CSSProperties}
    >
      {cards.slice(0, count)}
    </div>
  );
}
