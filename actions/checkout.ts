'use server';

import { redirect } from 'next/navigation';

export async function createIsracardPayment(formData: FormData) {
  const customerName = formData.get('name') as string;
  const totalAmount = formData.get('amount') as string;
  
  // כאן תשב הלוגיקה האמיתית מול ה-API של ישראכרט ברגע שיהיו לך המפתחות.
  console.log(`Processing Isracard payment for ${customerName}, amount: ${totalAmount}`);
  
  // בינתיים נפנה להצלחה (Mock)
  redirect('/checkout?success=true');
}