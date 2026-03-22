'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function saveManualOrder(formData: FormData) {
  const customerName = formData.get('name') as string;
  const customerEmail = formData.get('email') as string;
  const customerPhone = formData.get('phone') as string;
  const shippingAddress = formData.get('address') as string;
  const totalAmount = parseFloat(formData.get('amount') as string);
  const paymentMethod = formData.get('paymentMethod') as string;
  const referenceNumber = formData.get('referenceNumber') as string;

  try {
    await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        totalAmount,
        paymentMethod,
        referenceNumber,
        status: 'PENDING',
      }
    });
    // אפשר להוסיף כאן שליחת מייל אישור אליך וללקוח
  } catch (error) {
    console.error('Failed to save manual order:', error);
    throw new Error('אירעה שגיאה בשמירת ההזמנה.');
  }
  
  redirect('/checkout?success=true');
}