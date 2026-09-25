import { User } from "../user/model/user";
import { ForbiddenError, HttpError, NotFoundError } from "../../utility/http-error";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { Plan } from "./model/plan";
import { IPlanRepository } from "./plan.repository";
import { CreateProgramDto } from "./program/dto/create-program.dto";
import { Program } from "./program/model/program";
import { PlanId } from "./model/plan-id";

export class PlanService {
    
    constructor(private planRepo: IPlanRepository) {}

    getPlanById(planId: PlanId) {
        const plan = this.planRepo.findById(planId)
        
            if (plan === undefined) {
                throw new HttpError(400, "Plan Not Found")
            }
        
            return plan
    }

    createPlan(dto: CreatePlanDto, loggedInUser: User): Promise<Plan> {
        const plan = {
        title: dto.title,
        description: dto.description || "",
        deadline: dto.deadline,
        programs: []
        }
        if(dto.deadline.getTime() < new Date().getTime()) {
            throw new HttpError(400, "you should not use a deadline in the past")
        }
    
        if(loggedInUser.role !== "Admin") {
            throw new HttpError(403, "you are not authorized")
        }
        return this.planRepo.create(plan)
        }

    async createProgram(dto: CreateProgramDto, user: User): Promise<Plan> {
        const plan = await this.planRepo.findById(dto.planId)
            if ( !plan ) {
                throw new NotFoundError();
            }
        
            if (this.canCreateProgram(user, plan)) {
                return this.planRepo.addProgram(plan, {
                    title: dto.title,
                    description: dto.description || "",
                    userId : user.id
        
                }
            ) 
            } else {
                throw new HttpError(400, "program is not valid")
            }
    }

    public canCreateProgram(user: User, plan: Plan) {
        if(user.role !== "Representative") {
            throw new ForbiddenError();
        }
    
        const program = plan.programs.find((x) => x.userId === user.id)
        if( program ) {
            return false
        }
    
        if (plan.deadline.getTime() < new Date().getTime()) {
            return false
        }
    
        return true
    
    }
}