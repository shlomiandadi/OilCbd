export type BreadcrumbItem = { name: string; href: string };

export function parseBreadcrumbJson(value: unknown): BreadcrumbItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (item && typeof item === 'object' && 'name' in item && 'href' in item) {
        const o = item as { name: unknown; href: unknown };
        if (typeof o.name === 'string' && typeof o.href === 'string') {
          return { name: o.name, href: o.href };
        }
      }
      return null;
    })
    .filter((x): x is BreadcrumbItem => x !== null);
}
