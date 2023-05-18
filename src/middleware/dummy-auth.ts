import * as e from 'express'
import { ApiError } from '../utils/api-error'
import { StatusCode } from "status-code-enum"

export default function auth(req: e.Request, res: e.Response, next: e.NextFunction) {
    const authHeader = req.headers['authorization']
    if (authHeader === undefined || authHeader !== 'Bearer cyrone') {
        throw new ApiError(StatusCode.ClientErrorUnauthorized, "Unauthorized");
    }
    req.user_id = 'cyrone'
    return next()
}
