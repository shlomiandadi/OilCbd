import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const img = (seed: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;

type BreadcrumbSeed = { name: string; href: string };

function breadcrumbs(slug: string, productName: string): BreadcrumbSeed[] {
  return [
    { name: 'דף הבית', href: '/' },
    { name: 'מוצרים', href: '/' },
    { name: productName, href: `/products/${slug}` },
  ];
}

const catalog: Array<{
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalPath: string;
  ogImage: string | null;
  breadcrumbJson: BreadcrumbSeed[];
  name: string;
  description: string;
  variants: Array<{
    label: string;
    price: number;
    volumeMl: number;
    cbdPercentage: number;
    thcPercentage: number | null;
    stock: number;
    image: string;
    sortOrder: number;
    labResultsUrl?: string;
  }>;
}> = [
  {
    slug: 'full-spectrum-cbd',
    seoTitle: 'שמן CBD מלא ספקטרום פרימיום',
    seoDescription:
      'שמן CBD מלא ספקטרום באיכות גבוהה — טרפנים ופלבנואידים, מגוון נפחים וריכוזים. משלוח דיסקרטי בישראל.',
    seoKeywords:
      'שמן CBD, קנאביס רפואי, מלא ספקטרום, שמן קנאביס, CBD ישראל, OilCbd',
    canonicalPath: '/products/full-spectrum-cbd',
    ogImage: null,
    breadcrumbJson: breadcrumbs('full-spectrum-cbd', 'שמן CBD מלא ספקטרום'),
    name: 'שמן CBD מלא ספקטרום',
    description:
      'תמצית פרימיום מזן אינדיקה מובחר, מעובד בקור כדי לשמר טרפנים ופלבנואידים. מתאים לשימוש יומיומי לאיזון ורוגע.',
    variants: [
      {
        label: '10 מ״ל · 5% CBD',
        price: 129,
        volumeMl: 10,
        cbdPercentage: 5,
        thcPercentage: 0.2,
        stock: 48,
        image: img('oil-full-10'),
        sortOrder: 0,
      },
      {
        label: '30 מ״ל · 10% CBD',
        price: 289,
        volumeMl: 30,
        cbdPercentage: 10,
        thcPercentage: 0.2,
        stock: 32,
        image: img('oil-full-30-10'),
        sortOrder: 1,
      },
      {
        label: '30 מ״ל · 15% CBD',
        price: 349,
        volumeMl: 30,
        cbdPercentage: 15,
        thcPercentage: 0.2,
        stock: 22,
        image: img('oil-full-30-15'),
        sortOrder: 2,
      },
    ],
  },
  {
    slug: 'cbd-sleep-drops',
    seoTitle: 'טיפות CBD לשינה עמוקה — לבנדר וקמומיל',
    seoDescription:
      'טיפות CBD לשינה עם לבנדר וקמומיל. נוח לשימוש לפני השינה. ריכוזים שונים — הזמנה מאובטחת.',
    seoKeywords: 'CBD שינה, טיפות CBD, לבנדר, קנאביס רפואי, OilCbd',
    canonicalPath: '/products/cbd-sleep-drops',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-sleep-drops', 'טיפות CBD לשינה עמוקה'),
    name: 'טיפות CBD לשינה עמוקה',
    description:
      'נוסחה עם תמצית לבנדר וקמומיל לשילוב עם CBD. מומלץ 30–60 דקות לפני השינה.',
    variants: [
      {
        label: '15 מ״ל · 8% CBD',
        price: 159,
        volumeMl: 15,
        cbdPercentage: 8,
        thcPercentage: null,
        stock: 55,
        image: img('sleep-15'),
        sortOrder: 0,
      },
      {
        label: '30 מ״ל · 8% CBD',
        price: 269,
        volumeMl: 30,
        cbdPercentage: 8,
        thcPercentage: null,
        stock: 38,
        image: img('sleep-30'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'cbd-lemon-oil',
    seoTitle: 'שמן CBD בטעם לימון טבעי (MCT)',
    seoDescription:
      'שמן נשא MCT עם תמצית לימון — טעם עדין ונוח לשימוש. בחרו נפח וריכוז מתאימים.',
    seoKeywords: 'שמן CBD, לימון, MCT, קנאביס רפואי, OilCbd',
    canonicalPath: '/products/cbd-lemon-oil',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-lemon-oil', 'שמן CBD בטעם לימון'),
    name: 'שמן CBD בטעם לימון',
    description:
      'שמן נשא MCT עם תמצית לימון טבעית. טעם עדין, קל לטפטוף מתחת ללשון.',
    variants: [
      {
        label: '10 מ״ל · 6% CBD',
        price: 119,
        volumeMl: 10,
        cbdPercentage: 6,
        thcPercentage: null,
        stock: 60,
        image: img('lemon-10'),
        sortOrder: 0,
      },
      {
        label: '20 מ״ל · 6% CBD',
        price: 199,
        volumeMl: 20,
        cbdPercentage: 6,
        thcPercentage: null,
        stock: 44,
        image: img('lemon-20'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'cbd-soft-capsules',
    seoTitle: 'קפסולות CBD רכות — מינון מדויק',
    seoDescription:
      'קפסולות CBD עם מנה קבועה — נוח לנסיעות ולשגרה. מגוון חבילות ומינונים.',
    seoKeywords: 'קפסולות CBD, CBD בליעה, מינון CBD, OilCbd',
    canonicalPath: '/products/cbd-soft-capsules',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-soft-capsules', 'קפסולות CBD רכות'),
    name: 'קפסולות CBD רכות',
    description:
      'כל קפסולה מכילה מנה מדויקת של שמן CBD. נוח לנסיעות ולשגרה עמוסה.',
    variants: [
      {
        label: '30 קפסולות · 10 מ״ג CBD ליחידה',
        price: 179,
        volumeMl: 0,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 70,
        image: img('caps-30-10'),
        sortOrder: 0,
      },
      {
        label: '60 קפסולות · 10 מ״ג CBD ליחידה',
        price: 319,
        volumeMl: 0,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 40,
        image: img('caps-60-10'),
        sortOrder: 1,
      },
      {
        label: '30 קפסולות · 25 מ״ג CBD ליחידה',
        price: 259,
        volumeMl: 0,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 28,
        image: img('caps-30-25'),
        sortOrder: 2,
      },
    ],
  },
  {
    slug: 'cbd-topical-cream',
    seoTitle: 'משחת CBD טופיקלית לעיסוי',
    seoDescription:
      'משחת CBD לעיסוי חיצוני — מרקם נעים, נספג מהר. לא למאכל. בחרו נפח.',
    seoKeywords: 'משחת CBD, קרם CBD, טופיקלי, OilCbd',
    canonicalPath: '/products/cbd-topical-cream',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-topical-cream', 'משחת CBD טופיקלית'),
    name: 'משחת CBD טופיקלית',
    description:
      'קרם עשיר לעיסוי מקומי. ללא ריח חזק, נספג מהר. לא למאכל.',
    variants: [
      {
        label: '50 מ״ל · 500 מ״ג CBD כולל',
        price: 99,
        volumeMl: 50,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 45,
        image: img('cream-50'),
        sortOrder: 0,
      },
      {
        label: '100 מ״ל · 1000 מ״ג CBD כולל',
        price: 169,
        volumeMl: 100,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 30,
        image: img('cream-100'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'cbd-pet-oil',
    seoTitle: 'שמן CBD לחיות מחמד — כלבים וחתולים',
    seoDescription:
      'שמן CBD לחיות מחמד — מינון מותאם. הוסיפו למזון לפי הוראות. משלוח בישראל.',
    seoKeywords: 'CBD לכלבים, CBD לחתולים, שמן קנאביס לחיות, OilCbd',
    canonicalPath: '/products/cbd-pet-oil',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-pet-oil', 'שמן CBD לחיות מחמד'),
    name: 'שמן CBD לחיות מחמד',
    description:
      'מינון מותאם לכלבים וחתולים בינוניים. טפטפו על המזון לפי הוראות על המארז.',
    variants: [
      {
        label: '10 מ״ל · 3% CBD',
        price: 89,
        volumeMl: 10,
        cbdPercentage: 3,
        thcPercentage: null,
        stock: 50,
        image: img('pet-10'),
        sortOrder: 0,
      },
      {
        label: '30 מ״ל · 3% CBD',
        price: 219,
        volumeMl: 30,
        cbdPercentage: 3,
        thcPercentage: null,
        stock: 33,
        image: img('pet-30'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'cbd-cooling-gel',
    seoTitle: 'ג׳ל קירור לעיסוי CBD עם מנטול',
    seoDescription:
      'ג׳ל קירור עם CBD ומנטול לעיסוי מקומי. תחושת קור מהירה. בחרו גודל אריזה.',
    seoKeywords: 'ג׳ל CBD, קירור, עיסוי, OilCbd',
    canonicalPath: '/products/cbd-cooling-gel',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-cooling-gel', 'ג׳ל קירור לעיסוי CBD'),
    name: 'ג׳ל קירור לעיסוי CBD',
    description:
      'תחושת קור מהירה לאזורים ממוקדים. משולב עם מנטול ותמצית CBD.',
    variants: [
      {
        label: '75 מ״ל · 300 מ״ג CBD',
        price: 109,
        volumeMl: 75,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 42,
        image: img('gel-75'),
        sortOrder: 0,
      },
      {
        label: '150 מ״ל · 600 מ״ג CBD',
        price: 189,
        volumeMl: 150,
        cbdPercentage: 0,
        thcPercentage: null,
        stock: 25,
        image: img('gel-150'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'cbd-thc-free-oil',
    seoTitle: 'שמן CBD ללא THC — רחב ספקטרום',
    seoDescription:
      'שמן CBD ללא THC מדיד — מתאים למי שמעדיף מוצר ללא רכיב פסיכואקטיבי. משלוח דיסקרטי.',
    seoKeywords: 'CBD ללא THC, שמן CBD, קנאביס רפואי, OilCbd',
    canonicalPath: '/products/cbd-thc-free-oil',
    ogImage: null,
    breadcrumbJson: breadcrumbs('cbd-thc-free-oil', 'שמן CBD ללא THC'),
    name: 'שמן CBD ללא THC',
    description:
      'מבודד רחב־ספקטרום ללא THC מדיד. מתאים למי שמעדיף אפס עשרוניות THC.',
    variants: [
      {
        label: '15 מ״ל · 12% CBD',
        price: 199,
        volumeMl: 15,
        cbdPercentage: 12,
        thcPercentage: 0,
        stock: 36,
        image: img('nothc-15'),
        sortOrder: 0,
      },
      {
        label: '30 מ״ל · 12% CBD',
        price: 359,
        volumeMl: 30,
        cbdPercentage: 12,
        thcPercentage: 0,
        stock: 24,
        image: img('nothc-30'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'starter-pack-oilcbd',
    seoTitle: 'חבילת התחלה — שמן CBD וקפסולות',
    seoDescription:
      'חבילת התחלה: שמן CBD וקפסולות לדוגמה — אידאלי לנסיון ראשון. הזמנה מאובטחת.',
    seoKeywords: 'חבילת התחלה, CBD, שמן קנאביס, OilCbd',
    canonicalPath: '/products/starter-pack-oilcbd',
    ogImage: null,
    breadcrumbJson: breadcrumbs('starter-pack-oilcbd', 'חבילת התחלה OilCbd'),
    name: 'חבילת התחלה OilCbd',
    description:
      'קומבינציה: בקבוק שמן קטן + קפסולות לדוגמה. אידאלי לנסיון ראשון.',
    variants: [
      {
        label: 'שמן 5 מ״ל + 10 קפסולות',
        price: 149,
        volumeMl: 5,
        cbdPercentage: 5,
        thcPercentage: null,
        stock: 80,
        image: img('starter-a'),
        sortOrder: 0,
      },
      {
        label: 'שמן 10 מ״ל + 20 קפסולות',
        price: 229,
        volumeMl: 10,
        cbdPercentage: 5,
        thcPercentage: null,
        stock: 55,
        image: img('starter-b'),
        sortOrder: 1,
      },
    ],
  },
  {
    slug: 'gold-edition-premium',
    seoTitle: 'שמן CBD Gold Edition — סדרה מוגבלת',
    seoDescription:
      'שמן CBD Gold Edition — סדרה מוגבלת, אריזת מתנה, בדיקות מעבדה. ריכוזים גבוהים.',
    seoKeywords: 'CBD פרימיום, Gold Edition, שמן קנאביס, OilCbd',
    canonicalPath: '/products/gold-edition-premium',
    ogImage: null,
    breadcrumbJson: breadcrumbs('gold-edition-premium', 'שמן פרימיום Gold Edition'),
    name: 'שמן פרימיום Gold Edition',
    description:
      'סדרה מוגבלת מזן הידרופוני, חליטה ארוכה ותססול קר. אריזת מתנה.',
    variants: [
      {
        label: '20 מ״ל · 20% CBD',
        price: 449,
        volumeMl: 20,
        cbdPercentage: 20,
        thcPercentage: 0.15,
        stock: 18,
        image: img('gold-20'),
        sortOrder: 0,
        labResultsUrl: 'https://example.com/lab/gold-20',
      },
      {
        label: '50 מ״ל · 20% CBD',
        price: 899,
        volumeMl: 50,
        cbdPercentage: 20,
        thcPercentage: 0.15,
        stock: 10,
        image: img('gold-50-20'),
        sortOrder: 1,
        labResultsUrl: 'https://example.com/lab/gold-50',
      },
      {
        label: '50 מ״ל · 25% CBD',
        price: 1049,
        volumeMl: 50,
        cbdPercentage: 25,
        thcPercentage: 0.15,
        stock: 6,
        image: img('gold-50-25'),
        sortOrder: 2,
        labResultsUrl: 'https://example.com/lab/gold-25',
      },
    ],
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  for (const item of catalog) {
    await prisma.product.create({
      data: {
        slug: item.slug,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        seoKeywords: item.seoKeywords,
        canonicalPath: item.canonicalPath,
        ogImage: item.ogImage,
        breadcrumbJson: item.breadcrumbJson,
        name: item.name,
        description: item.description,
        variants: {
          create: item.variants.map((v) => ({
            label: v.label,
            price: v.price,
            volumeMl: v.volumeMl,
            cbdPercentage: v.cbdPercentage,
            thcPercentage: v.thcPercentage,
            stock: v.stock,
            image: v.image,
            sortOrder: v.sortOrder,
            labResultsUrl: v.labResultsUrl ?? null,
          })),
        },
      },
    });
  }

  const count = await prisma.product.count();
  const vCount = await prisma.productVariant.count();
  console.log(`נוצרו ${count} מוצרים ו־${vCount} וריאציות.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
