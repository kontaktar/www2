/*
  Warnings:

  - You are about to drop the column `email` on the `UserDetail` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserDetail_email_key";

-- AlterTable
ALTER TABLE "UserDetail" DROP COLUMN "email";
