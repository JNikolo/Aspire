import { Router } from "express";
import { generateResponse } from "../controllers/chatController.js";
import { clerkMiddleware } from "@clerk/express";
import { prisma } from "../middlewares/prisma.js";

const chatRouter = Router();
chatRouter.use(clerkMiddleware());

chatRouter.post("/", async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await prisma.user.findUnique({
      where: { authId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { messages } = req.body;

    const response = await generateResponse(messages, user.id);

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default chatRouter;
