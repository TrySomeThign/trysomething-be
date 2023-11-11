import { NextFunction, Response } from "express";
import { errorResponse } from "../routers/response";
import { IGetUserAuthInfoRequest } from "../types/interface";
import jwt from "jsonwebtoken";
import userHandler from "../handlers/user.handler";
class AuthMiddleware {
  async authToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const headers: string = req.headers["authorization"];
      const token = headers.split(" ")[1];

      if (!token) {
        throw new Error(`Unauthenticated`);
      }

      const result = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      const user = await userHandler.getById(result.id);
      if (!user) {
        throw new Error(`Unauthenticated`);
      }
      
      req.user = user;

      next();
    } catch (error) {
      return errorResponse(res, error);
    }
  }
}

export default new AuthMiddleware();
