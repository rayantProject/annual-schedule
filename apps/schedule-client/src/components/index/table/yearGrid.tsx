import Grid from '@mui/material/Grid';
import MonthDatagrid from '@/components/index/table/monthDatagrid';
import { useEffect, useMemo } from 'react';
import { ScheduleEvent } from '@schedulelib/event';
import dayjs from 'dayjs';
type Month = {
    month: number;
    events: ScheduleEvent[];
};

export default function YearGrid(props: { events: ScheduleEvent[]; year: number }) {
    const { events, year } = props;
    const months: Month[] = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const month = i;
            const monthEvents = events.filter((event) => dayjs(event.begin).month() === i);
            return { month, events: monthEvents };
        });
    }, [events]);

    useEffect(() => {
        console.log(events);
    }, []);
    return (
        <Grid item xs={12} container>
            {months.map((month) => (
                <MonthDatagrid key={month.month} monthEvents={month.events} month={month.month} year={year} />
            ))}
        </Grid>
    );
}
