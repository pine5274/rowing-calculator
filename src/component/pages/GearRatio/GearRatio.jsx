import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ScullingGearRatio from './ScullingGearRatio';
import SweepGearRatio from './SweepGearRatio';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
			<Box sx={{ p: 3 }}>
				{children}
			</Box>
			)}
		</div>
	);
}
  
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const GearRatio = () => {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    return (
        <>
			<h1>Gearing Ratio Calculator</h1>
            <Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs 
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="Sculling" {...a11yProps(0)} />
						<Tab label="Sweep" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<ScullingGearRatio />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<SweepGearRatio />
				</TabPanel>
			</Box>
        </>
	);
}

export default GearRatio;
