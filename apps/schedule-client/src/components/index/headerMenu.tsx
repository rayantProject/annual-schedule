import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import Link from 'next/link';
export default function HeaderMenu(props: { anchorEl: null | HTMLElement; handleClose: () => void }) {
    const { anchorEl, handleClose } = props;

    return (
        <Menu id="header-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose} component={Link} href="/events/add">
                <ListItemIcon>
                    <AddIcon fontSize="small" />
                </ListItemIcon>
                ajouter un événement
            </MenuItem>
        </Menu>
    );
}
