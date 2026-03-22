import type { PrismaClient } from '@prisma/client';
import { blogPostBody, learnPageBody } from './content-bodies';
import { seedSiteSettings } from './seed-site-settings';

type B = { name: string; href: string };

function learnBreadcrumb(slug: string, title: string): B[] {
  return [
    { name: 'דף הבית', href: '/' },
    { name: 'מדריכים ומילות מפתח', href: '/learn' },
    { name: title, href: `/learn/${slug}` },
  ];
}

function blogBreadcrumb(slug: string, title: string): B[] {
  return [
    { name: 'דף הבית', href: '/' },
    { name: 'בלוג', href: '/blog' },
    { name: title, href: `/blog/${slug}` },
  ];
}

export async function seedCms(prisma: PrismaClient) {
  const categories = [
    {
      slug: 'shemen-cannabis',
      name: 'שמן קנאביס',
      description: 'מדריכים על שמן קנאביס, שימושים ויתרונות משוערים',
      seoTitle: 'שמן קנאביס — מדריכים',
      seoDescription: 'מידע מקצועי על שמן קנאביס, CBD ושמן CBD בישראל.',
      sortOrder: 0,
    },
    {
      slug: 'cbd',
      name: 'CBD',
      description: 'מה זה CBD, cbd oil, מונחים ושאלות נפוצות',
      seoTitle: 'CBD — מדריכים',
      seoDescription: 'מידע על קנבידיול (CBD), שמן CBD ומוצרים נלווים.',
      sortOrder: 1,
    },
    {
      slug: 'legal-safety',
      name: 'חוק ובטיחות',
      description: 'חוקיות, תופעות לוואי והבנת סיכונים',
      seoTitle: 'שמן קנאביס חוקי ובטיחות',
      seoDescription: 'מידע כללי על חוקיות, תופעות לוואי ושאלות בטיחות.',
      sortOrder: 2,
    },
    {
      slug: 'pets-products',
      name: 'כלבים ומוצרים',
      description: 'CBD לכלבים, שמן CBD לכלבים ומונחי מוצר',
      seoTitle: 'CBD לכלבים ומוצרים',
      seoDescription: 'מידע כללי על מוצרי CBD לחיות מחמד ופורמטים שונים.',
      sortOrder: 3,
    },
    {
      slug: 'retail-brands',
      name: 'רשתות ומותגים',
      description: 'הקשר צרכני — סופר פארם, Happy Garden וכו׳',
      seoTitle: 'רשתות ומותגי CBD',
      seoDescription: 'הקשר כללי בין מוצרי CBD לרשתות ומותגים בישראל.',
      sortOrder: 4,
    },
  ];

  const catIds: Record<string, string> = {};
  for (const c of categories) {
    const row = await prisma.contentCategory.create({ data: c });
    catIds[c.slug] = row.id;
  }

  type PageDef = {
    slug: string;
    title: string;
    category: keyof typeof catIds;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    phrases: string[];
  };

  const pages: PageDef[] = [
    {
      slug: 'shemen-cannabis',
      title: 'שמן קנאביס',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס — מדריך מלא',
      seoDescription:
        'מהו שמן קנאביס, איך נבדל ממוצרי CBD, ומה חשוב לדעת לפני רכישה.',
      seoKeywords: 'שמן קנאביס, שמן קנאביס רפואי, cbd oil, קנאביס',
      phrases: ['שמן קנאביס', 'שמן קנאביס רפואי', 'cbd oil', 'CBD'],
    },
    {
      slug: 'cbd',
      title: 'CBD',
      category: 'cbd',
      seoTitle: 'CBD — קנבידיול: מדריך בסיסי',
      seoDescription:
        'מה זה CBD, ההבדלים מול רכיבים אחרים בשמן קנאביס, ומונחים כמו cbd oil.',
      seoKeywords: 'cbd, cbd oil, קנבידיול, שמן cbd',
      phrases: ['cbd', 'cbd oil', 'CBD', 'שמן CBD'],
    },
    {
      slug: 'cbd-mah-ze',
      title: 'CBD מה זה',
      category: 'cbd',
      seoTitle: 'CBD מה זה? הסבר בעברית',
      seoDescription:
        'הסבר פשוט: מה זה CBD, איך משתמשים בו ומה הקשר לשמן קנאביס.',
      seoKeywords: 'cbd מה זה, מה זה cbd, קנבידיול',
      phrases: ['cbd מה זה', 'CBD', 'שמן קנאביס', 'cbd oil'],
    },
    {
      slug: 'cbd-oil',
      title: 'CBD Oil',
      category: 'cbd',
      seoTitle: 'CBD Oil — שמן CBD',
      seoDescription:
        'כל על cbd oil: פורמולות, ריכוזים, והבדלים בין מוצרי שמן CBD.',
      seoKeywords: 'cbd oil, שמן cbd, שמן קנאביס',
      phrases: ['cbd oil', 'שמן CBD', 'שמן קנאביס'],
    },
    {
      slug: 'shemen-cannabis-le-kaavim',
      title: 'שמן קנאביס לכאבים',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס לכאבים — מידע כללי',
      seoDescription:
        'מידע כללי ולא רפואי אודות שימושים נפוצים בחיפוש אודות שמן קנאביס לכאבים.',
      seoKeywords: 'שמן קנאביס לכאבים, שמן קנאביס רפואי לכאבים, cbd',
      phrases: ['שמן קנאביס לכאבים', 'שמן קנאביס רפואי לכאבים', 'כאב'],
    },
    {
      slug: 'shemen-cannabis-leidoy',
      title: 'שמן קנאביס לאידוי',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס לאידוי — הבהרות כלליות',
      seoDescription:
        'מונחים וחיפושים נפוצים — איננו מספקים הוראות שימוש; יש להיעזר במקורות מקצועיים.',
      seoKeywords: 'שמן קנאביס לאידוי, אידוי, קנאביס',
      phrases: ['שמן קנאביס לאידוי', 'אידוי', 'שמן קנאביס'],
    },
    {
      slug: 'ma-ze-shemen-cannabis',
      title: 'מה זה שמן קנאביס',
      category: 'shemen-cannabis',
      seoTitle: 'מה זה שמן קנאביס?',
      seoDescription:
        'הגדרות, הבדלים בין סוגי שמנים, וקשר ל־CBD ולשמן זרעי קנאביס.',
      seoKeywords: 'מה זה שמן קנאביס, שמן קנאביס, cbd',
      phrases: ['מה זה שמן קנאביס', 'שמן קנאביס', 'שמן זרעי קנאביס'],
    },
    {
      slug: 'shemen-cannabis-refui',
      title: 'שמן קנאביס רפואי',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס רפואי — מונחים',
      seoDescription:
        'מידע כללי על מונח "שמן קנאביס רפואי" בחיפושי צרכנים בישראל.',
      seoKeywords: 'שמן קנאביס רפואי, רפואי, קנאביס רפואי',
      phrases: ['שמן קנאביס רפואי', 'קנאביס רפואי', 'רפואי'],
    },
    {
      slug: 'shemen-cannabis-yitronot',
      title: 'שמן קנאביס יתרונות',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס יתרונות — פרספקטיבה כללית',
      seoDescription:
        'סקירה כללית של יתרונות המיוחסים לשמן קנאביס בדיון הציבורי — לא ייעוץ רפואי.',
      seoKeywords: 'שמן קנאביס יתרונות, שמן קנאביס',
      phrases: ['שמן קנאביס יתרונות', 'שמן קנאביס', 'CBD'],
    },
    {
      slug: 'shemen-cannabis-tofaot-lavay',
      title: 'שמן קנאביס תופעות לוואי',
      category: 'legal-safety',
      seoTitle: 'שמן קנאביס תופעות לוואי',
      seoDescription:
        'מידע כללי אודות תופעות לוואי אפשריות — יש להתייעץ עם רופא.',
      seoKeywords: 'שמן קנאביס תופעות לוואי, תופעות לוואי, cbd',
      phrases: ['שמן קנאביס תופעות לוואי', 'תופעות לוואי', 'שמן קנאביס'],
    },
    {
      slug: 'shemen-cannabis-atir-cbd',
      title: 'שמן קנאביס עתיר ב־CBD',
      category: 'cbd',
      seoTitle: 'שמן קנאביס עתיר ב־CBD',
      seoDescription:
        'מה משמעות "עתיר CBD" בתווית, ואיך זה קשור לריכוז ולשמן CBD.',
      seoKeywords: 'שמן קנאביס עתיר ב CBD, CBD, שמן cbd',
      phrases: ['שמן קנאביס עתיר ב CBD', 'CBD', 'שמן CBD'],
    },
    {
      slug: 'shemen-cannabis-huki',
      title: 'שמן קנאביס חוקי',
      category: 'legal-safety',
      seoTitle: 'שמן קנאביס חוקי — מידע כללי',
      seoDescription:
        'מבט כללי על חיפושי "שמן קנאביס חוקי" — הרגולציה משתנה, יש לבדוק מקורות עדכניים.',
      seoKeywords: 'שמן קנאביס חוקי, חוקי, קנאביס',
      phrases: ['שמן קנאביס חוקי', 'חוקי', 'קנאביס'],
    },
    {
      slug: 'ha-im-shemen-cannabis-mamkir',
      title: 'האם שמן קנאביס ממכר',
      category: 'legal-safety',
      seoTitle: 'האם שמן קנאביס ממכר?',
      seoDescription:
        'הסבר כללי על תלות אפשרית, THC מול CBD — אינו מחליף ייעוץ מקצועי.',
      seoKeywords: 'האם שמן קנאביס ממכר, ממכר, cbd',
      phrases: ['האם שמן קנאביס ממכר', 'ממכר', 'שמן קנאביס'],
    },
    {
      slug: 'ha-im-shemen-cannabis-meridim',
      title: 'האם שמן קנאביס מרדים',
      category: 'legal-safety',
      seoTitle: 'האם שמן קנאביס מרדים?',
      seoDescription:
        'תשובה כללית לחיפוש "האם שמן קנאביס מרדים" — תלוי בהרכב המוצר.',
      seoKeywords: 'האם שמן קנאביס מרדים, מרדים, cbd',
      phrases: ['האם שמן קנאביס מרדים', 'מרדים', 'שמן קנאביס'],
    },
    {
      slug: 'eich-mishtamshim-shemen-cbd',
      title: 'איך משתמשים בשמן CBD',
      category: 'cbd',
      seoTitle: 'איך משתמשים בשמן CBD',
      seoDescription:
        'עקרונות כלליים לשימוש בשמן CBD — תמיד לפי הוראות היצרן והמלצת רופא.',
      seoKeywords: 'איך משתמשים בשמן CBD, שמן cbd, cbd oil',
      phrases: ['איך משתמשים בשמן CBD', 'שמן CBD', 'cbd oil'],
    },
    {
      slug: 'lama-shemen-cbd-ozer',
      title: 'למה שמן CBD עוזר',
      category: 'cbd',
      seoTitle: 'למה שמן CBD עוזר — מידע כללי',
      seoDescription:
        'מדוע צרכנים מחפשים מידע על שמן CBD — מסגרת כללית בלי קביעות רפואיות.',
      seoKeywords: 'למה שמן CBD עוזר, שמן cbd, cbd',
      phrases: ['למה שמן CBD עוזר', 'שמן CBD', 'CBD'],
    },
    {
      slug: 'shemen-cannabis-le-isuy',
      title: 'שמן קנאביס לעיסוי',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס לעיסוי',
      seoDescription:
        'מידע כללי על מוצרי עיסוי עם תמצית קנאביס או CBD — לא למאכל ללא אישור.',
      seoKeywords: 'שמן קנאביס לעיסוי, עיסוי, cbd',
      phrases: ['שמן קנאביס לעיסוי', 'עיסוי', 'שמן קנאביס'],
    },
    {
      slug: 'shemen-cannabis-refui-mumlats',
      title: 'שמן קנאביס רפואי מומלץ',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס רפואי מומלץ — איך בוחרים',
      seoDescription:
        'קריטריונים כלליים לבחירת מוצר — שקיפות, מעבדה, ריכוז — לא המלצה למוצר ספציפי.',
      seoKeywords: 'שמן קנאביס רפואי מומלץ, שמן קנאביס רפואי, cbd',
      phrases: ['שמן קנאביס רפואי מומלץ', 'שמן קנאביס רפואי', 'CBD'],
    },
    {
      slug: 'shemen-cannabis-indica',
      title: 'שמן קנאביס אינדיקה',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס אינדיקה — מונחים',
      seoDescription:
        'מה משמעות מונח האינדיקה בהקשר של זני קנאביס ושמנים.',
      seoKeywords: 'שמן קנאביס אינדיקה, אינדיקה, קנאביס',
      phrases: ['שמן קנאביס אינדיקה', 'אינדיקה', 'שמן קנאביס'],
    },
    {
      slug: 'shemen-cannabis-sugim',
      title: 'שמן קנאביס סוגים',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס סוגים',
      seoDescription:
        'חלוקה כללית לסוגי שמנים ותמציות — מלא ספקטרום, מבודד, וכו׳.',
      seoKeywords: 'שמן קנאביס סוגים, שמן קנאביס, cbd oil',
      phrases: ['שמן קנאביס סוגים', 'שמן קנאביס', 'cbd oil'],
    },
    {
      slug: 'shemen-cannabis-refui-mekhir',
      title: 'שמן קנאביס רפואי מחיר',
      category: 'shemen-cannabis',
      seoTitle: 'שמן קנאביס רפואי מחיר — מה משפיע',
      seoDescription:
        'גורמים למחיר שמן קנאביס רפואי ומוצרי CBD — ריכוז, נפח, איכות.',
      seoKeywords: 'שמן קנאביס רפואי מחיר, מחיר, שמן קנאביס רפואי',
      phrases: ['שמן קנאביס רפואי מחיר', 'שמן קנאביס רפואי', 'מחיר'],
    },
    {
      slug: 'cbd-gummies',
      title: 'CBD Gummies',
      category: 'cbd',
      seoTitle: 'CBD Gummies — מדריך קצר',
      seoDescription:
        'מה זה cbd gummies, פורמט נוח לנייד, והבדלים מול שמן CBD.',
      seoKeywords: 'cbd gummies, cbd, שמן cbd',
      phrases: ['cbd gummies', 'CBD', 'שמן CBD'],
    },
    {
      slug: 'shemen-zarai-cannabis',
      title: 'שמן זרעי קנאביס',
      category: 'shemen-cannabis',
      seoTitle: 'שמן זרעי קנאביס מול שמן CBD',
      seoDescription:
        'הבדל בין שמן זרעי קנאביס לשמנים עשירים ב־CBD — חשוב לצרכן.',
      seoKeywords: 'שמן זרעי קנאביס, שמן קנאביס, cbd',
      phrases: ['שמן זרעי קנאביס', 'שמן קנאביס', 'CBD'],
    },
    {
      slug: 'cbd-le-klavim',
      title: 'CBD לכלבים',
      category: 'pets-products',
      seoTitle: 'CBD לכלבים — מידע כללי',
      seoDescription:
        'מונחים נפוצים: cbd לכלבים, שמן cbd לכלבים — יש להתייעץ וטרינר.',
      seoKeywords: 'cbd לכלבים, שמן cbd לכלבים, קנאביס לכלבים',
      phrases: ['cbd לכלבים', 'שמן cbd לכלבים', 'כלבים'],
    },
    {
      slug: 'shemen-cbd-le-klavim',
      title: 'שמן CBD לכלבים',
      category: 'pets-products',
      seoTitle: 'שמן CBD לכלבים',
      seoDescription:
        'מידע כללי על שמן CBD לכלבים — מינון ובטיחות רק עם אישור וטרינר.',
      seoKeywords: 'שמן cbd לכלבים, cbd לכלבים, שמן cbd',
      phrases: ['שמן cbd לכלבים', 'cbd לכלבים', 'שמן CBD'],
    },
    {
      slug: 'cbd-vape-pen',
      title: 'CBD Vape Pen',
      category: 'cbd',
      seoTitle: 'CBD Vape Pen — מידע כללי',
      seoDescription:
        'מונח חיפוש cbd vape pen — פורמטים, רגולציה, והבדלים מול שמן.',
      seoKeywords: 'cbd vape pen, cbd, vape',
      phrases: ['cbd vape pen', 'CBD', 'vape'],
    },
    {
      slug: 'shemen-cbd-super-pharm',
      title: 'שמן CBD סופר פארם',
      category: 'retail-brands',
      seoTitle: 'שמן CBD סופר פארם — הקשר צרכני',
      seoDescription:
        'מידע כללי על חיפושי צרכנים אחר שמן CBD ברשתות — השוואה בין ערוצים.',
      seoKeywords: 'שמן cbd סופר פארם, סופר פארם, שמן cbd',
      phrases: ['שמן cbd סופר פארם', 'סופר פארם', 'שמן CBD'],
    },
    {
      slug: 'cannabis-super-pharm',
      title: 'קנאביס סופר פארם',
      category: 'retail-brands',
      seoTitle: 'קנאביס סופר פארם',
      seoDescription:
        'מונחי חיפוש: קנאביס סופר פארם — מידע כללי בלבד, ללא קידום רשת ספציפית.',
      seoKeywords: 'קנאביס סופר פארם, סופר פארם, קנאביס',
      phrases: ['קנאביס סופר פארם', 'סופר פארם', 'קנאביס'],
    },
    {
      slug: 'happy-garden-cbd',
      title: 'Happy Garden CBD',
      category: 'retail-brands',
      seoTitle: 'Happy Garden — מידע כללי',
      seoDescription:
        'מונח חיפוש Happy Garden בהקשר CBD — טקסט כללי ללא אישור מותג.',
      seoKeywords: 'happy garden, cbd, שמן cbd',
      phrases: ['Happy Garden', 'CBD', 'שמן CBD'],
    },
    {
      slug: 'privacy-policy',
      title: 'מדיניות פרטיות',
      category: 'legal-safety',
      seoTitle: 'מדיניות פרטיות | OilCbd',
      seoDescription:
        'מדיניות הפרטיות של אתר OilCbd — סוגי מידע שנאסף, שימוש, עוגיות ויצירת קשר.',
      seoKeywords: 'מדיניות פרטיות, הגנת מידע, OilCbd',
      phrases: [],
    },
  ];

  for (const p of pages) {
    await prisma.contentPage.create({
      data: {
        slug: p.slug,
        categoryId: catIds[p.category],
        title: p.title,
        excerpt: p.seoDescription.slice(0, 200),
        bodyMarkdown: learnPageBody(p.slug, p.title, p.phrases),
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        seoKeywords: p.seoKeywords,
        canonicalPath: `/learn/${p.slug}`,
        ogImage: null,
        breadcrumbJson: learnBreadcrumb(p.slug, p.title),
        targetPhrasesJson: p.phrases,
        isPublished: true,
      },
    });
  }

  const posts = [
    {
      slug: 'cbd-oil-vs-capsules',
      title: 'שמן CBD מול קפסולות: מה נוח לך?',
      category: 'cbd',
      seoTitle: 'שמן CBD מול קפסולות — השוואה',
      seoDescription:
        'מאמר בלוג השוואתי בין טיפות שמן CBD לקפסולות — נוחות, ספיגה ודיוק מינון.',
      seoKeywords: 'שמן cbd, קפסולות cbd, cbd oil',
      excerpt: 'השוואה קצרה בין פורמטים פופולריים של CBD.',
      phrases: ['שמן CBD', 'קפסולות', 'cbd oil', 'שמן קנאביס'],
    },
    {
      slug: 'how-to-read-cbd-label',
      title: 'איך קוראים תווית של שמן קנאביס או CBD',
      category: 'cbd',
      seoTitle: 'איך קוראים תווית CBD',
      seoDescription:
        'מדריך בלוג: מה לחפש בתווית — ריכוז CBD, מלא ספקטרום, ומקור.',
      seoKeywords: 'שמן קנאביס, תווית, cbd',
      excerpt: 'טיפים לקריאת תווית מוצר אחראית.',
      phrases: ['תווית', 'שמן קנאביס', 'CBD', 'מלא ספקטרום', 'cbd oil'],
    },
    {
      slug: 'cbd-and-sleep-myths',
      title: 'CBD ושינה: מה אמיתי ומה מיתוס',
      category: 'cbd',
      seoTitle: 'CBD ושינה — מיתוסים',
      seoDescription:
        'מאמר בלוג על חיפושים הקושרים CBD לשינה — גישה זהירה ומבוססת שקיפות.',
      seoKeywords: 'cbd, שינה, שמן cbd',
      excerpt: 'פרקים קצרים על מיתוסים נפוצים.',
      phrases: ['CBD', 'שינה', 'שמן CBD', 'טיפות CBD לשינה'],
    },
  ];

  const now = new Date();
  for (const post of posts) {
    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        categoryId: catIds[post.category],
        title: post.title,
        excerpt: post.excerpt,
        bodyMarkdown: blogPostBody(post.slug, post.title, post.phrases),
        coverImage: null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        canonicalPath: `/blog/${post.slug}`,
        ogImage: null,
        breadcrumbJson: blogBreadcrumb(post.slug, post.title),
        isPublished: true,
        publishedAt: now,
      },
    });
  }

  const nav: { label: string; href: string; section: string; sortOrder: number }[] = [
    { label: 'מוצרים', href: '/', section: 'header', sortOrder: 0 },
    { label: 'מדריכים', href: '/learn', section: 'header', sortOrder: 1 },
    { label: 'בלוג', href: '/blog', section: 'header', sortOrder: 2 },
    { label: 'מדריכים', href: '/learn', section: 'footer', sortOrder: 0 },
    { label: 'בלוג', href: '/blog', section: 'footer', sortOrder: 1 },
    { label: 'תשלום', href: '/checkout', section: 'footer', sortOrder: 2 },
    { label: 'מדיניות פרטיות', href: '/learn/privacy-policy', section: 'footer', sortOrder: 3 },
  ];

  for (const n of nav) {
    await prisma.siteNavLink.create({ data: n });
  }

  await seedSiteSettings(prisma);

  console.log(
    `CMS: ${pages.length} עמודי תוכן, ${posts.length} פוסטים, קטגוריות, ניווט, וטקסטי SiteSetting (דף הבית / הדר / פוטר).`
  );
}
