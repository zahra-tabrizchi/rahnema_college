import { Program } from "./program/model/program";
import { Plan } from "./model/plan";
import { PlanEntity } from "./entity/plan.entity";
import { DataSource, Repository } from "typeorm";
import { NonEmptyString } from "../../data/non-empty-string";
import { PlanId } from "./model/plan-id";
import { UserId } from "../user/model/user-id";

export interface IPlanRepository {
  create(plan: CreatePlan): Promise<Plan>;
  findById(id: PlanId): Promise<Plan | null>;
  addProgram(plan: Plan, program: CreateProgram): Promise<Plan>;
}

export interface CreatePlan {
  title: NonEmptyString;
  description: string;
  deadline: Date;
  programs: Program[];
}

export interface CreateProgram {
  title: NonEmptyString;
  description: string;
  userId: UserId;
}

export class PlanRepository implements IPlanRepository {
  private planRepo: Repository<PlanEntity>;

  constructor(AppDataSource: DataSource) {
    this.planRepo = AppDataSource.getRepository(PlanEntity);
  }

  public create(plan: CreatePlan): Promise<Plan> {
    return this.planRepo.save(plan);
  }

  public findById(id: PlanId): Promise<Plan | null> {
    return this.planRepo.findOne({ where: { id }, relations: ["programs"] });
  }

  public addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
    return this.planRepo.save({
      ...plan,
      programs: [...plan.programs, program],
    });
  }
}
