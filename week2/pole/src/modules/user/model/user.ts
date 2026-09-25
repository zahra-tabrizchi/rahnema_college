import { UserId } from "./user-id";

export type UserRole = "Admin" | "Representative" | "Normal";

export interface User {
  id: UserId;
  username: string;
  password: string;
  role: UserRole;
}
