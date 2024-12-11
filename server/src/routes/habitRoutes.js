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
      include: {
        frequency: true, // Include the frequency field
        selectedDays: true, // Include the selectedDays field if needed
      },
    });
    console.log(habits);
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

habitRouter.post("/:habitId/log", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId } = req.params;
    const { title, description, picture, logDate, isPublic, communityId } =
      req.body;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: parseInt(habitId) },
    });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const habitLog = await prisma.habitLog.create({
      data: {
        habitId: habit.id, // Associate the log with the habit
        title,
        description,
        picture,
        logDate: new Date(logDate),
        isPublic,
        updatedAt: new Date(),
        communityId,
      },
    });

    res.json(habitLog);
  } catch (err) {
    console.error("Error during habit log creation:", err);
    res
      .status(500)
      .json({ error: "An error occurred during habit log creation" });
  }
});

habitRouter.get("/:habitId/log", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId } = req.params;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const habitLogs = await prisma.habitLog.findMany({
      where: { habitId: parseInt(habitId) },
      include: {
        community: true, // Include the community field
      },
    });

    res.json(habitLogs);
  } catch (err) {
    console.error("Error during habit logs fetch:", err);
    res
      .status(500)
      .json({ error: "An error occurred during habit logs fetch" });
  }
});

habitRouter.delete("/:habitId/log/:logId", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId, logId } = req.params;

    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: parseInt(habitId) },
    });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    await prisma.habitLog.delete({
      where: { id: parseInt(logId) },
    });

    res.json({ message: "Habit log deleted successfully" });
  } catch (err) {
    console.error("Error during habit log deletion:", err);
    res
      .status(500)
      .json({ error: "An error occurred during habit log deletion" });
  }
});

habitRouter.put("/:habitId/log/:logId", async (req, res) => {
  try {
    const { userId } = req.auth;
    const { habitId, logId } = req.params;
    const { title, description, picture, logDate, isPublic, communityId } =
      req.body;
    console.log(req.body);
    const user = await prisma.user.findUnique({ where: { authId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: parseInt(habitId) },
    });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const habitLog = await prisma.habitLog.update({
      where: { id: parseInt(logId) },
      data: {
        title,
        description,
        picture,
        logDate: new Date(logDate),
        isPublic,
        updatedAt: new Date(),
        communityId,
      },
    });

    res.json(habitLog);
  } catch (err) {
    console.error("Error during habit log update:", err);
    res
      .status(500)
      .json({ error: "An error occurred during habit log update" });
  }
});

export default habitRouter;

// export const postHabitLog = async (habitId, data, getToken) => {
//   try {
//     const token = await getToken();
//     const response = await fetch(`http://127.0.0.1:3000/habit/${habitId}/log`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (err) {
//     console.error("Error during habit log creation:", err);
//   }
// };

//habit schema for prisma
// model Habit {
//   id            Int                @id @default(autoincrement())
//   habitName     String
//   notifications Boolean
//   userId        String
//   createdAt     DateTime           @default(now())
//   updatedAt     DateTime           @updatedAt
//   user          User               @relation(fields: [userId], references: [id], onDelete: Cascade)
//   frequency     HabitFrequency[]
//   HabitLog      HabitLog[]
//   selectedDays  HabitSelectedDay[]

//   @@unique([habitName, userId])
// }

// model HabitLog {
//   id          Int        @id @default(autoincrement())
//   habitId     Int
//   communityId Int?
//   title       String
//   description String?
//   picture     String?
//   logDate     DateTime
//   createdAt   DateTime   @default(now())
//   updatedAt   DateTime
//   isPublic    Boolean
//   Community   Community? @relation(fields: [communityId], references: [id])
//   Habit       Habit      @relation(fields: [habitId], references: [id], onDelete: Cascade)

//   @@unique([habitId, logDate])
// }
