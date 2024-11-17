import Express from "express";
import signRouter from "./routes/signRoutes.js";
import cors from "cors";

const app = Express();

app.use(Express.json());
app.use(cors());
app.use("/user", signRouter);

app.get("/", (req, res) => {
  console.log("got requested");
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
