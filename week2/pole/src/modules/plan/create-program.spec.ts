import { NonEmptyString } from "../../data/non-empty-string";
import { ForbiddenError } from "../../utility/http-error";
import { makeUserId } from "../user/model/user-id";
import { Plan } from "./model/plan";
import { PlanId } from "./model/plan-id";
import { CreatePlan, CreateProgram, IPlanRepository } from "./plan.repository";
import { PlanService } from "./plan.service";
import { ProgramId } from "./program/model/program-id";

class MockPlanRepo implements IPlanRepository {
  create(plan: CreatePlan): Promise<Plan> {
    throw new Error("Method not implemented");
  }
  findById(id: number): Promise<Plan | null> {
    throw new Error("Method not implemented");
  }
  addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
    throw new Error("Method not implemented");
  }
}
describe("Create Program", () => {
  let planService: PlanService;

  beforeEach(() => {
    planService = new PlanService(new MockPlanRepo());
  });

  it("should not create program if user is not representative", () => {
    expect(() => {
      planService.canCreateProgram(
        {
          username: "foo",
          password: "bar",
          id: makeUserId(),
          role: "Normal",
        },
        {
          id: 1,
          title: "local Host" as NonEmptyString,
          programs: [],
          description: "",
          deadline: new Date(),
        }
      );
    }).toThrow(ForbiddenError);
  });

  it("should not create a program if user already have one", () => {
    const userId = makeUserId();
    expect(
      planService.canCreateProgram(
        {
          username: "foo",
          password: "bar",
          id: userId,
          role: "Representative",
        },
        {
          id: 1,
          title: "local Host" as NonEmptyString,
          programs: [
            {
              id: 1 as ProgramId,
              title: "foo" as NonEmptyString,
              description: "",
              userId: userId,
              planId: 1 as PlanId,
            },
          ],
          description: "",
          deadline: new Date(),
        }
      )
    ).toBe(false);
  });

  it("should not create programm if plan deadline exceed from today", () => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    expect(
      planService.canCreateProgram(
        {
          username: "foo",
          password: "bar",
          id: makeUserId(),
          role: "Representative",
        },
        {
          id: 1,
          title: "local Host" as NonEmptyString,
          programs: [],
          description: "",
          deadline: yesterday,
        }
      )
    ).toBe(false);
  });

  it("should return true", () => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    expect(
      planService.canCreateProgram(
        {
          username: "foo",
          password: "bar",
          id: makeUserId(),
          role: "Representative",
        },
        {
          id: 1,
          title: "local Host" as NonEmptyString,
          programs: [],
          description: "",
          deadline: tomorrow,
        }
      )
    ).toBe(true);
  });
});
