import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Files } from "./Files";

export enum Roles {
  Admin = "Admin",
  Moderator = 'Moderator',
  User = "User",
}

export interface IUser {
  id: number;
  email: string;
  companyName: string | undefined;
  role: string;
  username: string | undefined;
  password: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column({ nullable: true })
  public refreshToken!: string;


  @OneToMany(() => Files, files => files.user)
  public files!: File[];
}
