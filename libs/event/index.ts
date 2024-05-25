export enum ScheduleEventRecurrence {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}
export type ScheduleEvent = {
    id: string;
    begin: Date;
    end: Date;
    title: string;
    description: string;
    color: string;
    category: string;
    recurrence?: ScheduleEventRecurrence;
};
