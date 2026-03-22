import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="container mx-auto min-h-[50vh] px-6 py-20 text-center">
      <h1 className="mb-4 text-2xl font-bold text-neutral-100">המוצר לא נמצא</h1>
      <p className="mb-8 text-neutral-400">ייתכן שהקישור פג תוקף או שהמוצר הוסר מהמלאי.</p>
      <Link href="/" className="text-amber-500 hover:text-amber-400">
        חזרה לדף הבית
      </Link>
    </main>
  );
}
