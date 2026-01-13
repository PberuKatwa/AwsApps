import { Pool, PoolConfig } from "pg";
import { logger } from "../utils/logger.js";

/**
 * Environment names your app supports
 */
type Environment = "development" | "production";

/**
 * Shared DB config shape
 */
interface BaseDbConfig {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  logging?: boolean | ((msg: string) => void);
}

/**
 * Production-only pool config
 */
interface ProdDbConfig extends BaseDbConfig {
  pool?: {
    max?: number;
    min?: number;
    idleTimeoutMillis?: number;
    connectionTimeoutMillis?: number;
  };
}

/**
 * Get Postgres config based on NODE_ENV
 */
export const getPostgresDatabaseConfig = (): BaseDbConfig | ProdDbConfig => {
  const environment = (process.env.NODE_ENV ||
    "development") as Environment;

  switch (environment) {
    case "development":
      return {
        host: process.env.PG_HOST_DEV ?? "localhost",
        port: Number(process.env.PG_PORT_DEV) || 5432,
        user: process.env.PG_USER_DEV ?? "postgres",
        password: process.env.PG_PASSWORD_DEV ?? "",
        database: process.env.PG_DB_NAME_DEV ?? "joyful",
        logging: (msg: string) => logger.debug(msg),
      };

    case "production":
      return {
        host: process.env.PG_HOST_PROD,
        port: Number(process.env.PG_PORT_PROD) || 5432,
        user: process.env.PG_USER_PROD,
        password: process.env.PG_PASSWORD_PROD,
        database: process.env.PG_DB_NAME_PROD,
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
    const environment = (process.env.NODE_ENV ||
      "development") as Environment;
    const config = getPostgresDatabaseConfig();

    logger.info(
      `Connecting to ${environment} PostgreSQL database: ${config.host}:${config.port}/${config.database}`
    );

    /**
     * ⚠️ IMPORTANT FIX:
     * pg.Pool does NOT accept `pool: { ... }`
     * The pool options must be spread at top-level
     */
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

/**
 * Get active pool instance
 */
export const getPool = (): Pool | undefined => pool;
