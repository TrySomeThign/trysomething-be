import { ProjectCategory } from "../../../database/entities";

export interface ICategoryProjectHandler {
  getAll(): Promise<ProjectCategory[]>;
}
