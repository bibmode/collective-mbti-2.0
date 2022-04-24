/*
  Warnings:

  - A unique constraint covering the columns `[selfTypeId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_selfTypeId_key" ON "Result"("selfTypeId");
