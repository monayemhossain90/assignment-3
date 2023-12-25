import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// App Routes
app.use("/api", router);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    next(error);
  }
});

// Route Not Found
app.use(notFound);

app.use(globalErrorHandler);

export default app;
