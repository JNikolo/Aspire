/*
  Warnings:

  - Changed the type of `dayOfWeek` on the `HabitFrequency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dayOfWeek` on the `HabitSelectedDay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HabitFrequency" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HabitSelectedDay" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DayOfWeek";
