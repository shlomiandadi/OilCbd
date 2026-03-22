-- דשבורד ניהול: משתמשים, היררכיית קטגוריות, גלריית מוצר
CREATE TABLE "admin_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "admin_user_email_key" ON "admin_user"("email");

ALTER TABLE "content_category" ADD COLUMN IF NOT EXISTS "parentId" TEXT;

CREATE INDEX IF NOT EXISTS "content_category_parentId_idx" ON "content_category"("parentId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'content_category_parentId_fkey'
  ) THEN
    ALTER TABLE "content_category"
      ADD CONSTRAINT "content_category_parentId_fkey"
      FOREIGN KEY ("parentId") REFERENCES "content_category"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "galleryJson" JSONB;
