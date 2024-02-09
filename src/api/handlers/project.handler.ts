import cloudinary from "cloudinary";
import { Project, Social } from "../../database/entities";
import { IFilterGetAllProjects } from "../../database/repositories/interfaces/projectRepository.interface";
import projectRepository from "../../database/repositories/project.repository";
import IProjectHandler, { IDataNewProject } from "./interfaces/projectHandler.interface";
import userRepository from "../../database/repositories/user.repository";
import categoryProjectRepository from "../../database/repositories/categoryProjectRepository";
import socialRepository from "../../database/repositories/socialRepository";

class ProjectHandler implements IProjectHandler {
  async getAll(filter: IFilterGetAllProjects): Promise<{ projects: Project[]; total: number }> {
    try {
      const [projects, total] = await projectRepository.getAll(filter);
      return { projects, total };
    } catch (error) {
      throw error;
    }
  }
  async create(authorId: string, data: IDataNewProject): Promise<Project> {
    try {
      console.log("data", data);
      const author = await userRepository.getById(authorId);
      if (!author) {
        throw new Error(`User doesn't exist`);
      }

      const category = await categoryProjectRepository.getById(data.category.id);

      const newProject = await projectRepository.create({
        ...data,
        author: author,
        category: category,
      });

      if (data.socials.length > 0) {
        for (const social of data.socials) {
          await socialRepository.create({
            title: social.title,
            author: author,
            project: newProject,
            url: social.url,
          } as Social);
        }
      }
      return newProject;
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(id: string, file: Express.Multer.File): Promise<string> {
    try {
      const project = await projectRepository.getById(id);
      const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
        public_id: `project-image-${project.id}`,
        use_filename: true,
        folder: `tst-portfolio/projects/${project.id}`,
      });

      if (file.mimetype.startsWith("image")) {
        await projectRepository.update(id, {
          image: secure_url,
        } as Project);
        return secure_url;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectHandler();
