import Link from 'next/link';

/** תוכן SEO לדף הבית — מילות מפתח + קישורים פנימיים ל־/learn */
export default function HomeSeoSection() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900/50 to-neutral-950/90 px-6 py-12 sm:px-10"
      aria-labelledby="seo-about-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl"
        aria-hidden
      />

      <h2
        id="seo-about-heading"
        className="relative text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl"
      >
        מה זה שמן קנאביס ו־CBD — מדריך קצר לקנייה חכמה
      </h2>
      <p className="relative mt-4 max-w-3xl text-base leading-relaxed text-neutral-300">
        <strong className="font-semibold text-amber-200/90">שמן קנאביס</strong> ו־
        <strong className="font-semibold text-amber-200/90"> שמן CBD</strong> (לעיתים נקרא גם{' '}
        <span lang="en">cbd oil</span>) הם מונחים שחוזרים בחיפוש בישראל לצד ביטויים כמו{' '}
        <strong>שמן קנאביס רפואי</strong>, <strong>CBD</strong>,{' '}
        <strong>שמן זרעי קנאביס</strong> (שונה משמן עשיר ב־CBD), ומוצרים כמו{' '}
        <strong>cbd gummies</strong>, <strong>cbd vape pen</strong> או{' '}
        <strong>CBD לכלבים</strong>. ההבדלים בין ריכוזים, פורמטים ומותגים (למשל רשתות או שמות
        כמו <span lang="en">Happy Garden</span>) משפיעים על חוויית השימוש — בחרו לפי צורך, תיעוד
        מעבדה והתאמה אישית.
      </p>

      <div className="relative mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
          <h3 className="text-lg font-semibold text-neutral-100">שמן קנאביס לכאבים ולשימוש יומיומי</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            רבים מחפשים <strong>שמן קנאביס לכאבים</strong> או מידע על{' '}
            <strong>שמן קנאביס לאידוי</strong> לעומת טיפות — התאימו את הפורמט לצורך שלכם. למידע
            מורחב:{' '}
            <Link href="/learn/shemen-cannabis-le-kaavim" className="text-amber-500 hover:text-amber-400">
              שמן קנאביס לכאבים
            </Link>
            ,{' '}
            <Link href="/learn/eich-mishtamshim-shemen-cbd" className="text-amber-500 hover:text-amber-400">
              איך משתמשים בשמן CBD
            </Link>
            .
          </p>
        </article>
        <article className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
          <h3 className="text-lg font-semibold text-neutral-100">חוקיות, בטיחות ושאלות נפוצות</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            נושאים כמו <strong>שמן קנאביס חוקי</strong>,{' '}
            <Link href="/learn/shemen-cannabis-tofaot-lavay" className="text-amber-500 hover:text-amber-400">
              תופעות לוואי
            </Link>
            , או האם <strong>שמן קנאביס ממכר</strong> — דורשים עדכון רגולטורי. התחילו מכאן:{' '}
            <Link href="/learn/shemen-cannabis-huki" className="text-amber-500 hover:text-amber-400">
              שמן קנאביס חוקי
            </Link>
            ,{' '}
            <Link href="/learn/cbd-mah-ze" className="text-amber-500 hover:text-amber-400">
              CBD מה זה
            </Link>
            .
          </p>
        </article>
      </div>

      <nav
        className="relative mt-8 flex flex-wrap gap-3 border-t border-neutral-800 pt-8 text-sm"
        aria-label="מדריכים מומלצים"
      >
        <span className="w-full text-neutral-500">מדריכים נוספים:</span>
        <Link
          href="/learn/ma-ze-shemen-cannabis"
          className="rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-2 text-neutral-300 transition hover:border-amber-500/40 hover:text-amber-400"
        >
          מה זה שמן קנאביס
        </Link>
        <Link
          href="/learn/shemen-cannabis-yitronot"
          className="rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-2 text-neutral-300 transition hover:border-amber-500/40 hover:text-amber-400"
        >
          יתרונות שמן קנאביס
        </Link>
        <Link
          href="/learn/cbd-gummies"
          className="rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-2 text-neutral-300 transition hover:border-amber-500/40 hover:text-amber-400"
        >
          cbd gummies
        </Link>
        <Link
          href="/learn/cbd-le-klavim"
          className="rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-2 text-neutral-300 transition hover:border-amber-500/40 hover:text-amber-400"
        >
          CBD לכלבים
        </Link>
        <Link href="/learn" className="rounded-full bg-amber-500/15 px-4 py-2 font-semibold text-amber-400">
          כל המדריכים
        </Link>
      </nav>
    </section>
  );
}
