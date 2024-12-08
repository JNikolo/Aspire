/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `HabitProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[habitName,userId]` on the table `Habit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HabitProgress" DROP COLUMN "isCompleted";

-- CreateIndex
CREATE UNIQUE INDEX "Habit_habitName_userId_key" ON "Habit"("habitName", "userId");
