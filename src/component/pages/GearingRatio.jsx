import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
import { getScullingExample } from "../../data/oarRig"
import { getSweepExample } from "../../data/oarRig"

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
			<Box sx={{ p: 1 }}>
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

const ScullingGearRatio = () => {
    const [oarRig, setOarRig] = useState({
        span: 159,
        length: 286,
        inboard: 88
    });
    const getGearingRatio = () => {
        if (span <= 0) {
            return '';
        }
        
        return (oarLength - inboard) / (span / 2);
    }
    const [span, setSpan] = useState(159);
    const [oarLength, setOarLength] = useState(286);
    const [inboard, setInboard] = useState(88);
    const [gearingRatio, setGearingRatio] = useState(0);
    const [overLap, setOverLap] = useState(0);
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        if (span <= 0) {
            setGearingRatio('');
        } else {
            const gearingRatio = (Number(oarLength) - Number(inboard)) / (Number(span)/2);
            setGearingRatio(gearingRatio.toFixed(3));
            const overLap = Number(inboard) * 2 - Number(span);
            setOverLap(overLap.toFixed(1));
        }
    }, [span, oarLength, inboard]);

    const handleSpanChange = (e) => {
        setSpan(e.target.value);
    };
    const handleOarLengthChange = (e) => {
        setOarLength(e.target.value);
    };
    const handleInboardChange = (e) => {
        setInboard(e.target.value);
    };
    const saveChoice = () => {
        const choice = {
            span: span,
            oarLength: oarLength,
            inboard: inboard,
            overLap: overLap,
            gearingRatio: gearingRatio
        };
        setChoices([...choices, choice]);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Span"
                    id="span"
                    sx={{ m: 1, width: '25ch' }}
                    value={span}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleSpanChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                />
                <TextField
                    label="Oar Length"
                    id="oar-length"
                    sx={{ m: 1, width: '25ch' }}
                    value={oarLength}
                    inputProps={{ inputMode: 'numeric', type: 'tel' }}
                    onChange={handleOarLengthChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                />
                <TextField
                    label="Inboard"
                    id="inboard"
                    sx={{ m: 1, width: '25ch' }}
                    value={inboard}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleInboardChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                />
            </Box>
            <h2>
                Gearing Ratio: {gearingRatio}
            </h2>
            <h2>
                Over Lap: {overLap}
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
            <h3>
                Sculling Example
            </h3>
            <ScullingExample />
        </>
      );
}

