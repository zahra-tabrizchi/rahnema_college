import { Program } from "../program/model/program";

export interface Plan {
    id: number,
    title: string,
    description : string,
    deadLine: Date,
    programs: Program[]
}