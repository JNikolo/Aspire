import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { prisma } from "../middlewares/prisma.js";
import { clerkClient } from '@clerk/clerk-sdk-node';

const profileRouter = express.Router();

profileRouter.use(clerkMiddleware());

profileRouter.get("/", async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ error: "Unauthorized access. Please log in." });
    }

    const { userId } = req.auth; 

    const userProfile = await prisma.user.findUnique({
      where: { authId: userId },
      select: {
        profileName: true,  
      },
    });

    if (!userProfile) {
      return res.status(404).json({
        error: "User profile not found. Please complete registration.",
      });
    }

    const user = await clerkClient.users.getUser(userId);
    console.log(user);
    const profileImage = user ? user.imageUrl : null;

    console.log(profileImage);

    const response = {
      profileName: userProfile.profileName, 
      profilePicture: profileImage,         
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching the user profile." });
  }
});

profileRouter.put("/", async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized access. Please log in." });
    }

    const { userId } = req.auth;
    const { profileName, profilePicture } = req.body;

    const updatedUser = await prisma.user.update({
      where: { authId: userId },
      data: {
        profileName: profileName || undefined,
        profilePicture: profilePicture || undefined,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user profile." });
  }
});

profileRouter.get("/communities", async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized access. Please log in." });
    }

    const { userId } = req.auth;

    const user = await prisma.user.findUnique({
      where: { authId: userId },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User profile not found. Please complete registration.",
      });
    }

    const habits = await prisma.habit.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (habits.length === 0) {
      return res.status(404).json({ error: "No habits found for the user." });
    }

    const habitIds = habits.map((habit) => habit.id);

    const habitLogs = await prisma.habitLog.findMany({
      where: {
        habitId: { in: habitIds },
      },
      select: {
        communityId: true,
      },
    });

    if (habitLogs.length === 0) {
      return res
        .status(404)
        .json({ error: "No habit logs found for the user's habits." });
    }

    const communityIds = habitLogs.map((log) => log.communityId);
    const uniqueCommunityIds = [...new Set(communityIds)].filter(
      (id) => id !== null
    ); // Filter out null values

    if (uniqueCommunityIds.length === 0) {
      return res.status(404).json({ error: "No valid community IDs found." });
    }

    const communities = await prisma.community.findMany({
      where: {
        id: { in: uniqueCommunityIds },
      },
      select: {
        name: true,
      },
    });

    if (communities.length === 0) {
      return res.status(404).json({ error: "No communities found." });
    }

    res.json(communities.map((community) => community.name));
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the communities." });
  }
});

profileRouter.get("/habits", async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized access. Please log in." });
    }

    const authId = req.auth.userId;

    const user = await prisma.user.findUnique({
      where: { authId: authId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;

    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
    });

    if (habits.length === 0) {
      return res.status(404).json({ error: "No habits found for the user." });
    }

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const habitsWithLogs = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
      include: {
        HabitLogs: {
          where: {
            logDate: {
              gte: sevenDaysAgo,
              lte: today,
            },
          },
        },
      },
    });

    res.json(habitsWithLogs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the habits." });
  }
});

export default profileRouter;
