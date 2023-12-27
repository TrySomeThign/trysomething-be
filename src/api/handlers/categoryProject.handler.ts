import { ProjectCategory } from "../../database/entities";
import { ICategoryProjectHandler } from "./interfaces/categoryProjectHandler.interface";
import categoryProjectRepository from "../../database/repositories/categoryProjectRepository";

class CategoryProjectHandler implements ICategoryProjectHandler {
  async getAll(): Promise<ProjectCategory[]> {
    try {
      const categories = await categoryProjectRepository.getAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryProjectHandler();
