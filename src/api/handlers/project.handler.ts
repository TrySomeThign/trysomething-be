import cloudinary from "cloudinary";
import { Project, Social } from "../../database/entities";
import { IFilterGetAllProjects } from "../../database/repositories/interfaces/projectRepository.interface";
import projectRepository from "../../database/repositories/project.repository";
import IProjectHandler, { IDataNewProject } from "./interfaces/projectHandler.interface";
import userRepository from "../../database/repositories/user.repository";
import categoryProjectRepository from "../../database/repositories/categoryProjectRepository";
import socialRepository from "../../database/repositories/socialRepository";
import { DeleteResult, UpdateResult } from "typeorm";

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
      const author = await userRepository.getById(authorId);
      if (!author) {
        throw new Error(`User doesn't exist`);
      }

      const category = await categoryProjectRepository.getById(data.category.id);

      const socials = [];
      if (data.socials.length > 0) {
        for (const social of data.socials) {
          const newSocial = await socialRepository.create({
            title: social.title,
            author: author,
            url: social.url,
          } as Social);
          socials.push(newSocial);
        }
      }
      const newProject = await projectRepository.create({
        ...data,
        author: author,
        category: category,
        socials: socials,
      });
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
  async update(id: string, data: Project): Promise<UpdateResult> {
    try {
      const project = await projectRepository.getById(id);

      if (!project) {
        throw new Error(`Project doesn't exist`);
      }

      if (data.image) {
        const result = await projectRepository.update(project.id, {
          image: data.image,
        } as Project);

        return result;
      } else {
        const category = await categoryProjectRepository.getById(data.category.id);

        // update socials
        if (data.socials.length > 0) {
          for (const social of data.socials) {
            const project = await projectRepository.getById(id);
            // If exist social will update
            if (social.id) {
              await socialRepository.update(social.id, {
                title: social.title,
                author: project.author,
                project: project,
                url: social.url,
              } as Social);
            } else {
              // Create if doesn't exist
              await socialRepository.create({
                title: social.title,
                author: project.author,
                project: project,
                url: social.url,
              } as Social);
            }
          }
        }

        // Update project
        const { title, description, image, technologies } = data;
        const result = await projectRepository.update(project.id, {
          title,
          description,
          image,
          technologies,
          category,
        } as Project);

        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  async archive(id: string): Promise<UpdateResult> {
    try {
      const project = await projectRepository.getById(id);
      if (!project) {
        throw new Error(`Project doesn't exist`);
      }
      const result = await projectRepository.archive(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async recover(id: string): Promise<UpdateResult> {
    try {
      const project = await projectRepository.getById(id);
      if (!project) {
        throw new Error(`Project doesn't exist`);
      }
      const result = await projectRepository.recover(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const project = await projectRepository.getById(id);
      if (!project) {
        throw new Error(`Project doesn't exist`);
      }
      const result = await projectRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectHandler();
