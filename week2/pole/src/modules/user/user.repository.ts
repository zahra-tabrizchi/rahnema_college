import { DataSource, Repository } from "typeorm";
import { User } from "./model/user";
import { UserEntity } from "./entity/user.entity";
import { seedUser } from "../../../seed";
import { UserId } from "./model/user-id";

type UserRole = "Admin" | "Representative" | "Normal";

export interface CreateUser {
  username: string;
  password: string;
  role: UserRole;
}

export class UserRepository {
  private usersRepo: Repository<UserEntity>;
  constructor(AppDataSource: DataSource) {
    this.usersRepo = AppDataSource.getRepository(UserEntity);
    seedUser();
  }

  public findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ username });
  }

  public findById(userId: UserId) {
    return this.usersRepo.findOneBy({ id: userId });
  }
}
