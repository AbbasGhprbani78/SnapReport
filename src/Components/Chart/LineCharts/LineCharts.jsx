import React, { useState, useEffect } from 'react';
import './LineCharts.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { IP } from '../../../App';

export default function LineCharts() {
    const [lineData, setLineData] = useState("");

    const getlineChart = async () => {
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
            (e);
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        getlineChart();
    }, []);

    return (
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
                    <Line type="monotone" dataKey="low" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


const CustomTooltip = ({ active, payload }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p>{`Date: ${payload[0].payload.year}-${payload[0].payload.month}`}</p>
                <p style={{ color: "#8884d8" }}>{`${payload[0].name}: ${payload[0].value}`}</p>
                <p style={{ color: "#82ca9d" }}>{`${payload[1].name}: ${payload[1].value}`}</p>
            </div>
        );
    }

    return null;
};
