/*
  Warnings:

  - Added the required column `mediumUrl` to the `CarImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbUrl` to the `CarImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarImage" ADD COLUMN     "mediumUrl" TEXT NOT NULL,
ADD COLUMN     "thumbUrl" TEXT NOT NULL;
