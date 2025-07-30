import { ForbiddenError, HttpError, NotFoundError } from "../../utility/http-error";
import { canCreateProgram, createProgram } from "./create-program";

describe("Create Program", () => {
    it("should not create program if user is not representative", () => {
        expect(() => {
            canCreateProgram(
                { 
                    username: "foo", 
                    password: "bar", 
                    id: "jhgfgh", 
                    role: "Normal" },
                {
                    id: 1,
                    title: "local Host",
                    programs: [],
                    description : "", 
                    deadLine : new Date()
                }
            );
        }).toThrow(ForbiddenError);
    })

    it("should not create a program if user already have one", () => {
        expect(
            canCreateProgram(
                { 
                    username: "foo", 
                    password: "bar", 
                    id: "1", 
                    role: "Representative" },
                    {
                    id: 1,
                    title: "local Host",
                    programs: [{id: 1, title: "foo", description: "", userId: "1", planId:1 }],
                    description : "", 
                    deadLine : new Date()
                }
            )
        ).toBe(false)
    })

    it("should not create programm if plan deadline exceed from today", () => {
        const today = new Date()
        const yesterday = new Date(today.setDate(today.getDate()-1))
        expect(
            canCreateProgram(
                { 
                    username: "foo", 
                    password: "bar", 
                    id: "1", 
                    role: "Representative" },
                    {
                    id: 1,
                    title: "local Host",
                    programs: [],
                    description : "", 
                    deadLine : yesterday
                }
            )
        ).toBe(false)
    })

    it("should return true", () => {
        const today = new Date()
        const tomorrow = new Date(today.setDate(today.getDate()+1))
        expect(
            canCreateProgram(
                { 
                    username: "foo", 
                    password: "bar", 
                    id: "1", 
                    role: "Representative" },
                    {
                    id: 1,
                    title: "local Host",
                    programs: [],
                    description : "", 
                    deadLine : tomorrow
                }
            )
        ).toBe(true)
    })
})

   
        