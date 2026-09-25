import { Brand } from "../../../../utility/brand";
import { z } from "zod";

export type ProgramId = Brand<number, "ProgramId">;

export const isProgramId = (value: number): value is ProgramId =>
  Number.isInteger(value) && value > 0;

export const zodProgramId = z.coerce.number().refine(isProgramId);
