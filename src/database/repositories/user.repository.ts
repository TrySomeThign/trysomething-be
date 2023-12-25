import { Repository } from "typeorm";
import IUserRepository from "./interfaces/userRepository.interface";
import { User } from "../entities";
import { AppDataSource } from "../data-source";

class UserRepository implements IUserRepository {
  repo: Repository<User>;
  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async getByEmailOrUserName(emailOrUserName: string): Promise<User> {
    if (!emailOrUserName) return null;
    return await this.repo.findOne({
      where: {
        email: emailOrUserName,
      },
    });
  }
  async getById(id: string): Promise<User> {
    if (!id) return null;
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }

  create(data: User): Promise<User> {
    return this.repo.save(data);
  }

  async getPassword(id: string): Promise<string> {
    const accountForGetPwd = await this.repo.findOne({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
    return accountForGetPwd.password;
  }
}
export default new UserRepository();
