import { CreateGroupDto } from "./dto/create-group.dto";
import { groups } from "../../routes/group.route";

export const createGroup = (dto: CreateGroupDto) => {
    const group = {
        id : groups.length+1, 
        name : dto.name || "",
        memberIds : dto.memberIds

    }
    groups.push(group)
    return group
}