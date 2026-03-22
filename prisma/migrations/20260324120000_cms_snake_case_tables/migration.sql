-- שמות טבלאות ב-snake_case (נוח ל-Neon / Prisma Studio)
-- רץ רק אם המיגרציה הקודמת יצרה את הטבלאות ב-PascalCase

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname = 'ContentCategory'
  ) THEN
    ALTER TABLE "ContentCategory" RENAME TO content_category;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname = 'ContentPage'
  ) THEN
    ALTER TABLE "ContentPage" RENAME TO content_page;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname = 'BlogPost'
  ) THEN
    ALTER TABLE "BlogPost" RENAME TO blog_post;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname = 'SiteNavLink'
  ) THEN
    ALTER TABLE "SiteNavLink" RENAME TO site_nav_link;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname = 'SiteSetting'
  ) THEN
    ALTER TABLE "SiteSetting" RENAME TO site_setting;
  END IF;
END $$;
