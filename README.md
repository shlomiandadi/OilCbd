# OilCbd

חנות Next.js (App Router) + Prisma + PostgreSQL + Tailwind.

## דרישות

- Node.js 18.17+ (לפרודקשן מומלץ 20.19+ או 22.12+ אם תרצו Prisma 7 בעתיד)
- חשבון PostgreSQL (למשל [Neon](https://neon.tech))

## התקנה מקומית

```bash
cp .env.example .env
# ערכו את DATABASE_URL ו-NEXT_PUBLIC_SITE_URL בקובץ .env

npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

פתחו [http://localhost:3000](http://localhost:3000).

## פרודקשן (Netlify + GitHub)

1. דחפו את הריפו לגיטהאב (ראו למטה).
2. ב־[Netlify](https://www.netlify.com/): **Add new site** → **Import an existing project** ובחרו את הריפו.
3. Netlify יזהה את `netlify.toml` (פקודת בנייה `npm run build`, פלאגין Next.js).
4. תחת **Site configuration → Environment variables** הוסיפו:
   - `DATABASE_URL` — מחרוזת החיבור ל־Postgres (מומלץ pooler, `sslmode=require`, ללא `channel_binding`).
   - `NEXT_PUBLIC_SITE_URL` — כתובת האתר הסופית, למשל `https://your-site.netlify.app` (או הדומיין המותאם).
5. `npm install` בבנייה מריץ `postinstall` → `prisma generate` (כולל מנוע Linux לסביבת Netlify — ראו `binaryTargets` ב־`schema.prisma`).
6. אחרי הדיפלוי הראשון, הריצו **פעם אחת** מול אותו DB (מהמחשב שלכם עם אותו `DATABASE_URL`):

   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

תיעוד Netlify ל־Next.js: [Frameworks — Next.js](https://docs.netlify.com/frameworks/next-js/overview/).

## חיבור לגיטהאב

מתוך תיקיית הפרויקט:

```bash
git init
git add .
git commit -m "Initial commit: OilCbd shop"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

החליפו `YOUR_USER/YOUR_REPO` בשם הריפו שיצרתם בגיטהאב (ריק, בלי README אם תרצו למנוע merge conflict).

## סקריפטים

| פקודה | תיאור |
|--------|--------|
| `npm run dev` | פיתוח |
| `npm run build` | בנייה לפרודקשן |
| `npm run start` | הרצה אחרי build |
| `npm run db:migrate` | `prisma migrate deploy` |
| `npm run db:seed` | מילוי דוגמה |

## רישיון

ISC
