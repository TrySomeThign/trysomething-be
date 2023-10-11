import { Router } from "express";
import IRouter from "./interfaces/router.interface";
import { errorResponse, successResponse } from "./response";

const router = Router();

class UserRouter implements IRouter {
  get routes() {
    router.post("/", async (req, res) => {
      try {
        return successResponse(res, {});
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new UserRouter();
