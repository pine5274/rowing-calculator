import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ErgoPrediction = () => {
    const distance = 2000;
    const timeTrial = [1000, 2000, 6000];
    const distanceTrial = [1200, 1800, 3600];

    const convertTimeToMMSS = (time) => {
        const mm = `${Math.floor(time / 60)}`;
        let ss = (time % 60).toFixed(1);
        if (ss < 10) {
            ss = "0" + String(ss);
        } else {
            ss = String(ss);
        }

        return `${mm}:${ss}`;
    };

    const predictTTPace = (race, paceSecond) => {
        const time =  paceSecond * (race / Number(distance)) ** (1/18);
        return convertTimeToMMSS(time);
    };

    const predictTTResult = (race, paceSecond) => {
        const time = (race/500)* paceSecond * (race / Number(distance)) ** (1/18);
        return convertTimeToMMSS(time);
    };

    const predictDTPace = (race, paceSecond) => {
        const target_seconds = 4 * paceSecond;
        const time = race / ((Number(distance) / 500) * (race / target_seconds) ** (17/18));
        return convertTimeToMMSS(time);
    };

    const predictDTResult = (race, paceSecond) => {
        const target_seconds = 4 * paceSecond;
        const time = (race / ((Number(distance) / 500) * (race / target_seconds) ** (17/18)));
        return `${(500 * race / time).toFixed(1)}m`;
    };

    const [pace, setPace] = useState({ minutes: 1, seconds: 45, milliseconds: 0 });
    const [race, setRace] = useState({
        minute: distanceTrial,
        distance: timeTrial,
    });
    const [addValue, setAddValue] = useState({
        type: 'distance',
        value: ''
    });
    
    const onChangeMinutes = (e) => {
        const currentPace = { ...pace, minutes: e.target.value };
        setPace(currentPace);
    };
    const onChangeSeconds = (e) => {
        const currentPace = { ...pace, seconds: e.target.value };
        setPace(currentPace);
    };
    const onChangeMilliseconds = (e) => {
        const currentPace = { ...pace, milliseconds: e.target.value };
        setPace(currentPace);
    };
    const handleAlignment = (e, newAlignment) => {
        setAddValue({ ...addValue, type: newAlignment});
    };
    const onChangePrediction = (e) => {
        setAddValue({ ...addValue, value: e.target.value });
    }
    const onAddPrediction = () => {
        const addArray = race[addValue.type];
        addArray.push(addValue.value);
        setRace({ ...race, [addValue.type]: addArray });
    };
    const resetPrediction = () => {
        setAddValue({ ...addValue, value: '' });
    };

    const createTableData = (paceSecond) => {
        const tt = race.distance.map((race) => {
            const raceStr = `${(race)}m`;
            const paceStr = predictTTPace(race, paceSecond);
            const resultStr = predictTTResult(race, paceSecond);
            return { raceStr, paceStr, resultStr };
        });
        const dt = race.minute.map((race) => {
            const raceStr = `${race/60}min`;
            const paceStr = predictDTPace(race, paceSecond);
            const resultStr = predictDTResult(race, paceSecond);
            return { raceStr, paceStr, resultStr };
        });
        return [...tt, ...dt];
    };

    const paceSecond = Number(pace.minutes) * 60 + Number(pace.seconds) + Number(pace.milliseconds) * 0.1;
    const tableData = createTableData(paceSecond);

    return (
        <>
            <h1>Ergo Prediction</h1>
            <Typography variant="body2">
                Based on your performance , we have predicted your maximum performance over some common race distances.
            </Typography>
            <Box sx={{ p: 3, }} >
            <h2>Best 2000m Pace</h2>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TextField
                        label="pace"
                        id="minutes"
                        sx={{ m: 1, width: '6ch' }}
                        value={pace.minutes}
                        inputProps={{ inputMode: 'numeric', type: 'tel', }}
                        size="small"
                        onChange={onChangeMinutes}
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
                        onChange={onChangeSeconds}
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
                        onChange={onChangeMilliseconds}
                    />
                    <Box
                        sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', }}
                    >
                        <Typography sx={{ color: 'caption.main', }} variant="body1" component="div">
                            /500m
                        </Typography>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <PredictionTable tableData={tableData} />
                    </Grid>
                    <Grid item md={4}>
                        <AddPrediction
                            addValue={addValue}
                            handleAlignment={handleAlignment}
                            onChangePrediction={onChangePrediction}
                            resetPrediction={resetPrediction}
                            onAddPrediction={onAddPrediction}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <Formula />
            </Box>
        </>
    )
}

const PredictionTable = ({ tableData }) => {
    return (
        <TableContainer sx={{ my: 3, maxWidth: 400 }} component={Paper}>
            <Table size="small" aria-label="ergo predict table">
                <TableHead>
                    <TableRow>
                        <TableCell>Race</TableCell>
                        <TableCell align="right">Predict Pace&nbsp;(/500m)</TableCell>
                        <TableCell align="right">Predict Result&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {tableData.map((row) => (
                    <TableRow
                        key={row.raceStr}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.raceStr}
                    </TableCell>
                    <TableCell align="right">{row.paceStr}</TableCell>
                    <TableCell align="right">{row.resultStr}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const AddPrediction = ({
    addValue,
    handleAlignment,
    onChangePrediction,
    onAddPrediction,
    resetPrediction
}) => {

    const unit = addValue.type === 'distance' ? 'm' : 'min' ;

    return (
        <Paper sx={{ my: 3 }}>
            <ToggleButtonGroup
                sx={{ mx: 1, mb: 3, width: '20ch', }}
                color="primary"
                value={addValue.type}
                exclusive
                onChange={handleAlignment}
                size="small"
                aria-label="text alignment"
            >
                <ToggleButton sx={{ width: '100%', }} value="distance" aria-label="left aligned">
                    distance
                </ToggleButton>
                <ToggleButton sx={{ width: '100%', }} value="minute" aria-label="right aligned">
                    minute
                </ToggleButton>
            </ToggleButtonGroup>
            <TextField
                label={addValue.type}
                id="add"
                sx={{ m: 1, width: '25ch' }}
                inputProps={{ inputMode: 'numeric', type: 'tel', }}
                value={addValue.value}
                onChange={onChangePrediction}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
                }}
            />
            <Button 
                sx={{ m: 2, ml: "auto",}}
                variant="contained"
                endIcon={<LibraryAddIcon />}    
                onClick={onAddPrediction}
            >
                Add
            </Button>
            <Button
                sx={{ m: 2 }}
                variant="contained"
                color='error'
                endIcon={<RestartAltIcon />}    
                onClick={resetPrediction}
            >
                Reset
            </Button>
        </Paper>
    );
}

const Formula = () => {
    return (
        <Accordion sx={{ mt: 5,}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Formulas Used</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography 
                    sx={{ color: 'caption.main', mb: 1,}}
                    variant="body2"
                    component="div"
                >
                    Predict Pace = target_pace * (distance / target_distance) ^(1/18)
                </Typography>
                <Typography 
                    sx={{ color: 'caption.main', }}
                    variant="body2"
                    component="div"
                >
                    For example:
                    <br></br>
                    If your personal best 2000tt is 1:45 [/500m], predict 6000tt pace is calculated as (105*(6000/2000)^(1/18)), which equals 111.6 [s/500m]
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default ErgoPrediction
