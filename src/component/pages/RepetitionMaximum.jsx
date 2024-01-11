import React, { useState } from 'react';
import { getRm } from '../../data/rm';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const RepetitionMaximum = () => {

    const [weight, setWeight] = useState(100);
    const [reps, setReps] = useState(1);
    const [isValid, setIsValid] = useState(true);
    const [percent1RM, setPercent1RM] = useState(100);

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };
    const handleRepsChange = (e) => {
        const r = e.target.value
        if (r < 1 || r > 12) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
        setReps(r);
    };
    const handlePercent1RMChange = (e) => {
        setPercent1RM(e.target.value);
    };

    const rm = getRm();
    const percentage = rm.filter((value) => {
        return value.reps === Number(reps);
    })

    const oneRm = percentage.length !== 0 ? (Number(weight) / percentage[0].percentage).toFixed(1) : 0;
    const errorMessage = isValid ? '' : '*Reps must to be 1 to 12.';
    const tableData = rm.map((value) => {
        return { rm: value.reps, kg: (oneRm * value.percentage * Number(percent1RM) / 100).toFixed(1) };
    });

    return (
        <>
            <h1>1RM Conversion</h1>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Weight"
                    id="weight"
                    sx={{ m: 1, width: '15ch' }}
                    value={weight}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleWeightChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                />
                <TextField
                    label='Reps'
                    error={!isValid}
                    id="reps"
                    sx={{ m: 1, width: '15ch' }}
                    value={reps}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleRepsChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                    }}
                    helperText={errorMessage}
                />
            </Box>
            <Box sx={{ ml: 1}}>
                <h2>
                    1RM: {oneRm} kg
                </h2>
            </Box>
            <Divider />
            <Box sx={{ ml: 1}}>
                <h2>
                    Training Load Chart
                </h2>
            </Box>
            <TextField
                label='%1RM'
                id="1rm"
                sx={{ m: 1, mb: 3, width: '15ch' }}
                value={percent1RM}
                inputProps={{ inputMode: 'numeric', type: 'tel', }}
                onChange={handlePercent1RMChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                helperText={errorMessage}
            />
            <TrainingLoadTable 
                tableData={tableData}
            />
        </>
    )
};

const TrainingLoadTable = ({ tableData }) => {
    return (
        <TableContainer sx={{ maxWidth: 225 }} component={Paper}>
            <Table size="small" aria-label="ergo predict table">
                <caption>
                    cf.&nbsp;
                    <Link href="https://www.nsca.com/contentassets/61d813865e264c6e852cadfe247eae52/nsca_training_load_chart.pdf">
                        NSCA Training Load Chart;
                    </Link>
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">RM</TableCell>
                        <TableCell align="right">kg</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {tableData.map((row) => (
                    <TableRow
                        key={row.rm}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="right" component="th" scope="row">
                        {row.rm}
                    </TableCell>
                    <TableCell align="right">{row.kg}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RepetitionMaximum
