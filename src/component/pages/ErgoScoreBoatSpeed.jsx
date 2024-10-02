import React from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ergoScoreBoatSpeed from '../../data/ergoScoreBoatSpeed';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getTheme } from '../../data/theme';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(getTheme());

const ErgoScoreBoatSpeed = () => {
    const [boatType, setBoatType] = React.useState('1x');
	const handleChange = (event) => {
		setBoatType(event.target.value);
	};

    return (
        <Box>
            <h1>Ergo Score Boat Speed</h1>
            <Typography variant="body2">
                Correlation of the ergo score with the boat speed.
            </Typography>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">boat type</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={boatType}
                        label="boat type"
                        onChange={handleChange}
                    >
                        <MenuItem value={'1x'}>1x</MenuItem>
                        <MenuItem value={'2x'}>2x</MenuItem>
                        <MenuItem value={'4x'}>4x</MenuItem>
                        <MenuItem value={'4x+'}>4x+</MenuItem>
                        <MenuItem value={'2-'}>2-</MenuItem>
                        <MenuItem value={'4-'}>4-</MenuItem>
                        <MenuItem value={'4+'}>4+</MenuItem>
                        <MenuItem value={'8+'}>8+</MenuItem>
                    </Select>
                </FormControl>
                <CorrelationTable boatType={boatType}/>
            </Box>
        </Box>
    );
}

const CorrelationTable = ({ boatType }) => {

    const correlation = ergoScoreBoatSpeed()[boatType];
    const head = [
        'ergo',
        '50kg',
        '55kg',
        '60kg',
        '65kg',
        '70kg',
        '75kg',
        '80kg',
        '85kg',
        '90kg',
        '95kg',
        '100kg',
        '105kg',
        '110kg',
    ];
    const body = correlation.map((value) => {
        return Object.values(value);
    });

    return (
        <TableContainer component={Paper} sx={{my: 2, maxWidth: 950, maxHeight: 600 }}>
            <Table stickyHeader sx={{ minWidth: 350 }} size="small" aria-label="sculling chose table">
                <TableHead>
                    <TableRow >
                        {head.map((row, i) => 
                            <TableCell key={i} align="right" sx={{ backgroundColor: theme.palette.background.paper }}>{row}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((row, i) => {
                        return (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.map((value, j) => {
                                    if (j === 0) {
                                        return <TableCell key={j} align="right" sx={{ backgroundColor: theme.palette.background.paper }}>
                                                {value.slice(1, 5)}
                                            </TableCell>
                                    }
                                    return <TableCell key={j} align="right">{value.slice(1, 5)}</TableCell>
                                })}
                            </TableRow>
                        )}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ErgoScoreBoatSpeed;
