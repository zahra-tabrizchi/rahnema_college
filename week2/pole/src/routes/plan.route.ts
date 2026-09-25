import { Router, Response, Request } from "express";
import { handleExpress } from "../utility/handle-express";
import { createPlanDto } from "../modules/plan/dto/create-plan.dto";
import z, { ZodError } from "zod";
import { loginMiddleware } from "../utility/login.middleware";
import { createProgramDto } from "../modules/plan/program/dto/create-program.dto";
import { PlanService } from "../modules/plan/plan.service";
import { UserService } from "../modules/user/user.service";
import { zodPlanId } from "../modules/plan/model/plan-id";

export const makePlanRouter = (
  planService: PlanService,
  userService: UserService
) => {
  const app = Router();

  app.post("/", loginMiddleware(userService), (req, res) => {
    const dto = createPlanDto.parse(req.body);
    handleExpress(res, () => planService.createPlan(dto, req.user));
  });

  app.post("/:id/program", loginMiddleware(userService), (req, res) => {
    const dto = createProgramDto.parse({
      ...req.body,
      planId: req.params.id,
    });
    handleExpress(res, () => planService.createProgram(dto, req.user));
  });

  app.get("/:id", (req, res) => {
    const id = zodPlanId.parse(req.params.id);
    handleExpress(res, () => planService.getPlanById(id));
  });
  return app;
};
