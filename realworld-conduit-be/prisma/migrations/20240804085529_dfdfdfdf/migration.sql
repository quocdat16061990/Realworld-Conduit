/*
  Warnings:

  - You are about to drop the column `contnet` on the `Article` table. All the data in the column will be lost.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "contnet",
ADD COLUMN     "content" TEXT NOT NULL;
