import { Request, Response } from 'express';
import { ScheduleEvent } from '@schedulelib/event';
import { Schedule } from '../models/schedule';

const getSchedule = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.find().lean();
        res.status(200).json(schedule);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const createSchedule = async (req: Request, res: Response) => {
    try {
        const newEvent: Omit<ScheduleEvent, 'id'> = req.body;
        const schedule = new Schedule(newEvent);
        await schedule.save();

        res.status(201).json(schedule);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getScheduleById = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.findById(req.params.id).lean();
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error: any) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

const updateSchedule = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id).lean();
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Schedule.distinct('category');
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { getSchedule, createSchedule, getScheduleById, updateSchedule, deleteSchedule, getAllCategories };
