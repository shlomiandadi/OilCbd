-- SEO fields for Product
ALTER TABLE "Product" ADD COLUMN "slug" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoDescription" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoKeywords" TEXT;
ALTER TABLE "Product" ADD COLUMN "canonicalPath" TEXT;
ALTER TABLE "Product" ADD COLUMN "ogImage" TEXT;
ALTER TABLE "Product" ADD COLUMN "breadcrumbJson" JSONB;

UPDATE "Product" SET
  "slug" = 'legacy-' || "id",
  "seoTitle" = "name",
  "seoDescription" = LEFT("description", 500),
  "canonicalPath" = '/products/legacy-' || "id",
  "breadcrumbJson" = '[]'::jsonb;

ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "seoTitle" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "seoDescription" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "canonicalPath" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "breadcrumbJson" SET NOT NULL;

CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE INDEX "Product_slug_idx" ON "Product"("slug");
