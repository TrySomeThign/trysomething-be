import { User } from "../../database/entities";
import IUserHandler from "./interfaces/userHandler.interface";
import userRepository from "../../database/repositories/user.repository";
import { UpdateResult } from "typeorm";
import cloudinary from "cloudinary";
import { IDataUpdateUser } from "../../database/repositories/interfaces/userRepository.interface";

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

  async updateProfile(id: string, data: IDataUpdateUser): Promise<UpdateResult> {
    try {
      const user = userRepository.getById(id);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }
      const { displayName, email, introduction, jobTitle, name, role } = data;
      const result = await userRepository.updateProfile(id, {
        displayName,
        email,
        introduction,
        jobTitle,
        name,
        role,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async uploadFile(id: string, file: Express.Multer.File): Promise<string> {
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const user = await userRepository.getById(id);
      const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
        public_id: `avatar-${user.id}`,
        use_filename: true,
        folder: "tst-portfolio/avatar",
      });

      if (file.mimetype.startsWith("image")) {
        await userRepository.updateProfile(id, {
          avatar: secure_url,
        } as IDataUpdateUser);
        return secure_url;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new UserHandler();
