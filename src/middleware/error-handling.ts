import { ZodError } from "zod"
import { ApiError } from "../utils/api-error"
import { DatabaseError } from "pg"

export default function handleErrors(err: any, req: any, res: any, next: any) {
    if ((err instanceof ApiError)) {
        console.log(err)
        res.status(err.httpCode)
        res.send({"errors": [err.message]})
    }
    else if (err instanceof ZodError) {
        res.status(400)
        res.send({"errors": err.issues})
    }
    else if (err instanceof DatabaseError) {
        console.log(err)
        res.status(500).send()
    }
    else {
        console.log(err)
        res.status(err.status || 500)
        res.send({"errors": [err.message]})
    }
}