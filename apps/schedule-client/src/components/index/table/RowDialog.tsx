import Dialog from '@mui/material/Dialog';
import { useState, useMemo } from 'react';
import { ScheduleEvent } from '@schedulelib/event';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
export default function RowDialog(props: { open: boolean; onClose: () => void; schEvents: ScheduleEvent[] | null }) {
    const { open, onClose, schEvents } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {schEvents && schEvents.length > 0
                    ? `Events for ${dayjs(schEvents[0].begin).format('MMMM')}`
                    : 'No events for this month'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                        }}
                    >
                        {schEvents &&
                            schEvents.length > 0 &&
                            schEvents.map((event) => (
                                <ListItem
                                    key={event.id}
                                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                >
                                    <Box>
                                        <Box>
                                            <Typography>{event.title}</Typography>
                                            <Chip
                                                size="small"
                                                sx={{
                                                    backgroundColor: event.color,
                                                    mx: 0.1,
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 0,
                                                }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography>
                                                {dayjs(event.begin).format('HH:mm')} -{' '}
                                                {dayjs(event.end).format('HH:mm')}
                                            </Typography>
                                            <Typography>{event.description}</Typography>
                                        </Box>
                                    </Box>
                                </ListItem>
                            ))}
                    </List>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
