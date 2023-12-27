import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Project } from "../entities";
import IProjectRepository, {
  IFilterGetAllProjects,
} from "./interfaces/projectRepository.interface";

class ProjectRepository implements IProjectRepository {
  repo: Repository<Project>;
  constructor() {
    this.repo = AppDataSource.getRepository(Project);
  }

  async getAll(filter: IFilterGetAllProjects): Promise<[Project[], number]> {
    try {
      const { limit, page, categoryId } = filter;

      const result = await this.repo.findAndCount({
        where: {
          category: {
            id: categoryId,
          },
        },
        relations: {
          author: true,
          category: true,
          socials: true,
        },
        skip: page ? (page - 1) * limit : null,
        take: limit ? limit : null,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProjectRepository();
