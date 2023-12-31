import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Social } from "./social.entity";
import { Project } from "./project.entity";
import { Skill } from "./skill.entity";
import { EUserRole } from "../interfaces";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ name: "name", default: null })
  name: string;

  @Column({ name: "display_name", default: null })
  displayName: string;

  @Column({ name: "avatar", default: null })
  avatar: string;

  @Column({ default: null, unique: true })
  email: string;

  @Column({ default: null, select: false })
  password: string;

  @Column({ type: "enum", enum: EUserRole, default: EUserRole.User })
  role: EUserRole;

  @Column({ name: "job_title", default: null })
  jobTitle: string;

  @Column({ default: null })
  introduction: string;

  @OneToMany(() => Social, (social) => social.author)
  socials: Social[];

  @OneToMany(() => Project, (project) => project.author)
  projects: Project[];

  @OneToMany(() => Skill, (skill) => skill.author)
  skills: Skill[];
}
