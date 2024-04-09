import React, { useState, useEffect } from 'react'
import './LineCharts.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { IP } from '../../../App'

export default function LineCharts() {

    const [lineData, setLineData] = useState("")

    const getlineChart = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/label-count/`, {
                headers,
            })

            if (response.status === 200) {
                const processedData = response.data.map(item => {
                    const [year, month, day] = item.date.split('-');
                    return {
                        ...item,
                        date: `${month}-${day}`,
                        low: item.label_1_count,
                        high: item.label_2_count
                    };
                });
                setLineData(processedData);
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }
    useEffect(() => {
        getlineChart()
    }, [])



    return (
        <div className='linechart-wrapper' style={{ width: '98%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={lineData ? lineData : ""}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="low" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );

}
