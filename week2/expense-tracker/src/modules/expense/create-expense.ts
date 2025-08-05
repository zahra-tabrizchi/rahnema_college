import { expenses } from "../../routes/expense.route";
import { groups } from "../../routes/group.route";
import { HttpError, NotFoundError } from "../../utility/http-errors";
import { CraeteExpenseDto } from "./dto/create-expense.dto";

export const createExpense = (dto: CraeteExpenseDto) => {
    const group = groups.find((x) => x.id === dto.groupId)

    if(!group) {
        throw new NotFoundError()
    }

    if (!group.memberIds.includes(dto.userId)) {
    throw new HttpError(400, "User is not a member of this group");
    }

    const expense = {
        id : expenses.length +1,
        description : dto.description,
        groupId : dto.groupId,
        userId : dto.userId,
        amount : dto.amount
    }
    expenses.push(expense);

    return expense;
}