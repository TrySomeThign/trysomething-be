import { Router } from "express";
import projectHandler from "../handlers/project.handler";
import routerHelper, { schemas } from "../helpers/router.helper";
import IRouter from "./interfaces/router.interface";
import { errorResponse, successResponse } from "./response";
import { IGetUserAuthInfoRequest } from "../types/interface";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.diskStorage({}),
});

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
    router.post(
      "/",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateBody(schemas.createProject),
      async (req: IGetUserAuthInfoRequest, res) => {
        try {
          const newProject = await projectHandler.create(req.user.id, req.body);
          return successResponse(res, newProject);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.post(
      "/upload/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      upload.single("image"),
      async (req, res) => {
        try {
          const { id } = req.params;

          const url = await projectHandler.uploadFile(id, req.file);
          return successResponse(res, { url });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.put(
      "/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      routerHelper.validateBody(schemas.updateProject),
      async (req, res) => {
        try {
          const { id } = req.params;
          await projectHandler.update(id, req.body);
          return successResponse(res, { message: `Project has been updated successfully` });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.delete(
      "/archived/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      async (req, res) => {
        try {
          const { id } = req.params;
          await projectHandler.archive(id);
          return successResponse(res, { message: `Project has been deleted` });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );

    router.post(
      "/restore/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      async (req, res) => {
        try {
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    router.delete(
      "/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      async (req, res) => {
        try {
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new ProjectRouter();
