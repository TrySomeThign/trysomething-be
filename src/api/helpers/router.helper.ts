import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponse } from "../routers/response";
import { EUserRole } from "../../database/interfaces";

export const schemas = {
  // BASE
  params: Joi.object({
    id: Joi.string().required(),
  }),
  query: Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
  }),

  queryGetAllProjects: Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
    categoryId:Joi.string()
  }),
  updateUser: Joi.object({
    name: Joi.string(),
    displayName: Joi.string(),
    email: Joi.string(),
    avatar: Joi.any(),
    role: Joi.string().valid(EUserRole.Admin, EUserRole.Guest, EUserRole.User),
    jobTitle: Joi.string(),
    introduction: Joi.string(),
  }),
  authSignIn: Joi.object({
    emailOrUsername: Joi.string()
      .required()
      .error(() => new Error("Email or username is required")),
    password: Joi.string()
      .required()
      .error(() => new Error("Email or username is required")),
  }),

  authSignUp: Joi.object({
    emailOrUsername: Joi.string()
      .required()
      .error(() => new Error("Email or username is required")),
    password: Joi.string()
      .required()
      .error(() => new Error("Email or username is required")),
    passwordConfirm: Joi.ref("password"),
  }),
};

class RouterHelper {
  validateBody(schema: Joi.ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return errorResponse(res, error);
      } else {
        next();
      }
    };
  }
  validateParams(schema: Joi.ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.params);
      if (error) {
        return errorResponse(res, error);
      } else {
        next();
      }
    };
  }
  validateQuery(schema: Joi.ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.query);
      if (error) {
        return errorResponse(res, error);
      } else {
        next();
      }
    };
  }
}

export default new RouterHelper();
