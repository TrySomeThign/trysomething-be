import { Repository } from "typeorm";
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
}

export default new SocialRepository();
