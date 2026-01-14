import { Pool } from "pg";
import { logger } from "../utils/logger.js";

export class Properties{

  constructor(private readonly pool: Pool) { }

  async createTable() {
    try {

      logger.warn(`Attempting to create properties table.`);

      const query = `
        CREATE TABLE IF NOT EXISTS properties(
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          location TEXT NOT NULL,
          createdAt TIMESTAMPTZ,
          updatedAt TIMESTAMPTZ
        );
      `

      await this.pool.query(query);

      logger.info(`Successfully intialized propeties table`);

      return "properties";

    } catch (error) {
      throw error;
    }
  }

  async createProperty() {
    try {

    } catch (error) {
      throw error;
    }
  }

}
