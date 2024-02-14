import { DeleteResult, UpdateResult } from "typeorm";
import { Social } from "../..//entities";

export default interface ISocialRepository {
  create(data: Social): Promise<Social>;
  update(id: string, data: Social): Promise<UpdateResult>;
  deleteMany(ids: string[]): Promise<DeleteResult>;
}
