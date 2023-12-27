import { Router } from "express";
import categoryProjectHandler from "../handlers/categoryProject.handler";
import IRouter from "./interfaces/router.interface";
import { errorResponse, successResponse } from "./response";

const router = Router();

class CategoryProjectRouter implements IRouter {
  get routes() {
    router.get("/", async (req, res) => {
      try {
        const categories = await categoryProjectHandler.getAll();
        return successResponse(res, categories);
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new CategoryProjectRouter();
