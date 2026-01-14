import express from "express";
import type { Request, Response } from "express";
import { logger } from "./utils/logger.js";
import { envConfig } from "./env.config.js";
import { connectPostgres } from "./config/index.js";
import { initializeModels } from "./models/init.js";

const app = express();

app.use(express.json());
const port:number = Number(envConfig.port);

const startServer = async function () {
  try {

    app.get("/health", function (req: Request, res: Response) {
      res.status(200).json({
        success: true,
        message: "Server is Healthy",
      });
    });

    app.listen(
      port,
      "0.0.0.0", function () {
      logger.info(`Server is listening in on port ${port}`);
    });

    await connectPostgres(envConfig)
    await initializeModels()

  } catch (error) {
    logger.error(`Error in server start up`, error)
  }
}

startServer()
