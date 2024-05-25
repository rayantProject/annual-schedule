import { Router } from 'express';
import {
    createSchedule,
    deleteSchedule,
    getSchedule,
    getScheduleById,
    updateSchedule,
    getAllCategories,
} from 'src/controllers/schedule';

export default class ScheduleRouter {
    private router: Router;
    private path = '/';

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get(this.path, getSchedule);
        this.router.post(this.path, createSchedule);
        this.router.get(`${this.path}:id`, getScheduleById);
        this.router.put(`${this.path}:id`, updateSchedule);
        this.router.delete(`${this.path}:id`, deleteSchedule);
        this.router.get(`${this.path}categories`, getAllCategories);
    }

    public getRouter() {
        return this.router;
    }
}
