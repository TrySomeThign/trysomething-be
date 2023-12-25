import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../database/entities";
import userHandler from "../handlers/user.handler";
import routerHelper, { schemas } from "../helpers/router.helper";
import authMiddleware from "../middlewares/auth.middleware";
import { IGetUserAuthInfoRequest } from "../types/interface";
import IRouter from "./interfaces/router.interface";
import { errorResponse, successResponse } from "./response";

const router = Router();
class AuthRouter implements IRouter {
  get routes() {
    router.post("/sign-in", routerHelper.validateBody(schemas.authSignIn), async (req, res) => {
      try {
        const { emailOrUsername, password } = req.body;

        const user = await userHandler.getByEmailOrUserName(emailOrUsername);
        if (!user) {
          throw new Error(`User doesn't exist`);
        }

        const passwordOfAccount = await userHandler.getPasswordOfAccount(user.id);
        const isValidPassword = await bcrypt.compare(password, passwordOfAccount ?? "");

        if (!isValidPassword) {
          throw new Error(`Password incorrect`);
        }
        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return successResponse(res, { user: { ...user, token: newToken } });
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.post("/sign-up", routerHelper.validateBody(schemas.authSignUp), async (req, res) => {
      try {
        const { emailOrUsername, password } = req.body;

        const userExist = await userHandler.getByEmailOrUserName(emailOrUsername);
        if (userExist) {
          throw new Error(`Account existed`);
        }

        const saltRounds = 10;
        const passwordHashed = await bcrypt.hash(password, saltRounds);

        const newUser = await userHandler.create({
          email: emailOrUsername,
          password: passwordHashed,
        } as User);

        const newToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return successResponse(res, { user: { ...newUser, token: newToken } });
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.post(
      "/get-user",
      authMiddleware.authToken,
      async (req: IGetUserAuthInfoRequest, res) => {
        try {
          const user = req.user;
          return successResponse(res, { user });
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new AuthRouter();
