import { User } from "../../entities";

export default interface IUserRepository {
  getById(id: string): Promise<User>;
  getByEmailOrUserName(emailOrUserName: string): Promise<User>;
  create(data: User): Promise<User>;
  getPassword(id: string): Promise<string>;
}
