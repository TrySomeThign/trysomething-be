import { ProjectCategory } from "../../entities";

export interface ICategoryProjectRepository {
  getAll(): Promise<ProjectCategory[]>;
  getById(id: string): Promise<ProjectCategory>;
}
