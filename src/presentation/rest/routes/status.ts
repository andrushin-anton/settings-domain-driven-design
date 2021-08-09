import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/status', (_req: Request, res: Response) => {
    res.status(201).json({
        status: 'ok',
    });
});

export { router as statusRouter };
