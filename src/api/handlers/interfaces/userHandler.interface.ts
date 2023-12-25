import { User } from "../../../database/entities";

export default interface IUserHandler {
  getByEmailOrUserName(emailOrUserName: string): Promise<User>;
  getById(id: string): Promise<User>;
  create(data: User): Promise<User>;
  getPasswordOfAccount(id: string): Promise<string>;
}
