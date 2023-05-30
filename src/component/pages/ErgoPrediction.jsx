import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ErgoPrediction = () => {
    const distance = 2000;
    const timeTrial = [1000, 2000, 6000];
    const distanceTrial = [1200, 1800, 3600];
    const createTableData = (currentPace) => {
        const tt = timeTrial.map((race) => {
            const raceStr = `${(race)}m`;
            const paceStr = predictTTPace(race, currentPace);
            const resultStr = predictTTResult(race, currentPace);
            return { raceStr, paceStr, resultStr };
        });
        const dt = distanceTrial.map((race) => {
            const raceStr = `${race/60}min`;
            const paceStr = predictDTPace(race, currentPace);
            const resultStr = predictDTResult(race, currentPace);
            return { raceStr, paceStr, resultStr };
        });
        return [...tt, ...dt];
    };
    const getPaceSecond = (currentPace) => {
        return Number(currentPace.minutes) * 60 + Number(currentPace.seconds) + Number(currentPace.milliseconds) * 0.1;
    };

    const predictTTPace = (race, currentPace) => {
        const time =  getPaceSecond(currentPace) * (race / Number(distance)) ** (1/18);
        return convertTimeToMMSS(time);
    };

    const predictTTResult = (race, currentPace) => {
        const time = (race/500)* getPaceSecond(currentPace) * (race / Number(distance)) ** (1/18);
        return convertTimeToMMSS(time);
    };

    const predictDTPace = (race, currentPace) => {
        const target_seconds = 4 * getPaceSecond(currentPace);
        const time = race / ((Number(distance) / 500) * (race / target_seconds) ** (17/18));
        return convertTimeToMMSS(time);
    };

    const predictDTResult = (race, currentPace) => {
        const target_seconds = 4 * getPaceSecond(currentPace);
        const time = (race / ((Number(distance) / 500) * (race / target_seconds) ** (17/18)));
        return `${(500 * race / time).toFixed(1)}m`;
    };
    
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

    const [pace, setPace] = useState({ minutes: 1, seconds: 45, milliseconds: 0 });
    const tableData = createTableData(pace);

    const onChangeMinutes = (e) => {
        const currentPace = {...pace, minutes: e.target.value };
        setPace(currentPace);
    };
    const onChangeSeconds = (e) => {
        const currentPace = {...pace, seconds: e.target.value };
        setPace(currentPace);
    };
    const onChangeMilliseconds = (e) => {
        const currentPace = {...pace, milliseconds: e.target.value };
        setPace(currentPace);
    };

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
                <Divider />
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
            </Box>
        </>
    )
}
export default ErgoPrediction
