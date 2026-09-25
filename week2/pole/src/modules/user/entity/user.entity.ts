import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../model/user";
import { UserId } from "../model/user-id";

@Entity("users")
export class UserEntity {
  @PrimaryColumn()
  id!: UserId;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedT!: Date;
}
