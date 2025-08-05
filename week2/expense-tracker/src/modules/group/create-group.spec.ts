import { groups } from "../../routes/group.route";
import { createGroup } from "./create-group"

describe("Create Group",  () => {
    it("should craete a group", () => {
        const group = createGroup(
                {
                    name : "zar",
                    memberIds : [1, 2 ,4],
                }
            )
            expect(groups[0]).toEqual(group);
        })
    })
