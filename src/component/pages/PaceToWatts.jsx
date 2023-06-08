import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

const PaceToWatts = () => {
    const [pace, setPace] = useState({ minutes: 1, seconds: 45, milliseconds: 0 });
    const [watts, setWatts] = useState((2.80 / ((Number(pace.minutes) * 60 + Number(pace.seconds) + Number(pace.milliseconds) * 0.1) / 500) ** 3).toFixed(1));
    const [choices, setChoices] = useState([]);
    const [tabNum, setTabNum] = useState(0);
    const onChangePace = (pace) => {
        setWatts((2.80 / ((Number(pace.minutes) * 60 + Number(pace.seconds) + Number(pace.milliseconds) * 0.1) / 500) ** 3).toFixed(1));
        setPace(pace);
    };
    const onChangeWatts = (watts) => {
        let s = 500 * (2.8 / Number(watts)) ** (1/3);
        const minutes = Math.floor(s / 60);
        s = (s % 60).toFixed(1);
        const seconds = Math.trunc(s);
        const milliseconds = parseFloat(String(s).split('.')[1]);
        setPace({ minutes: minutes, seconds: seconds, milliseconds: milliseconds });
        setWatts(watts);
    };
    const handleTabChange = (e, newValue) => {
        setTabNum(newValue);
    };
    const saveChoice = () => {
        const choice = {pace: `${pace.minutes}:${pace.seconds}.${pace.milliseconds}`, watts: watts};
        setChoices([...choices, choice]);
    };
    const resetChoice = () => {
        setChoices([]);
    }

    let formula = '';
    if (tabNum === 0) {
        formula = 'watts = 2.80/pace³';
    } else {
        formula = 'pace = ³√(2.80/watts)';
    }

    return (
        <>
            <h1>Pace to Watts Calculator</h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabNum}
                    onChange={handleTabChange}
                    aria-label="secondary tabs example"
                >
                    <Tab value={0} label="Pace to Watts" />
                    <Tab value={1} label="Watts to Pace" />
                </Tabs>
                </Box>
                <TabPanel value={tabNum} index={0}>
                    <PaceToTab pace={pace} watts={watts} onChangePace={onChangePace} />
                </TabPanel>
                <TabPanel value={tabNum} index={1}>
                    <WattsToTab pace={pace} watts={watts} onChangeWatts={onChangeWatts} />
                </TabPanel>
                <Box sx={{ display: 'flex', maxWidth: 1000, }}>
                    <Button 
                        sx={{ m: 2, ml: "auto",}}
                        variant="contained"
                        endIcon={<LibraryAddIcon />}    
                        onClick={saveChoice}
                    >
                        Save
                    </Button>
                    <Button 
                        sx={{ m: 2 }}
                        variant="contained"
                        color='error'
                        endIcon={<RestartAltIcon />}    
                        onClick={resetChoice}
                    >
                        Reset
                    </Button>
                </Box>
                <ChoseTable choices={choices} />
                <Divider />
                <Formula formula={formula} ></Formula>
            </Box>
        </>
    );
}

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

const PaceToTab = ({ pace, watts, onChangePace }) => {

    const handleMinutesChange = (e) => {
        onChangePace({...pace, minutes: e.target.value });
    };
    const handleSecondsChange = (e) => {
        onChangePace({...pace, seconds: e.target.value });
    };
    const handleTenthsChange = (e) => {
        onChangePace({...pace, milliseconds: e.target.value });
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="pace"
                    id="minutes"
                    sx={{ m: 1, width: '6ch' }}
                    value={pace.minutes}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    size="small"
                    onChange={handleMinutesChange}
                />
                <Box
                    sx={{ display: 'flex', alignItems: 'center', }}
                >
                    <Typography variant="h5" component="div">
                        :
                    </Typography>
                </Box>
                <TextField
                    id="seconds"
                    sx={{ m: 1, width: '6ch' }}
                    value={pace.seconds}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    size="small"
                    onChange={handleSecondsChange}
                />
                <Box
                    sx={{ display: 'flex', alignItems: 'center', }}
                >
                    <Typography variant="h5" component="div">
                        .
                    </Typography>
                </Box>
                <TextField
                    id="tenths"
                    sx={{ m: 1, width: '6ch' }}
                    value={pace.milliseconds}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    size="small"
                    onChange={handleTenthsChange}
                />
                <Box
                    sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', }}
                >
                    <Typography sx={{ color: 'caption.main', }} variant="body1" component="div">
                        /500m
                    </Typography>
                </Box>
            </Box>
            <h2>{watts} watts</h2>
        </>
    )
}

const WattsToTab = ({ pace, watts, onChangeWatts }) => {
  
    const handleWattsChange = (e) => {
        onChangeWatts(e.target.value)
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Watts"
                    id="watts"
                    sx={{ m: 1, width: '12ch' }}
                    value={watts}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    size="small"
                    onChange={handleWattsChange}
                />
            </Box>
            <h2>{pace.minutes}:{pace.seconds}.{pace.milliseconds} /500m</h2>
        </>
    )
}

const ChoseTable = ({ choices }) => {
    if (choices.length === 0) {
        return;
    }

    function createData(
        id,
        pace,
        watts
    ) {
        return { id, pace, watts };
    }

    const rows = choices.map((x, index) => {
        return createData(index, x.pace, x.watts);
    });

    return (
        <TableContainer component={Paper} sx={{ my:2, maxWidth: 300 }}>
            <Table size="small" aria-label="sculling chose table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">/500m</TableCell>
                        <TableCell align="right">watts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{row.pace}</TableCell>
                        <TableCell align="right">{row.watts}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Formula = ( { formula } ) => {
    return(
        <Paper sx={{ p: 2, mt: 4, }}>
            <Typography
                sx={{ color: 'caption.main', }}
                variant="body2"
                component="div"
            >
                { formula }
            </Typography>
            <Typography 
                sx={{ color: 'caption.main', }}
                variant="body2"
                component="div"
            >
            <Link href="https://www.concept2.com/indoor-rowers/training/calculators/watts-calculator">
                concept2 watts-calculator
            </Link>
            </Typography>
        </Paper>
    )
};


export default PaceToWatts
