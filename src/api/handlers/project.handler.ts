import { Project } from "src/database/entities";
import { IFilterGetAllProjects } from "../../database/repositories/interfaces/projectRepository.interface";
import projectRepository from "../../database/repositories/project.repository";
import IProjectHandler from "./interfaces/projectHandler.interface";

class ProjectHandler implements IProjectHandler {
  async getAll(filter: IFilterGetAllProjects): Promise<{ projects: Project[]; total: number }> {
    try {
      const [projects, total] = await projectRepository.getAll(filter);
      return { projects, total };
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectHandler();
