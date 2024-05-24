import Chip from '@mui/material/Chip';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ScheduleEvent } from '@schedulelib/event';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import RowDialog from './RowDialog';

interface Row {
    id: number;
    dayOfWeek: string;
    day: number;
    event: string | null;
}

export default function MonthDatagrid(props: { events: ScheduleEvent[]; month: number; year: number }) {
    const [dialogEvent, setDialogEvent] = useState<ScheduleEvent | null>(null);
    const [open, setOpen] = useState(false);
    const { events, month, year } = props;
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
            field: 'event',
            renderCell: (params) => {
                return params.value ? <Chip label={params.value} style={{ backgroundColor: params.value }} /> : null;
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
            const event = events.find((event) => day.isSame(event.begin, 'day'));
            return {
                id: day.date(),
                dayOfWeek: day.format('ddd'),
                day: day.date(),
                event: event ? event.color : null,
            };
        });
    }, [events, month, year]);

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
                onRowSelectionModelChange={(selection) => {
                    if (selection.length === 1) {
                        const selectedRow = rows.find((row) => row.id === selection[0]);
                        if (selectedRow && selectedRow.event) {
                            const event = events.find((event) => dayjs(event.begin).date() === selectedRow.day);
                            if (event) {
                                setDialogEvent(event);
                            }
                        }
                        setOpen(true);
                    }
                    console.log(selection);
                    console.log(dialogEvent);
                }}
                rowSelectionModel={rows.filter((row) => row.event).map((row) => row.id)}
            />

            <RowDialog open={open} onClose={() => setOpen(false)} schEvent={dialogEvent} />
        </Grid>
    );
}
