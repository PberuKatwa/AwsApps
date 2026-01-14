import { logger } from "../utils/logger.js";
import propertyInstance from "./properties.js";

export async function initializeModels() {
  try {
    const properties = await propertyInstance.createTable()
  } catch (error) {
    logger.error(`Error in initalizing models`,error)
  }
}
