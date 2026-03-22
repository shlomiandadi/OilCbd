export default function DeliveryInfo() {
  return (
    <div className="rounded-3xl border border-amber-500/15 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-8 shadow-inner shadow-black/20">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500 ring-1 ring-amber-500/30">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-xl font-bold text-neutral-100 sm:text-2xl">
            משלוחים מהירים ודיסקרטיות
          </h3>
          <p className="mt-3 leading-relaxed text-neutral-400">
            מערך חלוקה לכל הארץ — אריזות אטומות ללא לוגו בולט. מתאים ללקוחות שמחפשים{' '}
            <strong className="font-medium text-neutral-300">שמן CBD</strong>,{' '}
            <strong className="font-medium text-neutral-300">שמן קנאביס</strong> או מוצרי{' '}
            <span lang="en">cbd oil</span> עם שקט נפשי בקבלת המשלוח.
          </p>
        </div>
      </div>
    </div>
  );
}
