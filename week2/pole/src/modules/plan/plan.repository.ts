import { Program } from "./program/model/program";
import { Plan } from "./model/plan";

export interface CreatePlan {
    title: string,
    description : string,
    deadLine: Date,
    programs: Program[]
}

export interface CreateProgram {
    title : string,
    description : string,
    userId : string
}

export class PlanRepository {
    private plans: Plan[] = []

    private getNextId() {
        return this.plans.length +1
    }

    public create(plan: CreatePlan) {
        const createdPlan = {...plan, id: this.getNextId()}
        this.plans.push(createdPlan)
        return createdPlan
    }

    public findById(id: number) {
        return this.plans.find((plan) => plan.id ===id )
    }

    public addProgram(plan: Plan, program: CreateProgram) {
        const savedProgram = {
            id: plan.programs.length +1,
            title: program.title,
            description: program.description,
            userId: program.userId,
            planId: plan.id,
        }
        plan.programs.push(savedProgram)
        return savedProgram
    }

}