import Chip from '@mui/material/Chip';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ScheduleEvent } from '@schedulelib/event';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import RowDialog from './RowDialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
interface Row {
    id: number;
    dayOfWeek: string;
    day: number;
    events: ScheduleEvent[];
}

export default function MonthDatagrid(props: { monthEvents: ScheduleEvent[]; month: number; year: number }) {
    const [dialogEvents, setDialogEvents] = useState<ScheduleEvent[] | null>(null);
    const [open, setOpen] = useState(false);
    const { monthEvents, month, year } = props;
    const columns: GridColDef[] = [
        {
            field: 'dayOfWeek',
            headerName: '',
            type: 'string',
            width: 50,
        },
        {
            field: 'day',
            type: 'number',
            width: 50,
            minWidth: 20,
        },
        {
            field: 'events',
            renderCell: (params) => {
                return params.value ? (
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 0, margin: 0 }}>
                        {params.value.map((event: ScheduleEvent) => (
                            <Chip
                                key={event.id}
                                sx={{ backgroundColor: event.color, mx: 0.1, height: 20, borderRadius: 0 }}
                            />
                        ))}
                    </div>
                ) : null;
            },
        },
    ];

    function getDaysInMonth(year: number, month: number): dayjs.Dayjs[] {
        const days: dayjs.Dayjs[] = [];
        const date = dayjs(new Date(year, month, 1));
        const endOfMonth = date.endOf('month');

        let current = date.startOf('month');
        while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, 'day')) {
            days.push(current);
            current = current.add(1, 'day');
        }

        return days;
    }

    const rows: Row[] = useMemo(() => {
        const days = getDaysInMonth(year, month);
        return days.map((day) => {
            const events = monthEvents
                ? monthEvents.filter((event) => {
                      const begin = dayjs(event.begin);
                      return begin.isSame(day, 'day');
                  })
                : [];
            return {
                id: day.date(),
                dayOfWeek: day.format('ddd'),
                day: day.date(),
                events,
            };
        });
    }, [monthEvents, month, year]);

    return (
        <Grid item xs={1}>
            <Typography variant="h6">{dayjs(new Date(year, month, 1)).format('MMMM')}</Typography>
            <DataGrid
                rowHeight={30}
                autoHeight
                hideFooter
                columns={columns}
                rows={rows}
                // hideFooterSelectedRowCount
                hideFooterPagination
                density="compact"
                onRowClick={(params) => {
                    if (params.row.events.length > 0) {
                        setDialogEvents(params.row.events);
                        setOpen(true);
                    }
                }}
            />

            {/* <RowDialog open={open} onClose={() => setOpen(false)} schEvents={dialogEvents} /> */}
        </Grid>
    );
}
