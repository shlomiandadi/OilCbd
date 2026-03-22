'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { createIsracardPayment } from '@/actions/checkout';
import { saveManualOrder } from '@/actions/manualCheckout';

export default function CheckoutPage() {
  const { totalPrice } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'bit' | 'paybox'>('credit');

  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-20 text-neutral-100" dir="rtl">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-10 text-center uppercase tracking-widest text-amber-500">תשלום מאובטח</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="md:col-span-2 space-y-6">
            <div className="flex gap-4">
              <button type="button" onClick={() => setPaymentMethod('credit')} className={`flex-1 py-3 rounded-xl border transition-all ${paymentMethod === 'credit' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-neutral-700 bg-neutral-900 text-neutral-300'}`}>אשראי</button>
              <button type="button" onClick={() => setPaymentMethod('bit')} className={`flex-1 py-3 rounded-xl border transition-all ${paymentMethod === 'bit' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-neutral-700 bg-neutral-900 text-neutral-300'}`}>Bit</button>
              <button type="button" onClick={() => setPaymentMethod('paybox')} className={`flex-1 py-3 rounded-xl border transition-all ${paymentMethod === 'paybox' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-neutral-700 bg-neutral-900 text-neutral-300'}`}>PayBox</button>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              {paymentMethod === 'credit' && (
                <form action={createIsracardPayment} className="space-y-4">
                  <input type="hidden" name="amount" value={totalPrice()} />
                  <input type="text" name="name" placeholder="שם מלא על הכרטיס" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 outline-none" />
                  <input type="email" name="email" placeholder="אימייל לקבלת חשבונית" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 outline-none" />
                  <button type="submit" className="w-full bg-amber-500 text-neutral-950 font-bold py-4 rounded-xl mt-4">המשך לתשלום באשראי</button>
                </form>
              )}

              {(paymentMethod === 'bit' || paymentMethod === 'paybox') && (
                <form action={saveManualOrder} className="space-y-4 text-center">
                  <p className="text-neutral-300 mb-4">העבר סך של <span className="text-amber-500 font-bold">₪{totalPrice()}</span> ב-{paymentMethod === 'bit' ? 'ביט' : 'פייבוקס'}.</p>
                  
                  {/* המקום לברקוד שתעלה */}
                  <div className="w-48 h-48 mx-auto rounded-xl border border-neutral-700 bg-neutral-950 p-2 mb-6">
                      <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-600 text-sm text-neutral-400">ברקוד {paymentMethod}</div>
                  </div>

                  <input type="hidden" name="amount" value={totalPrice()} />
                  <input type="hidden" name="paymentMethod" value={paymentMethod} />
                  
                  <div className="grid grid-cols-2 gap-4 text-right">
                    <input type="text" name="name" placeholder="שם מלא" required className="bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 outline-none" />
                    <input type="text" name="phone" placeholder="טלפון" required className="bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 outline-none" />
                  </div>
                  <input type="text" name="address" placeholder="כתובת למשלוח" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-right text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 outline-none" />
                  <input type="email" name="email" placeholder="אימייל" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-right text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 outline-none" />
                  
                  <input type="text" name="referenceNumber" placeholder="מספר אסמכתא (לאחר ההעברה)" required className="mt-4 w-full rounded-lg border border-amber-500/50 bg-neutral-950 p-3 text-center tracking-widest text-amber-400 placeholder:text-amber-500/50 outline-none focus:border-amber-500" />
                  <button type="submit" className="w-full bg-amber-500 text-neutral-950 font-bold py-4 rounded-xl mt-4">שלח הזמנה לאימות</button>
                </form>
              )}
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 h-fit">
            <h3 className="mb-4 text-lg font-bold text-neutral-100">סיכום</h3>
            <div className="flex justify-between items-center py-3 border-b border-neutral-800">
              <span className="text-neutral-400">משלוח</span><span className="text-green-500">חינם</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-xl font-bold text-neutral-100">סך הכל</span><span className="text-2xl font-bold text-amber-500">₪{totalPrice()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}