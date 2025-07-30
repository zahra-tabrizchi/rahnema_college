import { users } from "../../routes/user.route"
import { HttpError } from "../../utility/http-error";
import { LoginDto } from "./dto/login.dto";

export const login = (dto: LoginDto) => {
    const user = users.find((x) => x.username === dto.username && x.password=== dto.password)
    if ( user === undefined) {
        throw new HttpError(401, "Invalid username or password")
    }

    return user

}