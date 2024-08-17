
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { IP } from '../../App'

export default function BarChartSection() {

    const [data, setData] = useState("")

    const getDataBarChart = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/locations-count/`, {
                headers,
            })

            if (response.status === 200) {
                const formattedData = Object.entries(response.data).map(([name, number]) => ({ name: name.replace(/_/g, ' '), number }));
                setData(formattedData);
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getDataBarChart()
    }, [])


    return (
        <>
            <div style={{ height: 300, width: "100%", fontSize: '.7rem' }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis label={{ value: 'Number Of Accidents', angle: -90, position: 'insideRight' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="number" fill="#4285f4" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </>
    )
}


const CustomTooltip = ({ active, payload }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p style={{ color: "#000" }}>{`${payload[0]?.payload?.name} : ${payload[0]?.payload?.number}`}</p>
            </div>
        );
    }

    return null;
};





