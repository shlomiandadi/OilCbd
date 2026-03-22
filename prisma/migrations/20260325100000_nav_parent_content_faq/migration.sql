-- היררכיית תפריט + FAQ וסינון רשימת /learn
ALTER TABLE "site_nav_link" ADD COLUMN IF NOT EXISTS "parentId" TEXT;

CREATE INDEX IF NOT EXISTS "site_nav_link_parentId_idx" ON "site_nav_link"("parentId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'site_nav_link_parentId_fkey'
  ) THEN
    ALTER TABLE "site_nav_link"
      ADD CONSTRAINT "site_nav_link_parentId_fkey"
      FOREIGN KEY ("parentId") REFERENCES "site_nav_link"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

ALTER TABLE "content_page" ADD COLUMN IF NOT EXISTS "faqJson" JSONB;
ALTER TABLE "content_page" ADD COLUMN IF NOT EXISTS "showInLearnIndex" BOOLEAN NOT NULL DEFAULT true;
