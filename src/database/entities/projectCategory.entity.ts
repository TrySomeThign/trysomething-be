import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Project } from "./project.entity";

@Entity({ name: "project_categories" })
export class ProjectCategory extends BaseEntity {
  @Column({ default: null })
  title: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  icon: string;

  @OneToMany(() => Project, (project) => project.category)
  projects: Project[];
}
