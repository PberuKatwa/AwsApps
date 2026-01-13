import { Pool, PoolConfig } from "pg";
import { logger } from "../utils/logger.js";
import type { BaseDbConfig, ProdDbConfig } from "../types/db.types.js";
import { envConfig } from "../env.config.js";


export class PostgresConfig{
  private readonly environment: string;
  constructor(
    environment
  ) {

  }
}
/**
 * Environment names your app supports
 */
type Environment = "development" | "production";

const environment = (config.environment) as Environment;


/**
 * Get Postgres config based on NODE_ENV
 */
export const getPostgresDatabaseConfig = (): BaseDbConfig | ProdDbConfig => {
  switch (environment) {
    case "development":
      return {
        host: config.pgHost,
        port: Number(config.pgPort),
        user: config.pgUser,
        password: config.pgPassword,
        database: config.pgDatabase,
        logging: (msg: string) => logger.debug(msg),
      };

    case "production":
      return {
        host: config.pgHost,
        port: Number(config.pgPort),
        user: config.pgUser,
        password: config.pgPassword,
        database: config.pgDatabase,
        pool: {
          max: 5,
          min: 0,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        },
        logging: false,
      };

    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
};

let pool: Pool | undefined;

/**
 * Connect to Postgres and return the pool
 */
export const connectPostgres = async (): Promise<Pool> => {
  try {
    const config = getPostgresDatabaseConfig();

    logger.info(
      `Connecting to ${environment} PostgreSQL database: ${config.host}:${config.port}/${config.database}`
    );

    const poolConfig: PoolConfig = {
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
      ...( "pool" in config ? config.pool : {} ),
    };

    pool = new Pool(poolConfig);

    // Test connection
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();

    logger.info(`PostgreSQL successfully connected to ${environment}`);
    return pool;
  } catch (error) {
    logger.error("PostgreSQL connection error:", error);
    throw error;
  }
};

/**
 * Disconnect Postgres pool
 */
export const disconnectPostgres = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.end();
      pool = undefined;
      logger.info("PostgreSQL pool disconnected");
    }
  } catch (error) {
    logger.error("Error disconnecting from PostgreSQL:", error);
    throw error;
  }
};

export const getPool = (): Pool | undefined => pool;
