import Dialog from '@mui/material/Dialog';
import { useState, useMemo } from 'react';
import { ScheduleEvent } from '@schedulelib/event';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

export default function RowDialog(props: { open: boolean; onClose: () => void; schEvent: ScheduleEvent | null }) {
    const { open, onClose, schEvent } = props;

    const checkEvent = useMemo(() => {
        if (schEvent) {
            return schEvent;
        }
        return null;
    }, [schEvent]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {checkEvent ? dayjs(checkEvent.begin).format('dddd, MMMM D, YYYY') : "pas d'événement ce jour-là"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
