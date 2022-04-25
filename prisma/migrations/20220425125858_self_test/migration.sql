-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_selfTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_typologyId_fkey";

-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "typologyId" DROP NOT NULL,
ALTER COLUMN "selfTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_typologyId_fkey" FOREIGN KEY ("typologyId") REFERENCES "Typology"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_selfTypeId_fkey" FOREIGN KEY ("selfTypeId") REFERENCES "SelfType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
