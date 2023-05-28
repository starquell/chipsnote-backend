import { auth } from 'express-oauth2-jwt-bearer'
import * as e from 'express'
import { ApiError } from '../utils/api-error';

export const jwtCheck = auth({
    audience: [    /// @todo investigate how to get normal audience on web side
        "r75VwjagN2oAW9nBtGeAMiwsBThj2Y2A",   /// web app client id
        "https://chipsnote-main.up.railway.app"   /// id of this service
    ]
});

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