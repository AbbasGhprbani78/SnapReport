import React, { useState, useEffect } from 'react';
import './LineCharts.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { IP } from '../../../App';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LineCharts() {
    const [lineData, setLineData] = useState("");
    const [valueBarChart, setValueBarChart] = useState("All");

    const allLineChart = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/label-count/`, {
                headers,
            });

            if (response.status === 200) {
                const processedData = response.data.map(item => {
                    const [year, month, day] = item.month.split('-');

                    return {
                        ...item,
                        date: `${month}-${day}`,
                        year: year,
                        month: month,
                        day: day,
                        low: item.label_1_count,
                        high: item.label_2_count
                    };
                });

                setLineData(processedData);
            }
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getlineChart = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/loc-label-count/${valueBarChart}`, {
                headers,
            });

            if (response.status === 200) {
                const processedData = response.data.map(item => {
                    const [year, month, day] = item.month.split('-');

                    return {
                        ...item,
                        date: `${month}-${day}`,
                        year: year,
                        month: month,
                        day: day,
                        low: item.label_1_count,
                        high: item.label_2_count
                    };
                });

                setLineData(processedData);
            }
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        allLineChart()
    }, [])

    useEffect(() => {
        getlineChart();
    }, [valueBarChart]);

    const handleChangechart = (event) => {
        setValueBarChart(event.target.value);
    };
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
