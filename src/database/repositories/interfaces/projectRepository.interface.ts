import { IFilterBase } from "../../../api/common/types/filterBase";
import { Project } from "../../entities";

export interface IFilterGetAllProjects extends IFilterBase {
  categoryId: string;
}

export default interface IProjectRepository {
  getAll(filter: IFilterGetAllProjects): Promise<[Project[], number]>;
}
