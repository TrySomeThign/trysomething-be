import { Router } from "express";
import IRouter from "./interfaces/router.interface";

const router = Router();

class UserRouter implements IRouter {
  get routes() {
    return router;
  }
}

export default new UserRouter();
