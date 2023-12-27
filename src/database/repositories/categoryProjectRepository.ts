import { Repository } from "typeorm";
import { ProjectCategory } from "../entities";
import { ICategoryProjectRepository } from "./interfaces/categoryProjectRepository.interface";
import { AppDataSource } from "../data-source";

class CategoryProjectRepository implements ICategoryProjectRepository {
  repo: Repository<ProjectCategory>;
  constructor() {
    this.repo = AppDataSource.getRepository(ProjectCategory);
  }
  getAll(): Promise<ProjectCategory[]> {
    return this.repo.find({});
  }
}
export default new CategoryProjectRepository();
