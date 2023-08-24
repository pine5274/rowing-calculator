import React from 'react';
import { Link } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import BuildIcon from '@mui/icons-material/Build';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FlagIcon from '@mui/icons-material/Flag';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const IndexList = (props) => {
    const ROUTE = '/rowing-calculator';
    return (
        <>
            <List>
                <ListItem key={'Gearing Ratio'} disablePadding>
                    <ListItemButton
                        component={Link}
                        onClick={props.onClick}
                        to={`${ROUTE}/gearing-ratio`}
                    >
                        <ListItemIcon>
                            <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Gearing Ratio'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Pace to Watt'} disablePadding>
                    <ListItemButton
                        component={Link}
                        onClick={props.onClick}
                        to={`${ROUTE}/pace-to-watts`}
                    >
                        <ListItemIcon>
                            <SyncAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Pace to Watts'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Ergo Pacing'} disablePadding>
                    <ListItemButton
                        component={Link}
                        onClick={props.onClick}
                        to={`${ROUTE}/ergo-pacing`}
                    >
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Ergo Pacing'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Ergo Prediction'} disablePadding>
                    <ListItemButton
                        component={Link}
                        onClick={props.onClick}
                        to={`${ROUTE}/ergo-prediction`}
                    >
                        <ListItemIcon>
                            <FlagIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Ergo Prediction'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Weight Adjustment'} disablePadding>
                    <ListItemButton
                        component={Link}
                        onClick={props.onClick}
                        to={`${ROUTE}/weight-adjustment`}
                    >
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Weight Adjustment'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'1RM Conversion Table'} disablePadding>
                    <ListItemButton
                        component={Link}
                        onClick={props.onClick}
                        to={`${ROUTE}/repetition-maximum`}
                    >
                        <ListItemIcon>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary={'1RM Conversion Table'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}
export default IndexList
