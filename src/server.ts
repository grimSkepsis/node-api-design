import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signinUser } from "./handlers/user";
import { errorHandler } from "./modules/middleware";
import { body } from "express-validator";
export const app = express();

// catches and handles unandles sync and async errors
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason);
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception:", error.stack || error);
});

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

app.post(
  "/user",
  body("username").isString(),
  body("password").isString(),
  errorHandler,
  createNewUser
);

app.post(
  "/signin",
  body("username").isString(),
  body("password").isString(),
  errorHandler,
  signinUser
);
app.use(errorHandler);
