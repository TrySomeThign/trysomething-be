import { Router } from "express";
import authRouter from "./auth.router";
import IRouter from "./interfaces/router.interface";
import projectRouter from "./project.router";
import projectCategoryRouter from "./projectCategory.router";
import userRouter from "./user.router";

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use("/auth", authRouter.routes);
    router.use("/users", userRouter.routes);
    router.use("/projects", projectRouter.routes);
    router.use("/project-categories", projectCategoryRouter.routes);
    return router;
  }
}

export default new BaseRouter();
