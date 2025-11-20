/*
  Warnings:

  - Added the required column `boja` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gorivo` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mjenjac` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oblikKaroserije` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snaga` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapremina` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "boja" TEXT NOT NULL,
ADD COLUMN     "gorivo" TEXT NOT NULL,
ADD COLUMN     "mjenjac" TEXT NOT NULL,
ADD COLUMN     "oblikKaroserije" TEXT NOT NULL,
ADD COLUMN     "snaga" INTEGER NOT NULL,
ADD COLUMN     "zapremina" INTEGER NOT NULL;
