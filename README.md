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

## פרודקשן (Vercel + GitHub)

1. דחפו את הריפו לגיטהאב (ראו למטה).
2. ב־Vercel: **Import Project** מהריפו.
3. ב־**Environment Variables** הוסיפו:
   - `DATABASE_URL` — מחרוזת החיבור ל־Postgres (מומלץ pooler, `sslmode=require`, ללא `channel_binding`).
   - `NEXT_PUBLIC_SITE_URL` — כתובת האתר הסופית, למשל `https://your-app.vercel.app`.
4. **Build Command:** `npm run build` (ברירת מחדל). **Install** מריץ `postinstall` → `prisma generate`.
5. אחרי הדיפלוי הראשון, הריצו מול אותו DB (מהמחשב שלכם עם אותו `DATABASE_URL`):

   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

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
