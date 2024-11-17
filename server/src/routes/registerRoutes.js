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

    await prisma.user.create({
      data: {
        authId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.username,
      },
    });

    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during create-after-signup:", err);
    res
      .status(500)
      .json({ error: "An error occurred during create-after-signup" });
  }
});

export default registerRouter;
