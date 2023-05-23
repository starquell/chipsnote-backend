import { auth } from 'express-oauth2-jwt-bearer'
import * as e from 'express'
import { ApiError } from '../utils/api-error';

export const jwtCheck = auth();

export function extractUserData(req: e.Request, res: e.Response, next: e.NextFunction) {
    if (req.auth === undefined) {
        throw new ApiError(500, "extractUserData: no req.auth");
    }
    if (!req.auth.payload.sub) {
        throw new ApiError(500, "extractUserData: no sub");
    }
    req.user_id = req.auth.payload.sub
    return next()
}