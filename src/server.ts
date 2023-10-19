import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signinUser } from "./handlers/user";
export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhh = "secret";
  next();
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Hello World (express)!");
  res.end();
});

app.use("/api", protect, router);

app.post("/user", createNewUser);

app.post("/signin", signinUser);
