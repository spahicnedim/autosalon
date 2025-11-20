-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brend" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "godina" INTEGER NOT NULL,
    "kilometraza" INTEGER NOT NULL,
    "cijena" DOUBLE PRECISION NOT NULL,
    "opis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Car_brend_model_idx" ON "Car"("brend", "model");

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
