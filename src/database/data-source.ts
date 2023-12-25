import { Environment } from "../config/config";
import { DataSource } from "typeorm";
import { ProjectCategory, Skill, User } from "./entities";
import { Social } from "./entities";
import { Project } from "./entities";

Environment.setup();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [User, Social, Project, Skill, ProjectCategory],
  migrations: [__dirname + "/migrations/**/*.ts"],
  subscribers: [],
});
