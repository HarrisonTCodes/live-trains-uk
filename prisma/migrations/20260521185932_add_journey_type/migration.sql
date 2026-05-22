-- CreateEnum
CREATE TYPE "JourneyType" AS ENUM ('DEPARTURES', 'PLANS');

-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "type" "JourneyType" NOT NULL DEFAULT 'DEPARTURES';
