import { Router } from "express";
import IRouter from "./interfaces/router.interface";
import userRouter from "./user.router";

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use("/user", userRouter.routes);
    return router;
  }
}

export default new BaseRouter();
