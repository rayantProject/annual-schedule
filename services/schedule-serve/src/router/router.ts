import ScheduleRouter from './schedule';
import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

router.use('/events', new ScheduleRouter().getRouter());
router.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

export default router;
