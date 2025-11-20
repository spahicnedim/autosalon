/*
  Warnings:

  - You are about to drop the column `brend` on the `Car` table. All the data in the column will be lost.
  - Added the required column `brendId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Car_brend_model_idx";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brend",
ADD COLUMN     "brendId" INTEGER NOT NULL,
ADD COLUMN     "izdvojeno" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Oprema" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "Oprema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoOprema" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "opremaId" INTEGER NOT NULL,

    CONSTRAINT "AutoOprema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brend" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Brend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Oprema_naziv_key" ON "Oprema"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "AutoOprema_carId_opremaId_key" ON "AutoOprema"("carId", "opremaId");

-- CreateIndex
CREATE UNIQUE INDEX "Brend_naziv_key" ON "Brend"("naziv");

-- CreateIndex
CREATE INDEX "Car_model_idx" ON "Car"("model");

-- CreateIndex
CREATE INDEX "Car_izdvojeno_idx" ON "Car"("izdvojeno");

-- CreateIndex
CREATE INDEX "Car_brendId_idx" ON "Car"("brendId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brendId_fkey" FOREIGN KEY ("brendId") REFERENCES "Brend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoOprema" ADD CONSTRAINT "AutoOprema_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoOprema" ADD CONSTRAINT "AutoOprema_opremaId_fkey" FOREIGN KEY ("opremaId") REFERENCES "Oprema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
