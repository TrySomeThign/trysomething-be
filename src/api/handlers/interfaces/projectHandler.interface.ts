import { IFilterGetAllProjects } from "../../../database/repositories/interfaces/projectRepository.interface";
import { Project } from "../../../database/entities";

export default interface IProjectHandler {
  getAll(filter: IFilterGetAllProjects): Promise<{ projects: Project[]; total: number }>;
}
