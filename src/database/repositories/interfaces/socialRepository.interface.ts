import { Social } from "../..//entities";

export default interface ISocialRepository {
  create(data: Social): Promise<Social>;
}
