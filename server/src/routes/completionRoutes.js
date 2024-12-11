import express, { Router } from "express";
import { clerkMiddleware } from "@clerk/express";
import { prisma } from "../middlewares/prisma.js";

const completionRouter = Router();

completionRouter.use(clerkMiddleware());

// Get all completions for a user
completionRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await prisma.user.findUnique({
      where: { authId: userId },
    });

    const completions = await prisma.completion.findMany({
      where: { habit: { userId: user.id } },
      include: {
        habit: true, // Include habit details
      },
    });

    res.json(completions);
  } catch (err) {
    console.error("Error during completions fetch:", err);
    res
      .status(500)
      .json({ error: "An error occurred during completions fetch" });
  }
});

// Create a new completion
completionRouter.post("/", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId, completedAt, notes } = req.body;

    const user = await prisma.user.findUnique({
      where: { authId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the habit belongs to the user
    const habit = await prisma.habit.findUnique({
      where: {
        id: parseInt(habitId),
        userId: user.id,
      },
    });

    if (!habit) {
      return res
        .status(404)
        .json({ error: "Habit not found or does not belong to user" });
    }

    const completion = await prisma.completion.create({
      data: {
        habit: {
          connect: { id: parseInt(habitId) },
        },
        completedAt: completedAt || new Date(),
        notes: notes || null,
      },
    });

    res.json(completion);
  } catch (err) {
    console.error("Error during completion creation:", err);
    res
      .status(500)
      .json({ error: "An error occurred during completion creation" });
  }
});

// Get completion details for a specific habit
completionRouter.get("/:habitId", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId } = req.params;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const completions = await prisma.completion.findMany({
      where: {
        habitId: parseInt(habitId),
        habit: { userId: user.id },
      },
    });

    if (!completions || completions.length === 0) {
      return res
        .status(404)
        .json({ error: "No completions found for this habit" });
    }

    res.json(completions);
  } catch (err) {
    console.error("Error during completions fetch:", err);
    res
      .status(500)
      .json({ error: "An error occurred during completions fetch" });
  }
});

// Update a completion (optional, depending on requirements)
completionRouter.put("/:completionId", async (req, res) => {
  try {
    const { completionId } = req.params;
    const { notes, completedAt } = req.body;

    const completion = await prisma.completion.update({
      where: { id: parseInt(completionId) },
      data: {
        notes: notes || undefined,
        completedAt: completedAt || undefined,
      },
    });

    res.json(completion);
  } catch (err) {
    console.error("Error during completion update:", err);
    res
      .status(500)
      .json({ error: "An error occurred during completion update" });
  }
});

// Delete a completion
completionRouter.delete("/:completionId", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { completionId } = req.params;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.completion.delete({
      where: {
        id: parseInt(completionId),
        habit: { userId: user.id },
      },
    });

    res.json({ message: "Completion deleted successfully" });
  } catch (err) {
    console.error("Error during completion deletion:", err);
    res
      .status(500)
      .json({ error: "An error occurred during completion deletion" });
  }
});

export default completionRouter;
