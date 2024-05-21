import React from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ergoScoreBoatSpeed from '../../data/ergoScoreBoatSpeed';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
                        <MenuItem value={'2-'}>2-</MenuItem>
                        <MenuItem value={'4-'}>4-</MenuItem>
                        <MenuItem value={'8+'}>8+</MenuItem>
                    </Select>
                </FormControl>
                <CorrelationTable boatType={boatType}/>
            </Box>
        </Box>
    );
}

const CorrelationTable = ({ boatType }) => {

    const correlation = ergoScoreBoatSpeed();
    const data = correlation.map((value) => {
       return value[boatType];
    }).map((value) => {
        return value.split(' ');
    });

    const head = data[0];
    const indexDelete = 0;
    const body = data.filter((_, index) => index !== indexDelete);

    return (
        <TableContainer component={Paper} sx={{my: 2, maxWidth: 950, maxHeight: 600 }}>
            <Table stickyHeader sx={{ minWidth: 350 }} size="small" aria-label="sculling chose table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Ergo\Mass(kg)</TableCell>
                        {head.map((row, i) => 
                            <TableCell key={i} align="right">{row}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((value, i) => {
                        const indexDelete = 1;
                        const row = value.filter((_, index) => index !== indexDelete);
                        return (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.map((value, j) => 
                                    <TableCell key={j} align="right">{value}</TableCell>
                                )}
                            </TableRow>
                        )}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ErgoScoreBoatSpeed;
