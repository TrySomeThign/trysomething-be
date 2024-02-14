import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Social } from "../entities";
import { AppDataSource } from "../data-source";
import ISocialRepository from "./interfaces/socialRepository.interface";

class SocialRepository implements ISocialRepository {
  repo: Repository<Social>;
  constructor() {
    this.repo = AppDataSource.getRepository(Social);
  }

  async create(data: Social): Promise<Social> {
    return this.repo.save(data);
  }
  async update(id: string, data: Social): Promise<UpdateResult> {
    return this.repo.update(id, data);
  }
  async deleteMany(ids: string[]): Promise<DeleteResult> {
    return this.repo.delete(ids);
  }
}

export default new SocialRepository();
