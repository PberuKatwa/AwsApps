import { Pool } from "pg";
import { getPool } from "../config/index.js";
import { logger } from "../utils/logger.js";

const pgPool = getPool();

class Properties{

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

      await this.pool.query(query)

      return "properties"

    } catch (error) {
      throw error;
    }
  }
}

//       CREATE TABLE IF NOT EXISTS groups (
//         id SERIAL PRIMARY KEY,
//         uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
//         mongo_id VARCHAR(24) UNIQUE,
//         name TEXT NOT NULL,
//         managed_by_name TEXT,
//         region_name TEXT,
//         managed_by_model TEXT,
//         managed_by INTEGER,
//         country INTEGER,
//         country_name TEXT,
//         region INTEGER,
//         status TEXT,
//         registration_number TEXT,
//         created_at TIMESTAMPTZ,
//         updated_at TIMESTAMPTZ,
//         joining_date TIMESTAMPTZ,
//         is_government_registration BOOLEAN DEFAULT FALSE,

//         CONSTRAINT fk_managed_by
//           FOREIGN KEY (managed_by)
//           REFERENCES franchises(id)
//           ON DELETE SET NULL,

//         CONSTRAINT fk_country
//           FOREIGN KEY (country)
//           REFERENCES countries(id)
//           ON DELETE RESTRICT,

//         CONSTRAINT fk_region
//           FOREIGN KEY (region)
//           REFERENCES regions(id)
//           ON DELETE RESTRICT
//       );
//     `

//     try {
//         await pool.query(query);
//         // logger.info("The table groups already exists")
//         return "groups"
//     } catch (error) {
//         logger.error("error in creating group table", error)
//     }

// }

// module.exports = { createGroupTable }
