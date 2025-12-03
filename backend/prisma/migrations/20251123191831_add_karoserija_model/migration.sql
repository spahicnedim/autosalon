/*
  Warnings:

  - You are about to drop the column `oblikKaroserije` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "oblikKaroserije",
ADD COLUMN     "karoserijaId" INTEGER;

-- CreateTable
CREATE TABLE "Karoserija" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "Karoserija_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Karoserija_naziv_key" ON "Karoserija"("naziv");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_karoserijaId_fkey" FOREIGN KEY ("karoserijaId") REFERENCES "Karoserija"("id") ON DELETE SET NULL ON UPDATE CASCADE;
