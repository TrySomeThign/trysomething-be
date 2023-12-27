import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Project } from "./project.entity";
import { ETypeCategory } from "../interfaces";

@Entity({ name: "project_categories" })
export class ProjectCategory extends BaseEntity {
  @Column({ default: ETypeCategory.Web, type: "enum", enum: ETypeCategory })
  type: ETypeCategory;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  icon: string;

  @OneToMany(() => Project, (project) => project.category)
  projects: Project[];
}
