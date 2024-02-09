import { IFilterGetAllProjects } from "../../../database/repositories/interfaces/projectRepository.interface";
import { Project } from "../../../database/entities";

export interface IDataNewProject extends Project {}
export default interface IProjectHandler {
  getAll(filter: IFilterGetAllProjects): Promise<{ projects: Project[]; total: number }>;
  create(authorId: string, data: IDataNewProject): Promise<Project>;
  uploadFile(id: string, file: Express.Multer.File): Promise<string>;
}
