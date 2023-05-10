/* eslint-disable @typescript-eslint/no-namespace */
// declare module 'express-serve-static-core' {
//     interface Request {
//         user_id?: string
//     }
// }

export {}

declare global {
    namespace Express {
        export interface Request {
            user_id: string
        }
    }
}