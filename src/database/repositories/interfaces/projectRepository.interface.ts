import { UpdateResult } from "typeorm";
import { IFilterBase } from "../../../api/common/types/filterBase";
import { Project } from "../../entities";

export interface IFilterGetAllProjects extends IFilterBase {
  categoryId: string;
}

export default interface IProjectRepository {
  getAll(filter: IFilterGetAllProjects): Promise<[Project[], number]>;
  getById(id: string): Promise<Project>;
  update(id: string, data: Project): Promise<UpdateResult>;
}
