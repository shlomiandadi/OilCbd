import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo';

type Props = { items: BreadcrumbItem[] };

export default function Breadcrumbs({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="פירורי לחם" className="mb-8 text-sm text-neutral-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.href}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-neutral-600" aria-hidden>/</span>}
              {isLast ? (
                <span className="font-medium text-neutral-200">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-amber-500 transition-colors">
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
