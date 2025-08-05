import { expenses } from "../../routes/expense.route";
import { groups } from "../../routes/group.route";
import { HttpError, NotFoundError } from "../../utility/http-errors";
import { createExpense } from "./create-expense";

describe("Create Expense", () => {
  it("should create an expense successfully", () => {
    groups.push({
      id: 1,
      name: "Trip to Rasht",
      memberIds: [1, 2],
    });

    const dto = {
      description: "Lunch",
      groupId: 1,
      userId: 1,
      amount: 500,
    };

    const expense = createExpense(dto);
    expect(expenses[0]).toEqual(expense);
  });

  it("should throw NotFoundError if group does not exist", () => {
    const dto = {
      description: "Hotel",
      groupId: 999, // non-existing group
      userId: 1,
      amount: 100,
    };

    expect(() => createExpense(dto)).toThrow(NotFoundError);
  });

  it("should throw http error if the user is not in the group", () => {
    const dto = {
      description: "Taxi",
      groupId: 1,
      userId: 999, // not in group
      amount: 300,
    };

    expect(() => createExpense(dto)).toThrow(HttpError)
  })


});


