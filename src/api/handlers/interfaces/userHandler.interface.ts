import { UpdateResult } from "typeorm";
import { User } from "../../../database/entities";
import { IDataUpdateUser } from "../../../database/repositories/interfaces/userRepository.interface";

export default interface IUserHandler {
  getByEmailOrUserName(emailOrUserName: string): Promise<User>;
  getById(id: string): Promise<User>;
  create(data: User): Promise<User>;
  getPasswordOfAccount(id: string): Promise<string>;
  updateProfile(id: string, data: IDataUpdateUser): Promise<UpdateResult>;
  uploadFile(id: string, file: Express.Multer.File): Promise<string>;
}
