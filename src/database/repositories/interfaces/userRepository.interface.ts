import { UpdateResult } from "typeorm";
import { User } from "../../entities";
import { EUserRole } from "../../interfaces";

export interface IDataUpdateUser {
  avatar?: string;
  name?: string;
  displayName?: string;
  email?: string;
  role?: EUserRole;
  jobTitle?: string;
  introduction?: string;
}
export default interface IUserRepository {
  getById(id: string): Promise<User>;
  getByEmailOrUserName(emailOrUserName: string): Promise<User>;
  create(data: User): Promise<User>;
  getPassword(id: string): Promise<string>;
  updateProfile(id: string, data: IDataUpdateUser): Promise<UpdateResult>;
}
