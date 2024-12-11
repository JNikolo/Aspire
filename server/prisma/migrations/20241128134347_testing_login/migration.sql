-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "habitName" TEXT NOT NULL,
    "notifications" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitSelectedDay" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "habitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HabitSelectedDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitFrequency" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "habitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HabitFrequency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitSelectedDay" ADD CONSTRAINT "HabitSelectedDay_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitFrequency" ADD CONSTRAINT "HabitFrequency_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
