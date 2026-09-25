import { Brand } from "../utility/brand";
import { validate } from "uuid";
import { z } from "zod";
import { UUID as cryptoUUID } from "crypto";

export type UUID = Brand<cryptoUUID, "UUID">;

export const isUUID = (value: string): value is UUID => validate(value);

export const zodUUID = z.string().refine(isUUID);
