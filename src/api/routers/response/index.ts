import { Response } from "express";

export const successResponse = async (res: Response, data: any) => {
  return res.status(200).json({ status: "success", data });
};

export const errorResponse = async (res: Response, error: Error, code = 400) => {
  return res.status(code).json({ status: "error", message: error.message, stack: error.stack });
};
