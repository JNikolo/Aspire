/*
  Warnings:

  - Added the required column `isPublic` to the `HabitLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HabitLog" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;
