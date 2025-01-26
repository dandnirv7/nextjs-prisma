-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "role_id" SET DEFAULT 2;

-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "image_url" DROP NOT NULL;
