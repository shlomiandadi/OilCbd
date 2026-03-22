import MarkdownBody from '@/components/MarkdownBody';
import { HOME_SEO_MARKDOWN } from '@/lib/home-seo-markdown';

type Props = { markdown: string };

/** תוכן SEO בדף הבית — מגיע מ־SiteSetting home.seo.markdown */
export default function HomeSeoSection({ markdown }: Props) {
  const src = markdown?.trim() ? markdown : HOME_SEO_MARKDOWN;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900/50 to-neutral-950/90 px-6 py-12 sm:px-10"
      aria-label="מידע על שמן קנאביס, CBD ומילות מפתח"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl"
        aria-hidden
      />
      <div className="relative prose-headings:scroll-mt-24">
        <MarkdownBody content={src} className="prose-sm sm:prose-base max-w-none" />
      </div>
    </section>
  );
}
