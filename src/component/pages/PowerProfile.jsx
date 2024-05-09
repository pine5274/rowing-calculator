import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getPredictPace } from "../../data/predictPace"
import { getPowerProfile } from "../../data/powerProfile"

const PowerProfile = () => {
    
    function createData(
        index, SI, VO2max, AT, U1, U2
    ) {
        return { index, SI, VO2max, AT, U1, U2 };
    };

    const rows = getPredictPace().map((x) => {
        return createData(x.target_time, x['950m'], x['2000m'], x['5000m'], x['60min'], x['80min']);
    });

    const formatMSS = (s) => {
        const second = Number(s);
        const minutes = Math.floor(second / 60);
        const seconds = (second % 60).toFixed(1);
        if (seconds >= 10) {
            return `${minutes}:${seconds}`;
        }
        return `${minutes}:0${seconds}`;
    };

    const powerProfile = getPowerProfile();

    const member = powerProfile[0];

    const tableColors = {
        15: '#ffcdd2',
        14: '#f8bbd0',
        13: '#e1bee7',
        12: '#d1c4e9',
        11: '#c5cae9',
        10: '#bbdefb',
        9: '#b3e5fc',
        8: '#b2ebf2',
        7: '#b2dfdb',
        6: '#c8e6c9',
        5: '#dcedc8',
        4: '#f0f4c3',
        3: '#fff9c4',
        2: '#ffecb3',
        1: '#ffe0b2',
        0: '#ffccbc',
    };

    const colorArray = Array.from(Array(rows.length), () => [
        [], [], [], [], [], []
    ]);

    for (let i = 0; i < rows.length; i++) {
        if (i == rows.length -1) {
            break;
        }
        if (Number(rows[i]['SI']) < Number(member['SI']) &&  Number(member['SI']) <= Number(rows[i+1]['SI'])){
            colorArray[i+1][1] = tableColors[16];
        }
        if (Number(rows[i]['VO2max']) < Number(member['VO2max']) &&  Number(member['VO2max']) <= Number(rows[i+1]['VO2max'])){
            colorArray[i+1][0] = member['name'];
            colorArray[i+1][2] = tableColors[16];
        }
        if (Number(rows[i]['AT']) < Number(member['AT']) &&  Number(member['AT']) <= Number(rows[i+1]['AT'])){
            colorArray[i+1][3] = tableColors[16];
        }
        if (Number(rows[i]['U1']) < Number(member['U1']) &&  Number(member['U1']) <= Number(rows[i+1]['U1'])){
            colorArray[i+1][4] = tableColors[16];
        }
        if (Number(rows[i]['U2']) < Number(member['U2']) &&  Number(member['U2']) <= Number(rows[i+1]['U2'])){
            colorArray[i+1][5] = tableColors[16];
        }
    }

    return (
        <TableContainer component={Paper} sx={{ width: 500 }}>
            <Table size="small" aria-label="sweep table">
                <TableHead>
                    <TableRow>
                        <TableCell>time</TableCell>
                        <TableCell align="right">SI</TableCell>
                        <TableCell align="right">VO2max</TableCell>
                        <TableCell align="right">AT</TableCell>
                        <TableCell align="right">U1</TableCell>
                        <TableCell align="right">U2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, i) => {
                    return (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {colorArray[i][0] || ''}                  
                            </TableCell>
                            <TableCell align="right" style={{ backgroundColor: colorArray[i][1] || ''}}>{formatMSS(row.SI)}</TableCell>
                            <TableCell align="right" style={{ backgroundColor: colorArray[i][2] || ''}}>{formatMSS(row.VO2max)}</TableCell>
                            <TableCell align="right" style={{ backgroundColor: colorArray[i][3] || ''}}>{formatMSS(row.AT)}</TableCell>
                            <TableCell align="right" style={{ backgroundColor: colorArray[i][4] || ''}}>{formatMSS(row.U1)}</TableCell>
                            <TableCell align="right" style={{ backgroundColor: colorArray[i][5] || ''}}>{formatMSS(row.U2)}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PowerProfile
