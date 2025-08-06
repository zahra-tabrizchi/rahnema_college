import request from "supertest";
import { app } from "../src/api"
import { loginAdminTest, loginRepTest } from "./utility";

describe("Program", () => {
    
    describe("Create", () => {
        it("Should fail if we did not login", async() => {
            const AdminUser = await loginAdminTest()

            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))
            const {body: plan} = await request(app)
            .post("/plan")
            .set({"authorization" : AdminUser.id})
            .send({
                title: "local Host",
                description: "there is no place like",
                deadline: tomorrow
            })
            .expect(200)
            await request(app).post(`/plan/${plan.id}/program`).expect(401);
        })

        it("Should create a program", async()=> {
            const AdminUser = await loginAdminTest()
            const RepUser = await loginRepTest()
            
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))
            const {body: plan} = await request(app)
            .post("/plan")
            .set({"authorization" : AdminUser.id})
            .send({
                title: "local Host",
                description: "there is no place like",
                deadline: tomorrow
            })
            .expect(200)

            const {body: program} = await request(app)
            .post(`/plan/${plan.id}/program`)
            .set({authorization : RepUser.id})
            .send({
                planId: plan.id,
                title: "love localhost",
                description: "it's a safe place"
            })
            .expect(200); 

        })

        it.skip("Should fail if deadline is exceeded", async() => {
            const user = await loginAdminTest()
            
            const today = new Date()
            const yesterday = new Date(today.setDate(today.getDate()-1))
            const {body: plan} = await request(app)
            .post("/plan")
            .set({"authorization" : user.id})
            .send({
                title: "127.0.0.1",
                description: "there is no place like",
                deadLine: yesterday
            })
            .expect(200)

            const {body: program} = await request(app)
            .post(`/plan/${plan.id}/program`)
            .set({authorization : user.id})
            .send({
                planId: plan.id,
                title: "love localhost",
                description: "it's a safe place"
            })
            .expect(400);          
        })
    })
})