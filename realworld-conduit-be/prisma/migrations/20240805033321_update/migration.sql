/*
  Warnings:

  - You are about to drop the column `articleId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_articleId_fkey";

-- DropIndex
DROP INDEX "Article_slug_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "tagId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "articleId";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
