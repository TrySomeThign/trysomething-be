import { AppDataSource } from "./data-source";

interface IDatabase {
  setup(): Promise<any>;
}

class Database implements IDatabase {
  async setup(): Promise<any> {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.log(`Connect to database fail`, error);
    }
  }
  
}
export default new Database();
