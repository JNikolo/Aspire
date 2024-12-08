import { Router } from "express";
import { prisma } from "../middlewares/prisma.js";
import { clerkClient } from "../middlewares/clerk.js";
import { clerkMiddleware } from "@clerk/express";
const registerRouter = Router();

registerRouter.use(clerkMiddleware());

registerRouter.post("/create-after-signup", async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await prisma.user.create({
      data: {
        authId: user.id,
        profileName: user.emailAddresses[0].emailAddress.split("@")[0],
      },
    });

    if (!profile) {
      clerkClient.users.deleteUser(userId);
      return res.status(500).json({ error: "Failed to create user" });
    }

    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during create-after-signup:", err);
    res
      .status(500)
      .json({ error: "An error occurred during create-after-signup" });
  }
});

registerRouter.post("/sso-callback", async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { authId: user.id },
    });

    if (!existingUser) {
      const new_user = await prisma.user.create({
        data: {
          authId: user.id,
          profileName: user.fullName,
          profilePicture: user.imageUrl,
        },
      });

      if (!new_user) {
        clerkClient.users.deleteUser(userId);
        return res.status(500).json({ error: "Failed to create user" });
      }

      res.json({ message: "User logged in successfully", newUser: true });
    } else {
      res.json({ message: "User logged in successfully", newUser: false });
    }
  } catch (err) {
    console.error("Error during sso-callback:", err);
    res.status(500).json({ error: "An error occurred during sso-callback" });
  }
});
export default registerRouter;
