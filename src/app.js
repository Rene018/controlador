import express from "express";
import morgan from "morgan";
import cookieParse from "cookie-parser";
import authRouter from "./routes/doc.routes.js";
import router from "./routes/auth.routes.js";
import routerM from "./routes/main.routes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParse());
app.use("/api", authRouter);
app.use("/api", router);
app.use("/api", routerM);
export default app;
