import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Social } from "./social.entity";
import { ProjectCategory } from "./projectCategory.entity";

@Entity({ name: "projects" })
export class Project extends BaseEntity {
  @Column({ default: null })
  title: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  image: string;

  @Column({ type: "simple-json", default: null })
  technologies: string[];

  @ManyToOne(() => User, (user) => user.projects, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author: User;

  @OneToMany(() => Social, (social) => social.project)
  socials: Social[];

  @ManyToOne(() => ProjectCategory, (category) => category.projects, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  category: ProjectCategory;
}
