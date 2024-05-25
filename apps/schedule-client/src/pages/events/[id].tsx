import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddForm from '@/components/add/addForm';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useEventById } from '@/hooks/event';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { ScheduleEvent } from '@schedulelib/event';
export default function Add(props: { eventSchedule: ScheduleEvent }) {
    const { eventSchedule } = props;
    const router = useRouter();
    const { id } = router.query;

    return (
        <Paper elevation={3} style={{ padding: 0, margin: 0, width: '100%', height: '100vh' }}>
            <AppBar color="primary" position="static">
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Modifier un événement</Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" component={Link} href="/">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 2 }}>
                <AddForm eventEdit={eventSchedule} id={id as string} />
            </Box>
        </Paper>
    );
}
