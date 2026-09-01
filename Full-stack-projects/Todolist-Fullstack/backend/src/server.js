import express from "express";
import dotenv from "dotenv";
import devRouter from "./routes/devRoutes.js";
import mainRouter from "./routes/mainRoutes.js";
import sessionMiddleware from "./config/pgSession.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(sessionMiddleware);

app.use("/dev/", devRouter);
app.use("/", mainRouter);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.listen(process.env.PORT, () => {
  console.log(`Running on port http://localhost:${process.env.PORT}`);
});
