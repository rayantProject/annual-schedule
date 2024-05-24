import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddForm from '@/components/add/addForm';
import Box from '@mui/material/Box';
import Link from 'next/link';
export default function Add() {
    return (
        <Paper elevation={3} style={{ padding: 0, margin: 0, width: '100%', height: '100vh' }}>
            <AppBar color="primary" position="static">
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Ajouter un événement</Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" component={Link} href="/">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 2 }}>
                <AddForm />
            </Box>
        </Paper>
    );
}
