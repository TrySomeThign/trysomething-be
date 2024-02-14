import { IFilterGetAllProjects } from "../../../database/repositories/interfaces/projectRepository.interface";
import { Project } from "../../../database/entities";
import { DeleteResult, UpdateResult } from "typeorm";

export interface IDataNewProject extends Project {}
export default interface IProjectHandler {
  getAll(filter: IFilterGetAllProjects): Promise<{ projects: Project[]; total: number }>;
  create(authorId: string, data: IDataNewProject): Promise<Project>;
  uploadFile(id: string, file: Express.Multer.File): Promise<string>;
  update(id: string, data: Project): Promise<UpdateResult>;
  archive(id: string): Promise<UpdateResult>;
  delete(id: string): Promise<DeleteResult>;
  recover(id: string): Promise<UpdateResult>;
}
