import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const WeightAdjustment = () => {
    const [pace, setPace] = useState({
        minutes: 1,
        seconds: 45,
        tenths: 0
    });
    const [weight, setWeight] = useState(75);
    const [standardWeight, setStandardWeight] = useState(75);
    const [choices, setChoices] = useState([]);

    const handleMinutesChange = (e) => {
        const currentPace = { ...pace, minutes: Number(e.target.value) };
        setPace(currentPace);
    };
    const handleSecondsChange = (e) => {
        const currentPace = { ...pace, seconds: Number(e.target.value) };
        setPace(currentPace);
    };
    const handleTenthsChange = (e) => {
        const currentPace = { ...pace, tenths: Number(e.target.value) };
        setPace(currentPace);
    };
    const handleWeightChange = (e) => {
        setWeight(Number(e.target.value));
    };
    const handleStandardWeightChange = (e) => {
        setStandardWeight(Number(e.target.value));
    };

    const saveChoice = () => {
        const choice = {
            pace: convertTimeToMMSS(pace.minutes * 60 + pace.seconds + pace.tenths * 0.1),
            adjustPace: adjustPace,
            weight: weight,
            standardWeight: standardWeight
        };
        setChoices([...choices, choice]);
    };
    const calcAdjustPace = () => {
        const currentPace = pace.minutes * 60 + pace.seconds + pace.tenths * 0.1;
        return currentPace * ((standardWeight / weight) ** (-2/9));
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
    }

    const adjustPace = convertTimeToMMSS(calcAdjustPace());
    
    return (
        <>
            <h1>Weight Adjustment</h1>
            <Box sx={{ pt: 3, px: 1, }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TextField
                        label="Pace"
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
                        value={pace.tenths}
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
                <Box sx={{ pt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    <TextField
                        label="Weight"
                        id="weight"
                        sx={{ m: 1, width: '15ch' }}
                        value={weight}
                        inputProps={{ inputMode: 'numeric', type: 'tel', }}
                        onChange={handleWeightChange}
                    />
                    <Box
                        sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', }}
                    >
                        <Typography sx={{ color: 'caption.main', }} variant="body1" component="div">
                            kg
                        </Typography>
                    </Box>
                    <TextField
                        label="Standard weight"
                        id="weight"
                        sx={{ m: 1, width: '15ch' }}
                        value={standardWeight}
                        inputProps={{ inputMode: 'numeric', type: 'tel', }}
                        onChange={handleStandardWeightChange}
                    />
                    <Box
                        sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', }}
                    >
                        <Typography sx={{ color: 'caption.main', }} variant="body1" component="div">
                            kg
                        </Typography>
                    </Box>
                </Box>
                <h2>
                    Adjustment Pace: {adjustPace} /500m
                </h2>
                <Box sx={{ display: 'flex', maxWidth: 1000, }}>
                    <Button 
                        sx={{ m: 2, ml: "auto",}}
                        variant="contained"
                        endIcon={<LibraryAddIcon />}    
                        onClick={saveChoice}
                    >
                        Save
                    </Button>
                </Box>
                <ChoseTable choices={choices} />
                <Divider />
                <Formula />
            </Box>
        </>
    )
}

const ChoseTable = (props) => {
    if (props.choices.length === 0) {
        return;
    }

    function createData(
        index,
        pace,
        adjustPace,
        weight,
        standardWeight,
    ) {
        return { index, pace, adjustPace, weight, standardWeight };
    }

    const rows = props.choices.map((x, index) => {
        return createData(index, x.pace, x.adjustPace, x.weight, x.standardWeight)
    });

    return (
        <TableContainer component={Paper} sx={{ my:2, maxWidth: 1000 }}>
            <Table sx={{ minWidth: 350 }} size="small" aria-label="sculling chose table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Pace</TableCell>
                        <TableCell align="right">Adjust<br></br>Pace</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">Adjust<br></br>Weight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{row.pace}</TableCell>
                        <TableCell align="right">{row.adjustPace}</TableCell>
                        <TableCell align="right">{row.weight}</TableCell>
                        <TableCell align="right">{row.standardWeight}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Formula = () => {
    return (
        <Accordion sx={{ mt: 5,}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Used Formula</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography 
                    sx={{ color: 'caption.main', mb: 1 ,}}
                    variant="body2"
                    component="div"
                >
                    Adjustment Pace = Pace * ((Standard Weight / Weight) ^ (-2/9))
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default WeightAdjustment
