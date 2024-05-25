import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import YearGrid from '@/components/index/table/yearGrid';
import { ScheduleEvent } from '@schedulelib/event';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { getAllEvents } from '@/services/sever';
import FormControl from '@mui/material/FormControl';
import HeaderMenu from '@/components/index/headerMenu';
import FilterDialog from '@/components/index/table/filterDialog';
import FilterList from '@mui/icons-material/FilterList';
export default function Home() {
    const [year, setYear] = useState(dayjs().year());
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [openFilter, setOpenFilter] = useState(false);

    useEffect(() => {
        getAllEvents().then((data) => {
            setEvents(data);
        });
        console.log('events: ', events);
    }, []);

    const updateYear = (year: number) => {
        setYear(year);
        localStorage.setItem('year', year.toString());
    };

    return (
        <Paper elevation={3} style={{ padding: 0, margin: 0, width: '100%', height: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <HeaderMenu anchorEl={openMenu} handleClose={() => setOpenMenu(null)} />
                    <IconButton
                        id="header-menu"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpenMenu(document.getElementById('header-menu'))}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Schedule
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => updateYear(year - 1)}
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                        <FormControl sx={{ display: 'flex', alignItems: 'center', color: 'white', width: 100 }}>
                            <TextField
                                id="year"
                                type="number"
                                value={year}
                                onChange={(e) => year.toString().length === 4 && updateYear(parseInt(e.target.value))}
                                variant="outlined"
                                color="secondary"
                                focused
                            />
                        </FormControl>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => updateYear(year + 1)}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setOpenFilter(true)}
                        >
                            <FilterList />
                        </IconButton>
                        <FilterDialog
                            open={openFilter}
                            onClose={() => setOpenFilter(false)}
                            onFilter={() => {}}
                            categories={events.map((event) => event.category)}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <YearGrid year={year} events={events} />
        </Paper>
    );
}
