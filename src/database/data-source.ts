import { Environment } from "../config/config";
import { DataSource } from "typeorm";

Environment.setup();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER || "conian",
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [],
  migrations: [__dirname + "/migrations/**/*.ts"],
  subscribers: [],
});
