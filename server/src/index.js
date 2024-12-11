import Express from "express";
import registerRouter from "./routes/registerRoutes.js";
import habitRouter from "./routes/habitRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import cors from "cors";

const app = Express();
app.use(cors());
app.use(Express.json({ limit: "10mb" }));
app.use(Express.urlencoded({ limit: "10mb", extended: true }));

app.use(Express.json());
app.use(cors());
app.use("/register", registerRouter);
app.use("/habit", habitRouter);
app.use("/chat", chatRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  console.log("got requested");
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
