import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({ name: "socials" })
export class Social extends BaseEntity {
  @Column({ default: null })
  title: string;

  @Column({ default: null })
  url: string;

  @ManyToOne(() => User, (user) => user.socials, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author: User;

  @ManyToOne(() => Project, (project) => project.socials, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project: Project;
}
