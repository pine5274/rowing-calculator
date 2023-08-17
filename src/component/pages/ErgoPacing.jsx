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
import Alert from '@mui/material/Alert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { getIntensityZone } from '../../data/IntensityZone';

const ErgoPacing = () => {
    const [pace, setPace] = useState({ minutes: 1, seconds: 45, milliseconds: 0 });

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

    const wattsToPace = (watts) => {
        let s = 500 * (2.8 / watts) ** (1/3);
        const minutes = Math.floor(s / 60);
        s = (s % 60).toFixed(1);
        let seconds = Math.trunc(s);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        const milliseconds = parseFloat(String(s).split('.')[1]);

        return `${minutes}:${seconds}.${milliseconds}`;
    }

    const createTableData = (watts) => {
        const intensityZone = getIntensityZone();
        const tableData = intensityZone.map((i) => {
            const upperPace = wattsToPace(watts * i.upperRatio);
            const lowerPace = wattsToPace(watts * i.lowerRatio);
            return { category: i.category, pace: `${upperPace} ~ ${lowerPace}`,caption: i.caption };
        });
        return tableData;
    };

    const watts = (2.80 / ((Number(pace.minutes) * 60 + Number(pace.seconds) + Number(pace.milliseconds) * 0.1) / 500) ** 3).toFixed(1)
    const tableData = createTableData(watts);

    return (
        <>
            <h1>Ergo Pacing Sheet</h1>
            <Typography variant="body2">
                Enter your best-ever ergo score, or the score you'd like to achieve, and see what pace you need to train to be in your different training zones.
            </Typography>
            <Box sx={{ p: 3,  maxWidth: 1000 }} >
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
                <Box sx={{ py: 3 }}>
                    <PacingTable tableData={tableData} />
                </Box>
                <Alert variant="outlined" severity="info">
                    More experienced athletes will train higher in the intensity range than less experienced athletes with a reduced training background.  To some extent you will need to find your ranges by trial and error, but this is a starting guide with approximate ranges.
                </Alert>
            </Box>
        </>
    )
}

function Row({ row }) {
    const [open, setOpen] = React.useState(false);
  
    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.category}
                </TableCell>
                <TableCell align="right">{row.pace}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Typography 
                            variant="body2"
                            component="div"
                            sx={{ 
                                py: 2,
                                color: 'text.secondary'
                            }}
                        >
                            {row.caption}
                        </Typography>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const PacingTable = ({ tableData }) => {
    return (
        <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
            <Table size="small" aria-label="ergo predict table">
                <caption>cf. Rowing New Zealand</caption>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Intensity Category</TableCell>
                        <TableCell align="right">Pace&nbsp;(/500m)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {tableData.map((row) => (
                    <Row key={row.category} row={row} />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ErgoPacing
