import express from 'express'

import { SinksService } from '../services';
import { PostSinkSchema, PostPrimarySinkSchema } from '../zod-schemas/add-sink';
import { ApiError } from '../utils/api-error';

const sinksRouter = express.Router()

sinksRouter.get("/", async (req, res) => {
    const r = await new SinksService().getSinks(req.user_id)
    res.send(r)
});

sinksRouter.post("/", async (req, res) => {
    const parsed = await PostSinkSchema.safeParseAsync(req.body);
    if (!parsed.success) {
        res.status(400).send(parsed.error.flatten())
        return;
    }
    const r = await new SinksService().createSink(req.user_id, req.body)
    res.json({ sink_id: r})
});

sinksRouter.get("/primary", async (req, res) => {
    const result = await new SinksService().getPrimarySink(req.user_id)
    if (result === undefined) {
        res.status(404).send();
        return;
    }
    res.status(200).send(result)
});

sinksRouter.post("/primary", async (req, res) => {
    const parsed = await PostPrimarySinkSchema.parseAsync(req.body);
    await new SinksService().changePrimarySink(req.user_id, parsed.sink_id)
    res.status(200).send()
});

export default sinksRouter;