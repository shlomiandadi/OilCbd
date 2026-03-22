import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo';

type Props = { items: BreadcrumbItem[] };

export default function Breadcrumbs({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="פירורי לחם" className="mb-8 text-sm text-brand-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.href}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-brand-border" aria-hidden>
                  /
                </span>
              )}
              {isLast ? (
                <span className="font-medium text-brand-ink">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-leaf"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
