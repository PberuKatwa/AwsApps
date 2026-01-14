import { Pool } from "pg";
import { getPool } from "../config/index.js";

const pgPool = getPool();

class Properties{

  constructor(private readonly pool: Pool) { }

  createTable() {
    try {

    } catch (error) {
      throw error;
    }
  }
}

// const createGroupTable = async functionn () {

//     const pool = getPool()

//     const query = `

//       CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
