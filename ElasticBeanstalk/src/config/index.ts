import { EnvConfig } from "../types/env.types.js";
import { logger } from "../utils/logger.js";
import { PostgresConfig } from "./postgres.config2.js";

function getPostgresPool(env:EnvConfig){
  try {
    const postgres = new PostgresConfig(env)
  } catch (error) {
    throw error;
  }
}
