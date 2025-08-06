import { HttpError } from "../../utility/http-error";
import { LoginDto } from "./dto/login.dto";
import { UserRepository } from "./user.repository";

export class UserService {
    private userRepo : UserRepository

    constructor() {
        this.userRepo = new UserRepository()
    }

    loginUserBy(dto: LoginDto) {
        const loggedInUser = this.userRepo.userLogin(dto.username, dto.password)
        if ( loggedInUser === undefined) {
            throw new HttpError(401, "Invalid username or password")
        }

        return loggedInUser
    }

    getUserById(id: string) {
    const user = this.userRepo.findById(id);
    if (!user) {
        throw new HttpError(401, "Unauthorized");
    }
    return user;
}
}