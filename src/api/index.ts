import express, { Application, Request, Response } from "express";
import cors from "cors";
import BaseRouter from "./routers";
import cloudinaryService from "./services/cloudinary.service";

// SERVICE
cloudinaryService();

// API
interface IApi {
  server(): Promise<Application>;
}

class Api implements IApi {
  async server(): Promise<Application> {
    const app = express();
    app.use(cors({ origin: "*" }));
    app.use(express.json({ limit: "100mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", BaseRouter.routes);

    app.get("/", (req: Request, res: Response) => {
      return res.send("Welcome to TrySomeThing api application");
    });
    return app;
  }
}

export default new Api();
