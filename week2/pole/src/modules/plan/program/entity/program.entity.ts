import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PlanEntity } from "../../entity/plan.entity";
import { UserEntity } from "../../../user/entity/user.entity";
import { NonEmptyString } from "../../../../data/non-empty-string";
import { PlanId } from "../../model/plan-id";
import { ProgramId } from "../model/program-id";
import { UserId } from "../../../user/model/user-id";

@Entity("programs")
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id!: ProgramId;

  @Column()
  title!: NonEmptyString;

  @Column()
  description!: string;

  @Column()
  userId!: UserId;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column()
  planId!: PlanId;

  @ManyToOne(() => PlanEntity)
  plan!: PlanEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
