import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { ScheduleEvent } from '@schedulelib/event';
import { createEvent, updateEvent, getAllCategories, getAllEvents } from '@/services/sever';
import { useRouter } from 'next/router';
import Autocomplete from '@mui/material/Autocomplete';

export type EventForm = {
    begin: Dayjs;
    end: Dayjs;
    title: string;
    description: string;
    color: string;
    category: string;
};

export default function AddForm(props: { eventEdit?: ScheduleEvent; id?: string }) {
    const { eventEdit, id } = props;
    const router = useRouter();
    const [event, setEvent] = useState<EventForm>({
        begin: eventEdit ? dayjs(eventEdit.begin) : dayjs(),
        end: eventEdit ? dayjs(eventEdit.end) : dayjs(),
        title: eventEdit ? eventEdit.title : '',
        description: eventEdit ? eventEdit.description : '',
        color: eventEdit ? eventEdit.color : '#000000',
        category: eventEdit ? eventEdit.category : 'default',
    });

    const [categories, setCategories] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (name: keyof ScheduleEvent) => (date: Dayjs | null) => {
        setEvent({
            ...event,
            [name]: date || dayjs(),
        });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const events = await getAllEvents();
            setCategories(events.map((event: ScheduleEvent) => event.category));
        };
        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        if (eventEdit) {
            await updateEvent(id ? id : '', {
                begin: event.begin.toDate(),
                end: event.end.toDate(),
                title: event.title,
                description: event.description,
                category: eventEdit.category,
                color: event.color,
            });
        } else {
            await createEvent({
                begin: event.begin.toDate(),
                end: event.end.toDate(),
                title: event.title,
                description: event.description,
                category: 'default',
                color: event.color,
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    router.push('/');
                }}
                sx={{ padding: 2, maxWidth: '90%', margin: 'auto' }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <DateTimePicker
                            label="Debut"
                            value={event.begin}
                            onChange={handleDateChange('begin')}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateTimePicker
                            label="Fin"
                            value={event.end}
                            onChange={handleDateChange('end')}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            name="title"
                            label="Titre"
                            value={event.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                            value={event.description}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="color"
                            name="color"
                            label="Couleur"
                            type="color"
                            value={event.color}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="category"
                            name="category"
                            label="Categorie"
                            value={event.category}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Creer evenement
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}
