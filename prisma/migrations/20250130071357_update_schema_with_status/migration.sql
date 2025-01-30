/*
  Warnings:

  - The `status` column on the `Menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_role_id_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "status",
ADD COLUMN "status" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN "role" "RoleName" NOT NULL DEFAULT 'user',
ADD COLUMN "status" "Status" NOT NULL DEFAULT 'active';

-- DropTable
DROP TABLE "Role";

