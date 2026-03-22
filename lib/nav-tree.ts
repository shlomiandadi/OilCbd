export type NavNode = {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
  children: NavNode[];
};

type Flat = {
  id: string;
  label: string;
  href: string;
  parentId: string | null;
  sortOrder: number;
};

/** בניית עץ ניווט מהרשומות השטוחות של Prisma */
export function buildNavTree(links: Flat[]): NavNode[] {
  const rootKey = '__root__';
  const byParent = new Map<string, Flat[]>();
  for (const l of links) {
    const k = l.parentId ?? rootKey;
    if (!byParent.has(k)) byParent.set(k, []);
    byParent.get(k)!.push(l);
  }
  for (const arr of byParent.values()) {
    arr.sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label, 'he'));
  }

  function walk(parentId: string | null): NavNode[] {
    const k = parentId ?? rootKey;
    const list = byParent.get(k) ?? [];
    return list.map((l) => ({
      id: l.id,
      label: l.label,
      href: l.href,
      sortOrder: l.sortOrder,
      children: walk(l.id),
    }));
  }

  return walk(null);
}
