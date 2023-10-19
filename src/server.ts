import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
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

app.use("/api", router);
