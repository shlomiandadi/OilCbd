import MarkdownBody from '@/components/MarkdownBody';
import { HOME_SEO_MARKDOWN } from '@/lib/home-seo-markdown';

type Props = { markdown: string };

/** תוכן SEO בדף הבית — מגיע מ־SiteSetting home.seo.markdown */
export default function HomeSeoSection({ markdown }: Props) {
  const src = markdown?.trim() ? markdown : HOME_SEO_MARKDOWN;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-brand-border bg-white px-6 py-12 shadow-brand-soft sm:px-10"
      aria-label="מידע על שמן קנאביס, CBD ומילות מפתח"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand-leaf/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"
        aria-hidden
      />
      <div className="relative prose-headings:scroll-mt-24">
        <MarkdownBody content={src} className="prose-sm sm:prose-base max-w-none" />
      </div>
    </section>
  );
}
