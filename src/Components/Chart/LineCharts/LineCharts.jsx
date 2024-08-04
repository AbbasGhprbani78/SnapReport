import React  from 'react';
import './LineCharts.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function LineCharts({
    lineData,
    valueBarChart,
    handleChangechart,
    allLineChart
}) {




    return (
        <>
            <div className='d-flex justify-content-end mt-3'>
                <div className='drop-chart'>
                    <Box>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangechart}
                                label={"Locations"}
                                value={valueBarChart}
                            >
                                <MenuItem value={"Locations"} disabled>Locations</MenuItem>
                                <MenuItem onClick={allLineChart} value={"All"}>All</MenuItem>
                                <MenuItem value={"Steelmaking facilities"}>Steelmaking facilities</MenuItem>
                                <MenuItem value={"Costing machines"}>Costing machines</MenuItem>
                                <MenuItem value={"Rolling mills"}>Rolling mills</MenuItem>
                                <MenuItem value={"Cooling towers"}>Cooling towers</MenuItem>
                                <MenuItem value={"Emergency response stations"}>Emergency response stations</MenuItem>
                                <MenuItem value={"Safety training rooms"}>Safety training rooms</MenuItem>
                                <MenuItem value={"First aid stations"}>First aid stations</MenuItem>
                                <MenuItem value={"Restroom"}>Restroom</MenuItem>
                                <MenuItem value={"Pelletizing unit"}>Pelletizing unit</MenuItem>
                                <MenuItem value={"Dolomitization unit"}>Dolomitization unit</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className='linechart-wrapper' style={{ width: '98%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={lineData ? lineData : ""}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="low" stroke="#e29d1b" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="high" stroke="#ce0f0f" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>

    );
}

const CustomTooltip = ({ active, payload }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p>{`Date: ${payload[0]?.payload.year}-${payload[0]?.payload.month}`}</p>
                <p style={{ color: "#e29d1b" }}>{`${payload[0]?.name}: ${payload[0]?.value}`}</p>
                <p style={{ color: "#ce0f0f" }}>{`${payload[1]?.name}: ${payload[1]?.value}`}</p>
            </div>
        );
    }

    return null;
};
