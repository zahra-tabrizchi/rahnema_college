import request from "supertest"
import { app } from "../src/api"
import { title } from "process"
import { loginAdminTest, loginRepTest } from "./utility";


describe("Plan", () => {

    describe("create", () => {
        it("should fail if we do not log in",  async() => {
            await request(app).post("/plan").expect(401)
        })

        it("should fail if user is not admin", async() => {
            const user = await loginRepTest();
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))
            const { body: plan } = await request(app)
            .post("/plan")
            .set({authorization : user.id})
            .send({
                title: "local Host",
                description: "there is no place like",
                deadline: tomorrow
            })
            .expect(403)
        })

        it("should create a plan if we are logged in", async() => {
            const user  = await loginAdminTest();
            
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))

            const { body: plan } = await request(app)
            .post("/plan")
            .set({authorization : user.id})
            .send({
                title: "local host",
                description: "there is no place like",
                deadline: tomorrow
            })
            .expect(200)
            console.log("Returned plan:", plan);

            expect(plan.title).toBe("local host")
        })

        it("should send bad request if title is not provided", async() => {
            const user  = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))

            await request(app)
            .post("/plan")
            .set({authorization : user.id})
            .send({
                title: "",
                description: "there is no place like",
                deadline: tomorrow
            })
            .expect(400)
        })
    })

    describe("Read", () => {
        it("should read the plan", async() => {
            const user = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))

            const {body: plan} = await request(app)
            .post("/plan")
            .set({authorization : user.id})
            .send({
                title: "local host",
                description: "there is no place like",
                deadline: tomorrow
            })
            .expect(200)

            const { body: resultPlan} = await request(app)
            .get("/plan/" + plan.id)
            .expect(200);

            expect(resultPlan.title).toBe("local host")

        })
    })
})