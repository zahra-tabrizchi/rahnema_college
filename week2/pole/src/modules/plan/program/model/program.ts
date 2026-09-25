import { NonEmptyString } from "../../../../data/non-empty-string";
import { PlanId } from "../../model/plan-id";
import { UserId } from "../../../user/model/user-id";
import { ProgramId } from "./program-id";

export interface Program {
  id: ProgramId;
  planId: PlanId;
  title: NonEmptyString;
  description: string;
  userId: UserId;
}
