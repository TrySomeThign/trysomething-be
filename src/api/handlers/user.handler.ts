import { User } from "../../database/entities";
import IUserHandler from "./interfaces/userHandler.interface";
import userRepository from "../../database/repositories/user.repository";

class UserHandler implements IUserHandler {
  async getById(id: string): Promise<User> {
    try {
      const user = await userRepository.getById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByEmailOrUserName(emailOrUserName: string): Promise<User> {
    try {
      const user = await userRepository.getByEmailOrUserName(emailOrUserName);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async create(data: User): Promise<User> {
    try {
      const newUser = await userRepository.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getPasswordOfAccount(id: string) {
    try {
      const user = await userRepository.getById(id);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }

      const password = await userRepository.getPassword(id);
      return password;
    } catch (error) {
      throw error;
    }
  }
}
export default new UserHandler();
