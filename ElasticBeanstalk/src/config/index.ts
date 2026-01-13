import { EnvConfig } from "../types/env.types.js";
import { logger } from "../utils/logger.js";
import { PostgresConfig } from "./postgres.config.js";

export async function getPostgresPool(env:EnvConfig){
  try {

    const postgres = new PostgresConfig(env)
    const pgPool = await postgres.connect()
    return pgPool

  } catch (error) {
    throw error;
  }
}
