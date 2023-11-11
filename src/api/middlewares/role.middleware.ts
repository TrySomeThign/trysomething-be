import { NextFunction, Response } from "express";
import { EUserRole } from "../../database/interfaces";
import { errorResponse } from "../routers/response";
import { IGetUserAuthInfoRequest } from "../types/interface";

class RoleMiddleware {
  async isAdmin(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const { user } = req;

      if (user.role !== EUserRole.Admin) {
        throw new Error("Permission denied");
      }

      next();
    } catch (error) {
      return errorResponse(res, error);
    }
  }
}

export default new RoleMiddleware();
