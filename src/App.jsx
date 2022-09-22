import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './component/Sidebar';
import Index from './component/pages/Index';
import GearRatio from './component/pages/GearingRatio';
import PaceToWatts from './component/pages/PaceToWatts';
import ErgoPrediction from './component/pages/ErgoPrediction';
import WeightAdjustment from './component/pages/WeightAdjustment';
import NoMatch from './component/pages/NoMatch';
import { getPalette } from './data/palette';

const theme = createTheme(getPalette());

function App() {
	const drawerWidth = 240;
	const ROUTE = '/rowing-calculator';
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: {lg: 'flex'} }}>
				<CssBaseline />
				<BrowserRouter>
					<Sidebar drawerWidth={drawerWidth} />
					<Box
						component="main"
						sx={{ flexGrow: 1, p: 3, width: { lg: `calc(100% - ${drawerWidth}px)` } }}
						>
							<Toolbar />
							<Routes>
								<Route path={`${ROUTE}`} element={<Index />} />
								<Route path={`${ROUTE}/gearing-ratio`} element={<GearRatio />} />
								<Route path={`${ROUTE}/pace-to-watts`} element={<PaceToWatts />} />
								<Route path={`${ROUTE}/ergo-prediction`} element={<ErgoPrediction />} />
								<Route path={`${ROUTE}/weight-adjustment`} element={<WeightAdjustment />} />
								<Route path="*" element={<NoMatch />} />
							</Routes>
					</Box>	
				</BrowserRouter>
			</Box>
		</ThemeProvider>
	);
}

export default App;
