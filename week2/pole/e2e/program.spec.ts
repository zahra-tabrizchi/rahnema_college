import request from "supertest";
import { Express } from "express";
import { loginAdminTest, loginRepTest } from "./utility";
import { AppDataSource } from "../src/data-source";
import { makeApp } from "../src/api";

describe("Program", () => {
    let app : Express
    beforeAll(async() => {
        const dataSource = await AppDataSource.initialize()
        app = makeApp(dataSource)
    })

    afterAll(async() => {
        await AppDataSource.destroy()
    })

    describe("Create", () => {
        it("Should fail if we did not login", async() => {
            const AdminUser = await loginAdminTest(app)

            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))
            const {body: plan} = await request(app)
            .post("/plan")
            .set({"authorization" : AdminUser.id})
            .send({
                title: "local Host",
                description: "there is no place like",
                deadline: tomorrow.toISOString()
            })
            .expect(200)
            await request(app).post(`/plan/${plan.id}/program`).expect(401);
        })

        it("Should create a program", async()=> {
            const AdminUser = await loginAdminTest(app)
            const RepUser = await loginRepTest(app)
            
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate()+1))
            const {body: plan} = await request(app)
            .post("/plan")
            .set({"authorization" : AdminUser.id})
            .send({
                title: "local Host",
                description: "there is no place like",
                deadline: tomorrow.toISOString()
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
            const user = await loginAdminTest(app)
            
            const today = new Date()
            const yesterday = new Date(today.setDate(today.getDate()-1))
            const {body: plan} = await request(app)
            .post("/plan")
            .set({"authorization" : user.id})
            .send({
                title: "127.0.0.1",
                description: "there is no place like",
                deadLine: yesterday.toISOString()
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