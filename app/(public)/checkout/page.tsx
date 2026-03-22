'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { createIsracardPayment } from '@/actions/checkout';
import { saveManualOrder } from '@/actions/manualCheckout';

const inputClass =
  'w-full rounded-xl border border-brand-border bg-white p-3 text-brand-ink placeholder:text-brand-ink-muted/50 outline-none focus:border-brand-leaf focus:ring-2 focus:ring-brand-leaf/15';

export default function CheckoutPage() {
  const { totalPrice } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'bit' | 'paybox'>('credit');

  const tabBase =
    'flex-1 rounded-xl border py-3 text-sm font-semibold transition-all';
  const tabInactive = 'border-brand-border bg-white text-brand-ink-muted hover:border-brand-leaf/30';

  return (
    <div className="min-h-screen bg-brand-bg pb-20 pt-16 text-brand-ink" dir="rtl">
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-10 text-center text-3xl font-bold uppercase tracking-widest text-brand-leaf-dark">
          תשלום מאובטח
        </h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`${tabBase} ${
                  paymentMethod === 'credit'
                    ? 'border-brand-leaf bg-brand-cream text-brand-leaf-dark ring-2 ring-brand-leaf/20'
                    : tabInactive
                }`}
              >
                אשראי
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('bit')}
                className={`${tabBase} ${
                  paymentMethod === 'bit'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                    : tabInactive
                }`}
              >
                Bit
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paybox')}
                className={`${tabBase} ${
                  paymentMethod === 'paybox'
                    ? 'border-cyan-500 bg-cyan-50 text-cyan-800 ring-2 ring-cyan-200'
                    : tabInactive
                }`}
              >
                PayBox
              </button>
            </div>

            <div className="rounded-2xl border border-brand-border bg-white p-8 shadow-brand-soft">
              {paymentMethod === 'credit' && (
                <form action={createIsracardPayment} className="space-y-4">
                  <input type="hidden" name="amount" value={totalPrice()} />
                  <input
                    type="text"
                    name="name"
                    placeholder="שם מלא על הכרטיס"
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="אימייל לקבלת חשבונית"
                    required
                    className={inputClass}
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-gradient-to-l from-brand-leaf to-brand-leaf-dark py-4 font-bold text-white shadow-md shadow-brand-leaf/20 transition hover:brightness-105"
                  >
                    המשך לתשלום באשראי
                  </button>
                </form>
              )}

              {(paymentMethod === 'bit' || paymentMethod === 'paybox') && (
                <form action={saveManualOrder} className="space-y-4 text-center">
                  <p className="mb-4 text-brand-ink-muted">
                    העבר סך של{' '}
                    <span className="font-bold text-brand-leaf-dark">₪{totalPrice()}</span> ב-
                    {paymentMethod === 'bit' ? 'ביט' : 'פייבוקס'}.
                  </p>

                  <div className="mx-auto mb-6 h-48 w-48 rounded-xl border border-brand-border bg-brand-cream/50 p-2">
                    <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-brand-border text-sm text-brand-ink-muted">
                      ברקוד {paymentMethod}
                    </div>
                  </div>

                  <input type="hidden" name="amount" value={totalPrice()} />
                  <input type="hidden" name="paymentMethod" value={paymentMethod} />

                  <div className="grid grid-cols-2 gap-4 text-right">
                    <input type="text" name="name" placeholder="שם מלא" required className={inputClass} />
                    <input type="text" name="phone" placeholder="טלפון" required className={inputClass} />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="כתובת למשלוח"
                    required
                    className={inputClass}
                  />
                  <input type="email" name="email" placeholder="אימייל" required className={inputClass} />

                  <input
                    type="text"
                    name="referenceNumber"
                    placeholder="מספר אסמכתא (לאחר ההעברה)"
                    required
                    className={`${inputClass} mt-4 text-center tracking-widest`}
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-gradient-to-l from-brand-leaf to-brand-leaf-dark py-4 font-bold text-white shadow-md shadow-brand-leaf/20 transition hover:brightness-105"
                  >
                    שלח הזמנה לאימות
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-brand-border bg-white p-6 shadow-brand-soft">
            <h3 className="mb-4 text-lg font-bold text-brand-ink">סיכום</h3>
            <div className="flex items-center justify-between border-b border-brand-border py-3">
              <span className="text-brand-ink-muted">משלוח</span>
              <span className="font-semibold text-brand-leaf">חינם</span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-xl font-bold text-brand-ink">סך הכל</span>
              <span className="text-2xl font-bold text-brand-leaf-dark">₪{totalPrice()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
