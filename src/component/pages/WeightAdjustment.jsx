import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const WeightAdjustment = () => {
    const [pace, setPace] = useState({
        minutes: 1,
        seconds: 45,
        tenths: 0
    });
    const [weight, setWeight] = useState(75);
    const [standardWeight, setStandardWeight] = useState(75);

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

    const calcAdjustPace = () => {
        const currentPace = pace.minutes * 60 + pace.seconds + pace.tenths * 0.1;
        return currentPace * (((standardWeight + 22) / (Number(weight) + 22)) ** (-2/9));
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
                </Box>
                <h2>
                    Adjustment Pace: {adjustPace} /500m
                </h2>
                {/* <Divider />
                <Paper sx={{ p: 2, mt: 4, }}>
                    <Typography 
                        sx={{ color: 'caption.main', }}
                        variant="body2"
                        component="div"
                    >
                        pace = ³√(2.80/watts)
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
                </Paper> */}
            </Box>
        </>
    )
}

export default WeightAdjustment
