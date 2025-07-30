import request from "supertest";
import { app } from "../src/api"

export const loginAdminTest = async() => {
        const { body: user} = await request(app)
            .post('/login')
            .send({username: "admin", password: "admin"})
            .expect(200)
        return user;
    }

export const loginRepTest = async() => {
        const { body: user} = await request(app)
            .post('/login')
            .send({username: "rep", password: "rep"})
            .expect(200)
        return user;
    }