/*
  Warnings:

  - You are about to drop the column `tagId` on the `Article` table. All the data in the column will be lost.
  - Added the required column `articleId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_tagId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "articleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
