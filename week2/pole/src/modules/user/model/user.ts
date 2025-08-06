type UserRole = "Admin" | "Representative" | "Normal"

export interface User {
    id: string,
    username: string,
    password: string,
    role: UserRole, 
}