import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Drawer,
} from '@mui/material';
import { ScheduleEvent } from '@schedulelib/event';
import Autocomplete from '@mui/material/Autocomplete';
type FilterDialogProps = {
    categories: string[];
    open: boolean;
    onClose: () => void;
    onFilter: (filters: Partial<ScheduleEvent>) => void;
};

export default function FilterDrawer(props: FilterDialogProps) {
    const { open, onClose, onFilter, categories } = props;
    const [title, setTitle] = useState('');
    const [begin, setBegin] = useState('');
    const [end, setEnd] = useState('');

    const handleFilter = () => {
        const filters: Partial<ScheduleEvent> = {};
        if (title) filters.title = title;
        if (begin) filters.begin = new Date(begin);
        if (end) filters.end = new Date(end);
        onFilter(filters);
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <DialogTitle>Filtres</DialogTitle>
            <DialogContent>
                <TextField label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                <TextField
                    label="Début"
                    type="date"
                    value={begin}
                    onChange={(e) => setBegin(e.target.value)}
                    fullWidth
                />
                <TextField label="Fin" type="date" value={end} onChange={(e) => setEnd(e.target.value)} fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleFilter}>Filtrer</Button>
            </DialogActions>
        </Drawer>
    );
}