const ChoseTable = (props) => {
    if (props.choices.length === 0) {
        return;
    }

    function createData(
        id,
        span,
        length,
        inboard,
        overlap,
        gearingRatio
    ) {
        return { id, span, length, inboard, overlap, gearingRatio };
    }

    const rows = props.choices.map((x, index) => {
        return createData(index, x.span, x.oarLength, x.inboard, x.overLap, x.gearingRatio)
    });

    return (
        <TableContainer component={Paper} sx={{ my:2, maxWidth: 1000 }}>
            <Table sx={{ minWidth: 350 }} size="small" aria-label="sculling chose table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Span<br></br>Spread</TableCell>
                        <TableCell align="right">Oar<br></br>Length</TableCell>
                        <TableCell align="right">Inboard</TableCell>
                        <TableCell align="right">OveLap</TableCell>
                        <TableCell align="right">Gearing<br></br>Ratio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{row.span}</TableCell>
                        <TableCell align="right">{row.length}</TableCell>
                        <TableCell align="right">{row.inboard}</TableCell>
                        <TableCell align="right">{row.overlap}</TableCell>
                        <TableCell align="right">{row.gearingRatio}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const SweepGearRatio = () => {
    const [spread, setSpread] = useState(87);
    const [oarLength, setOarLength] = useState(374);
    const [inboard, setInboard] = useState(117);
    const [gearingRatio, setGearingRatio] = useState(0);
    const [overLap, setOverLap] = useState(0);
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        if (spread <= 0) {
            setGearingRatio('');
        } else {
            const gearingRatio = (Number(oarLength) - Number(inboard)) / Number(spread);
            setGearingRatio(gearingRatio.toFixed(3));
            const overLap = Number(inboard) - Number(spread);
            setOverLap(overLap.toFixed(1));
        }	
    }, [spread, oarLength, inboard]);

    const handleSpreadChange = (e) => {
        setSpread(e.target.value);
    };
    const handleOarLengthChange = (e) => {
        setOarLength(e.target.value);
    };
    const handleInboardChange = (e) => {
        setInboard(e.target.value);
    };
    const saveChoice = () => {
        const choice = {
            span: spread,
            oarLength: oarLength,
            inboard: inboard,
            overLap: overLap,
            gearingRatio: gearingRatio
        };
        setChoices([...choices, choice]);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Spread"
                    id="spread"
                    sx={{ m: 1, width: '25ch' }}
                    value={spread}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleSpreadChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                />
                <TextField
                    label="Oar Length"
                    id="oar-length"
                    sx={{ m: 1, width: '25ch' }}
                    value={oarLength}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleOarLengthChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                />
                <TextField
                    label="Inboard"
                    id="inboard"
                    sx={{ m: 1, width: '25ch' }}
                    value={inboard}
                    inputProps={{ inputMode: 'numeric', type: 'tel', }}
                    onChange={handleInboardChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                />
            </Box>
            <h2>
                Gearing Ratio: {gearingRatio}
            </h2>
            <h2>
                Over Lap: {overLap}
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
            <h3>
                Sweep Example
            </h3>
            <SweepExample />
        </>
    );
};

const ScullingExample = () => {
    function createData(
        scull,
        span,
        length,
        inboard,
        outboard,
        overlap,
        gearingRatio
    ) {
        return { scull, span, length, inboard, outboard, overlap, gearingRatio };
    }

    const rows = getScullingExample().map((x) => {
        return createData(x.Scull, x.Span, x.OarLength, x.Inboard, x.Outboard, x.Overlap, x.GearingRatio)
    });

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="sculling table">
                <caption>
                    cf. High Performance Rowing (John McArthur)
                    <br></br>
                    Gearing ratio = Outboard / (Span/2)
                    <br></br>
                    Overlap for scull = Inboard*2 - Span
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Scull</TableCell>
                        <TableCell align="right">Span</TableCell>
                        <TableCell align="right">Oar<br></br>Length</TableCell>
                        <TableCell align="right">Inboard</TableCell>
                        <TableCell align="right">Outboard</TableCell>
                        <TableCell align="right">OveLap</TableCell>
                        <TableCell align="right">Gearing<br></br>Ratio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.scull}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.scull}
                        </TableCell>
                        <TableCell align="right">{row.span}</TableCell>
                        <TableCell align="right">{row.length}</TableCell>
                        <TableCell align="right">{row.inboard}</TableCell>
                        <TableCell align="right">{row.outboard}</TableCell>
                        <TableCell align="right">{row.overlap}</TableCell>
                        <TableCell align="right">{row.gearingRatio}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

const SweepExample = () => {
    function createData(
        sweep,
        spread,
        length,
        inboard,
        outboard,
        overlap,
        gearingRatio
    ) {
        return { sweep, spread, length, inboard, outboard, overlap, gearingRatio };
    }

    const rows = getSweepExample().map((x) => {
        return createData(x.Sweep, x.RiggerSpread, x.OarLength, x.Inboard, x.Outboard, x.Overlap, x.GearingRatio)
    });

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="sweep table">
                <caption>
                    cf.&nbsp;
                    <Link href="https://d2wmdlq830ho5j.cloudfront.net/worldrowing/wp-content/uploads/2020/12/04183534/CoachingManualLevelII_English.pdf">
                        The FISA Coaching Development Program;&nbsp;
                    </Link>
                    Club level for Big Blade
                    <br></br>
                    Oar length of Fat Smoothy is 5cm shorter than Bigblade or Smoothy.
                    <br></br>
                    Overlap for sweep = Inboard - Spread
                    <br></br>
                    Gearing ratio = outboard / Rigger Spread
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Sweep</TableCell>
                        <TableCell align="right">Rigger<br></br>Spread</TableCell>
                        <TableCell align="right">Oar<br></br>Length</TableCell>
                        <TableCell align="right">Inboard</TableCell>
                        <TableCell align="right">Outboard</TableCell>
                        <TableCell align="right">OveLap</TableCell>
                        <TableCell align="right">Gearing<br></br>Ratio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.sweep}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.sweep}
                        </TableCell>
                        <TableCell align="right">{row.spread}</TableCell>
                        <TableCell align="right">{row.length}</TableCell>
                        <TableCell align="right">{row.inboard}</TableCell>
                        <TableCell align="right">{row.outboard}</TableCell>
                        <TableCell align="right">{row.overlap}</TableCell>
                        <TableCell align="right">{row.gearingRatio}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

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
};

export default GearRatio;
