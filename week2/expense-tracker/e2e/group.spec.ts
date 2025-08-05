import request from "supertest"
import { app } from "../src/api"

describe("Group", () => {
    describe("Create", () => {
        it("should create a plan", async() => {
            const {body : group} = await request(app)
            .post("/group")
            .send({
                    name : "zar",
                    memberIds : [1, 2 ,4],
                })
                .expect(200)
                console.log("returned group", group)
        })
    })
})