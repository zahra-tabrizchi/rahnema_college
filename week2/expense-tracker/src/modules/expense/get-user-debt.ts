import { expenses } from "../../routes/expense.route";
import { groups } from "../../routes/group.route";

export const getUserDebts = (userId: number) => {
  const groupsIn = groups
    .filter((g) => g.memberIds.includes(userId))

    const groupIds = groupsIn.map((g) => g.id)

    const expensesFor = expenses.filter((e) => groupIds.includes(e.groupId));
    
    const totalSpentOnUser = expensesFor.reduce((sum, expense) => {
    const group = groupsIn.find((g) => g.id === expense.groupId);
    if (!group) return sum;
    const share = expense.amount / group.memberIds.length;

    return sum + share
  }, 0);

  return totalSpentOnUser;
};