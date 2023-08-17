const intensityZone = [
    { 
        category: 'AN',
        upperRatio: 1.1,
        lowerRatio: 1.01,
        caption: 'Training above this pace for muscle capacity/anaerobic training',
    },
    { 
        category: 'TR',        
        upperRatio: 1,
        lowerRatio: 0.89 ,
        caption: 'Aerobic Power Training, less than intensity of 2 km test/competition (ergometer) ',
    },
    { 
        category: 'AT',
        upperRatio: 0.9,
        lowerRatio: 0.75 ,
        caption: 'Aerobic Capacity Training, less than pace of 6 km test but higher than 60 minute test (ergometer)',
    },
    { 
        category: 'U1 and U2',
        upperRatio: 0.74,
        lowerRatio: 0.59, 
        caption: 'Aerobic Endurance training at an intensity just below that of the 60 minute test pace.',
    },
    { 
        category: 'U3',
        upperRatio: 0.58,
        lowerRatio: 0.46,
        caption: 'Active Recovery Pace - recovering from races or tests.',
    },
];

export function getIntensityZone() {
    return intensityZone;
}