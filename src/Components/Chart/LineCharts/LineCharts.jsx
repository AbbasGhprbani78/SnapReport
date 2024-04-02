import React, { useState, useEffect } from 'react'
import './LineCharts.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 47,
        pv: 38,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 23,
        pv: 12,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 65,
        pv: 35,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 41,
        pv: 19,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 60,
        pv: 59,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 52,
        pv: 44,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 78,
        pv: 27,
        amt: 2100,
    },
];


export default function LineCharts() {

    return (
        <div className='linechart-wrapper' style={{ width: '98%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );

}
