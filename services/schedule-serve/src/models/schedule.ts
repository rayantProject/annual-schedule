// models/schedule.ts
import { Schema, model, Document } from 'mongoose';

import { ScheduleEvent } from '@schedulelib/event';

export interface ScheduleDocument extends Document, Omit<ScheduleEvent, 'id'> {}

const scheduleSchema = new Schema<ScheduleDocument>({
    begin: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
});

export const Schedule = model<ScheduleDocument>('Schedule', scheduleSchema);
