import express from "express";
import type { Request, Response } from "express";

const app = express();

app.use(express.json());
const port:number = 3456;

app.get("/health", function (req: Request, res: Response) {
  res.status(200).json({
    success: true,
    message: "Server is Healthy",
  });
});

app.listen(
  port,
  "0.0.0.0", function () {
  console.log(`Server is listening in on port ${port}`);
});
