/*
  Warnings:

  - You are about to drop the column `role_id` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_role_id_idx";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "role_id",
ALTER COLUMN "role" DROP DEFAULT;
