import { Router } from "express";
import projectHandler from "../handlers/project.handler";
import routerHelper, { schemas } from "../helpers/router.helper";
import IRouter from "./interfaces/router.interface";
import { errorResponse, successResponse } from "./response";

const router = Router();

class ProjectRouter implements IRouter {
  get routes() {
    router.get("/", routerHelper.validateQuery(schemas.queryGetAllProjects), async (req, res) => {
      try {
        const { limit, page, categoryId } = req.query;
        const { projects, total } = await projectHandler.getAll({
          limit: Number(limit),
          page: Number(page),
          categoryId: String(categoryId),
        });

        const totalPage = Math.ceil(total / Number(limit));

        return successResponse(res, { projects, totalPage, page: Number(page) });
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new ProjectRouter();
