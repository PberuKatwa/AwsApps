import { Pool, PoolConfig } from "pg";
import { logger } from "../utils/logger.js";
import { EnvConfig } from "../types/env.types.js";


export class PostgresConfig{

  private readonly host: string;
  private readonly port: number;
  private readonly user: string;
  private readonly password: string;
  private readonly database: string ;
  public pool: Pool | null;

  constructor(
    private readonly env: EnvConfig
  ) {
    this.host = env.pgHost;
    this.port = Number(env.pgPort);
    this.user = env.pgUser;
    this.password = env.pgPassword;
    this.database = env.pgDatabase;
    this.pool = null;
  }

  async connect() {
    try {

      logger.info(`Connecting to PostgreSQL database: ${this.host}:${this.port}/${this.database}`);

      const poolConfig: PoolConfig = {
        user: this.user,
        host: this.host,
        database: this.database,
        password: this.password,
        port: this.port,
      }

      this.pool = new Pool(poolConfig)

      const client = await this.pool.connect();
      await client.query("SELECT 1");
      client.release();

      logger.info(`PostgreSQL successfully connected`);
      return this.pool;

    } catch (error) {
      throw error;
    }
  }
}
