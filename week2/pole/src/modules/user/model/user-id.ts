import { Brand } from "../../../utility/brand";
import { isUUID } from "../../../data/uuid";
import { z } from "zod";
import { v4 } from "uuid";

export type UserId = Brand<string, "UserId">;

export const isUserId = (value: string): value is UserId => isUUID(value);

export const zodUserId = z
  .string()
  .refine(isUserId)
  .transform((value) => value as UserId);

export const makeUserId = () => v4() as UserId;
