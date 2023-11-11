import { Request } from "express";
import { User } from "../../database/entities";
export interface IGetUserAuthInfoRequest extends Request {
  user: User;
}
