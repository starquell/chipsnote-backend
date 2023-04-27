import express from 'express'

import { SinkController } from '../controllers/sink_controller';

const router = express.Router()

router.get("/", async (req, res) => {
    const r = await new SinkController().getSinks(req.user_id)
    res.send(r)
});

export default router;