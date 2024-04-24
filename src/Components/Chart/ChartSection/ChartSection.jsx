import React, { useEffect, useState } from 'react'
import './ChartSection.css'
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { IP } from '../../../App'



const COLORS = ["#ff5c5c", '#FFBB28'];

export default function ChartSection() {

    const [chart, setChart] = useState("")

    const getChartData = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/form/data-label-count/`, {
                headers,
            })

            if (response.status === 200) {
                setChart(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getChartData()
    }, [])

    const data = [

        { name: 'High', value: chart?.two },
        { name: 'Low', value: chart?.one },
    ];

    const precantageLow = (chart?.one * 100) / (chart?.one + chart?.two)
    const precantageHight = (chart?.two * 100) / (chart?.one + chart?.two)

    const data2 = [
        {
            labale: "High",
            value: chart?.two,
            precentage: precantageHight && precantageHight.toFixed(2)
        },
        {
            labale: "Low",
            value: chart?.one,
            precentage: precantageLow && precantageLow.toFixed(2)
        },

    ]

    return (
        <>
            <div className='ChartSection-container'>
                <PieChart width={300} height={200}>
                    <text x="48%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="#333">{chart?.one + chart?.two}</text>
                    <Pie
                        data={data}
                        cx={140}
                        cy={90}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div className="table-chart-container">
                    <Table
                        style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}
                        className='table-chart text-left '>
                        <thead>
                            <tr style={{ borderBottom: "1px solid lightgray" }}>
                                <th className='header-table'>Lable</th>
                                <th className='header-table'>Number</th>
                                <th className='header-table'>%</th>
                            </tr>
                        </thead>
                        <tbody className='body-table'>
                            {
                                data2.map((item, i) => (
                                    <tr className='tr-chart' key={i}>
                                        <td className='d-flex align-items-center justify-content-center'>
                                            <div className={`${item.labale === "High" ? "highDot" : "lowDot"}`}></div>
                                            {item.labale}
                                        </td>
                                        <td>{item.value}</td>
                                        <td>{item.precentage}%</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )
}
