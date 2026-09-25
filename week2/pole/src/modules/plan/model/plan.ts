import { NonEmptyString } from "../../../data/non-empty-string";
import { Program } from "../program/model/program";

export interface Plan {
  id: number;
  title: NonEmptyString;
  description: string;
  deadline: Date;
  programs: Program[];
}
