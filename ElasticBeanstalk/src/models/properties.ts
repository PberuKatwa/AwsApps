import { Pool } from "pg";
import { logger } from "../utils/logger.js";

export class Properties{

  constructor(private readonly pool: Pool) { }

  async createTable():Promise<string> {
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

      logger.info(`Successsfully intialized propeties table`);

      return "properties";

    } catch (error) {
      throw error;
    }
  }

  async createProperty( name:string, price:number, location:string ) {
    try {

      logger.warn(`Attempting to create a property with ${name}, ${price}, ${location}`);

      const query = `
        INSERT INTO properties ( name, price, location )
        VALUES( ${name}, ${price}, ${location} );
      `

      await this.pool.query(query);

      return `Property table updated with name${name}, ${price}, ${location}`;

    } catch (error) {
      throw error;
    }
  }

}
