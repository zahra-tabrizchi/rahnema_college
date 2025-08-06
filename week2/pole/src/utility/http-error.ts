export class HttpError extends Error {
    statusCode(statusCode: any) {
        throw new Error("Method not implemented.")
    }
    constructor(public status:number, message: string){
        super(message)
    }
}

export class ForbiddenError extends HttpError {
    constructor () {
        super(403, "Forbidden")
    }
}

export class NotFoundError extends HttpError {
     constructor () {
        super(403, "Not Found")
    }
}