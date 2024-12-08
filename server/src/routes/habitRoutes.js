import { Router } from "express";
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

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

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
          connect: { id: user.id }, // Connect habit to user
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

habitRouter.get("/:habitId/survey", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId } = req.params;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: parseInt(habitId) },
      include: {
        frequency: true,
        selectedDays: true,
      },
    });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.json(habit);
  } catch (err) {
    console.error("Error during habit fetch:", err);
    res.status(500).json({ error: "An error occurred during habit fetch" });
  }
});

habitRouter.put("/:habitId/survey", async (req, res) => {
  try {
    const { habitId } = req.params;
    const { habitName, frequency, notifications, selectedDays } = req.body;

    const habit = await prisma.habit.update({
      where: { id: parseInt(habitId) },
      data: {
        habitName: habitName,
        notifications: notifications,
        frequency: {
          deleteMany: {},
          create: frequency.map((day) => ({ dayOfWeek: day })),
        },
        selectedDays: {
          deleteMany: {},
          create: selectedDays.map((day) => ({ dayOfWeek: day })),
        },
      },
    });

    res.json(habit);
  } catch (err) {
    console.error("Error during habit update:", err);
    res.status(500).json({ error: "An error occurred during habit update" });
  }
});

habitRouter.delete("/:habitId", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId } = req.params;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.habit.delete({
      where: { id: parseInt(habitId) },
    });

    res.json({ message: "Habit deleted successfully" });
  } catch (err) {
    console.error("Error during habit deletion:", err);
    res.status(500).json({ error: "An error occurred during habit deletion" });
  }
});

export default habitRouter;
