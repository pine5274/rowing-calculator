import React from 'react';
import IndexList from './IndexList';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = (props) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
	  	setMobileOpen(!mobileOpen);
	};

    const drawer = (
		<div>
            <Toolbar />
            <Divider />
			<List>
				<ListItem key={'Index'} disablePadding>
					<ListItemButton
						component={RouterLink}
						onClick={handleDrawerToggle}
						to="/rowing-calculator/"
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<IndexList
				onClick={handleDrawerToggle}
			/>
		</div>
    );

    return (
        <>
            <AppBar
				position="fixed"
				sx={{
					width: { lg: `calc(100% - ${props.drawerWidth}px)` },
					ml: { lg: `${props.drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { lg: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Link 
						component={RouterLink}
						to="/rowing-calculator/"
						underline="none"
						color="inherit"
						variant="h6"
					>
						Rowing Calculator
					</Link>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { lg: props.drawerWidth }, flexShrink: { lg: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', lg: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', lg: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
        </>
    );

}

export default Sidebar;
