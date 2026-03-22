import type { ReactNode } from 'react';

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brand-leaf-dark">{label}</span>
      {children}
      {hint ? (
        <span className="block text-xs leading-relaxed text-brand-ink-muted/80">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export const adminInputClass =
  'w-full rounded-xl border border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-ink shadow-sm outline-none transition placeholder:text-brand-ink-muted/40 focus:border-brand-leaf focus:ring-2 focus:ring-brand-leaf/20';

export const adminBtnPrimary =
  'inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-brand-leaf to-brand-leaf-dark px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-leaf/20 transition hover:brightness-105';

export const adminBtnSecondary =
  'inline-flex items-center justify-center rounded-xl border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-ink shadow-sm transition hover:border-brand-leaf/40 hover:bg-brand-cream';

export const adminBtnDanger =
  'rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50';
