import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="container mx-auto min-h-[50vh] px-6 py-20 text-center">
      <h1 className="mb-4 text-2xl font-bold text-brand-ink">המוצר לא נמצא</h1>
      <p className="mb-8 text-brand-ink-muted">
        ייתכן שהקישור פג תוקף או שהמוצר הוסר מהמלאי.
      </p>
      <Link href="/" className="font-medium text-brand-leaf hover:text-brand-leaf-dark">
        חזרה לדף הבית
      </Link>
    </main>
  );
}
