import { Router } from "express";
import IRouter from "./interfaces/router.interface";
import { errorResponse, successResponse } from "./response";
import routerHelper, { schemas } from "../helpers/router.helper";
import userHandler from "../handlers/user.handler";

const router = Router();
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const upload = multer({
  storage: multer.diskStorage({}),
});

class UserRouter implements IRouter {
  get routes() {
    router.post("/", async (req, res) => {
      try {
        return successResponse(res, {});
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    router.put("/:id", routerHelper.validateParams(schemas.params), async (req, res) => {
      try {
        const { id } = req.params;

        await userHandler.updateProfile(id, req.body);
        return successResponse(res, { message: `Update user successfully` });
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.post(
      "/upload/:id",
      authMiddleware.authToken,
      roleMiddleware.isAdmin,
      routerHelper.validateParams(schemas.params),
      upload.single("avatar"),
      async (req, res) => {
        try {
          const { id } = req.params;

          const url = await userHandler.uploadFile(id, req.file);
          return successResponse(res, { url });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new UserRouter();
