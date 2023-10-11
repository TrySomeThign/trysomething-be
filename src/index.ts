import { Application } from "express";
import api from "./api";
import { config } from "./config/environment";
import { Environment } from "./config/config";
import database from "./database";

Environment.setup();

async function startDatabase() {
  await database.setup();
}

async function startApiServer() {
  const app: Application = await api.server();

  app.listen(config.SERVER_PORT, () => {
    console.log(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
  });
}

startDatabase();
startApiServer();
