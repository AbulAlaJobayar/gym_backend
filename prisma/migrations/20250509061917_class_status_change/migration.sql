/*
  Warnings:

  - The values [COMPLETED] on the enum `ClassStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassStatus_new" AS ENUM ('ACTIVE', 'FULL', 'CANCELLED');
ALTER TABLE "classes" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "classes" ALTER COLUMN "status" TYPE "ClassStatus_new" USING ("status"::text::"ClassStatus_new");
ALTER TYPE "ClassStatus" RENAME TO "ClassStatus_old";
ALTER TYPE "ClassStatus_new" RENAME TO "ClassStatus";
DROP TYPE "ClassStatus_old";
ALTER TABLE "classes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- CreateIndex
CREATE INDEX "bookings_classId_idx" ON "bookings"("classId");

-- CreateIndex
CREATE INDEX "bookings_traineeId_idx" ON "bookings"("traineeId");

-- CreateIndex
CREATE INDEX "classes_trainerId_idx" ON "classes"("trainerId");

-- CreateIndex
CREATE INDEX "classes_date_idx" ON "classes"("date");
