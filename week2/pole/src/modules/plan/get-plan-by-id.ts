import { Plan, plans } from "../../routes/plan.route"
import { HttpError } from "../../utility/http-error"

export const getPlanById = (id: number): Plan => {
    const plan = plans.find( (plan) => plan.id ===id )
    if (plan === undefined) {
        throw new HttpError(400, "Plan Not Found")
    }

    return plan
}
