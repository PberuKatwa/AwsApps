import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string):string {
  try {

    const env = process.env[key];
    if (!env || env === undefined || env || "") throw new Error(`No env for key:${key} was found`);
    return env

  } catch (error) {
    throw error;
  }
}

export const config = {
  environment:getEnv("ENVIRONMENT"),
  port: getEnv("PORT"),
  pgHost: getEnv("PG_HOST"),
  pgPort: getEnv("PG_PORT"),
  pgUser: getEnv("PG_USER"),
  pgPassword: getEnv("PG_PASSWORD"),
  pgDatabase: getEnv("PG_DATABASE")
}
