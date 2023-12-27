import { ProjectCategory } from "../../entities";

export interface ICategoryProjectRepository {
  getAll(): Promise<ProjectCategory[]>;
}
