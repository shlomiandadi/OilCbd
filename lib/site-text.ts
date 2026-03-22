import type { PrismaClient } from '@prisma/client';
import { HOME_SEO_MARKDOWN } from '@/lib/home-seo-markdown';

/** מפתחות טקסט גלובלי ב־SiteSetting */
export const SITE_TEXT_DEFAULTS: Record<string, string> = {
  'site.brand.initials': 'OC',
  'site.brand.name': 'OilCbd',
  'header.cta.catalog': 'לקטלוג',
  'header.cta.catalogHref': '/#catalog',
  'header.cta.checkout': 'סיום הזמנה',
  'header.cta.checkoutHref': '/checkout',
  'header.mobile.menuTitle': 'תפריט',
  'header.mobile.catalogCta': 'לקטלוג המוצרים',
  'footer.column.links': 'קישורים',
  'footer.column.statement': 'הצהרה',
  'footer.copyright':
    '© __YEAR__ __BRAND__ — שמני CBD וקנאביס איכותיים',
  'footer.disclaimer':
    'המידע באתר מיועד לידע כללי ולקידום אתר בלבד. אינו מהווה ייעוץ רפואי, משפטי או וטרינרי. יש להתייעץ עם איש מקצוע לפני שימוש במוצרי CBD או קנאביס, במיוחד אם אתם בהריון, מניקים, נוטלים תרופות או סובלים ממחלה כרונית.',
  'home.hero.kicker': 'שמן קנאביס · CBD · cbd oil — משלוח בישראל',
  'home.hero.title1': 'שמן CBD ושמן קנאביס',
  'home.hero.title2': 'איכות פרימיום לבחירה נוחה',
  'home.hero.leadMarkdown':
    'טיפות, ריכוזים שונים ומידע מקצועי על **CBD**, **שמן קנאביס רפואי** ומוצרים נלווים — הזמנה מהירה, אריזה דיסקרטית ומדריכים לשקיפות.',
  'home.hero.ctaPrimary': 'לצפייה במוצרים',
  'home.hero.ctaPrimaryHref': '/#catalog',
  'home.hero.ctaSecondary': 'מדריכי CBD ושמן קנאביס',
  'home.hero.ctaSecondaryHref': '/learn',
  'home.hero.ctaBlog': 'בלוג',
  'home.hero.ctaBlogHref': '/blog',
  'home.trust.cardsJson': JSON.stringify([
    {
      title: 'משלוח דיסקרטי',
      body:
        'אריזות ניטרליות — שירות לכל הארץ עם דגש על פרטיות (מתאים לחיפושי GEO בישראל).',
    },
    {
      title: 'מגוון ריכוזים',
      body:
        'שמן CBD, וריאציות שונות, מידע על cbd oil, gummies ופורמטים — בחירה לפי צורך.',
    },
    {
      title: 'מדריכים ומאמרים',
      body:
        'עמודי תוכן עם מילות מפתח וזנב ארוך — נכתבו לצורך SEO ולידע צרכני.',
    },
  ]),
  'home.carousel.title': 'מבצעים והמלצות מהקטלוג',
  'home.carousel.subtitle':
    'מחירים אטרקטיביים — הזדמנות לנסות שמן CBD או וריאציה חדשה. הזמינות לפי המלאי במערכת.',
  'home.carousel.hint': 'גלילה אופקית — גררו עם האצבע או עם העכבר',
  'home.catalog.title': 'כל המוצרים בקטלוג',
  'home.catalog.subtitle': 'בחרו וריאציה — כל מוצר מקושר לדף SEO ייעודי',
  'home.delivery.title': 'משלוחים מהירים ודיסקרטיות',
  'home.delivery.bodyMarkdown':
    'מערך חלוקה לכל הארץ — אריזות אטומות ללא לוגו בולט. מתאים ללקוחות שמחפשים **שמן CBD**, **שמן קנאביס** או מוצרי *cbd oil* עם שקט נפשי בקבלת המשלוח.',
  'home.seo.markdown': HOME_SEO_MARKDOWN,
};

export async function loadSiteText(
  prisma: PrismaClient,
  keys: string[]
): Promise<Record<string, string>> {
  const base = { ...SITE_TEXT_DEFAULTS };
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: keys } },
    });
    for (const r of rows) {
      base[r.key] = r.value;
    }
  } catch {
    /* נשארים בברירות מחדל */
  }
  return base;
}

export function parseTrustCards(
  json: string | undefined
): { title: string; body: string }[] {
  if (!json) return [];
  try {
    const a = JSON.parse(json) as unknown;
    if (!Array.isArray(a)) return [];
    return a
      .map((x) => {
        if (x && typeof x === 'object' && 'title' in x && 'body' in x) {
          const o = x as { title: unknown; body: unknown };
          if (typeof o.title === 'string' && typeof o.body === 'string') {
            return { title: o.title, body: o.body };
          }
        }
        return null;
      })
      .filter((x): x is { title: string; body: string } => x !== null);
  } catch {
    return [];
  }
}
