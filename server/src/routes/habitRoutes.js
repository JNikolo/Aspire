import e, { Router } from "express";
import { clerkMiddleware } from "@clerk/express";
import { prisma } from "../middlewares/prisma.js";

const habitRouter = Router();

habitRouter.use(clerkMiddleware());

habitRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await prisma.user.findUnique({
      where: { authId: userId },
    });

    const habits = await prisma.habit.findMany({
      where: { userId: user.id },
    });

    res.json(habits);
  } catch (err) {
    console.error("Error during habits fetch:", err);
    res.status(500).json({ error: "An error occurred during habits fetch" });
  }
});

habitRouter.post("/", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitName, frequency, notifications, selectedDays } = req.body;

    const user = await prisma.user.findUnique({
      where: { authId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const habit = await prisma.habit.create({
      data: {
        habitName: habitName,
        notifications: notifications,
        user: {
          connect: { authId: user.id }, // Assuming user with id 1 exists
        },
        frequency: {
          create: frequency.map((day) => ({ dayOfWeek: day })), // Frequency of the habit
        },
        selectedDays: {
          create: selectedDays.map((day) => ({ dayOfWeek: day })), // Selected days for the habit
        },
      },
    });

    res.json(habit);
  } catch (err) {
    console.error("Error during habit creation:", err);
    res.status(500).json({ error: "An error occurred during habit creation" });
  }
});

export default habitRouter;
