import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export type ScheduleEvent = {
    id: string;
    begin: Dayjs;
    end: Dayjs;
    title: string;
    description: string;
    color: string;
};

export default function AddForm() {
    const [event, setEvent] = useState<ScheduleEvent>({
        id: '',
        begin: dayjs(),
        end: dayjs(),
        title: '',
        description: '',
        color: '#000000',
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Event Submitted:', event);
        // Ajouter ici la logique pour soumettre l'événement
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2, maxWidth: '90%', margin: 'auto' }}>
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
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Creer evenement
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}
