import React from 'react'
import './ChartSection.css'
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Table from 'react-bootstrap/Table'
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const data2 = [
    {
        labale: "lable1",
        value: 12,
        precentage: 40
    },
    {
        labale: "lable1",
        value: 45,
        precentage: 17
    },
    {
        labale: "lable1",
        value: 22,
        precentage: 65
    },
    {
        labale: "lable1",
        value: 30,
        precentage: 67
    },
    {
        labale: "lable1",
        value: 45,
        precentage: 17
    },
    {
        labale: "lable1",
        value: 22,
        precentage: 65
    },
    {
        labale: "lable1",
        value: 30,
        precentage: 67
    },
    {
        labale: "lable1",
        value: 45,
        precentage: 17
    },
    {
        labale: "lable1",
        value: 22,
        precentage: 65
    },
    {
        labale: "lable1",
        value: 30,
        precentage: 67
    },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function ChartSection() {
    return (
        <>
            <div className='ChartSection-container'>
                <PieChart width={300} height={200}>
                    <Pie
                        data={data}
                        cx={140}
                        cy={90}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
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
                                <th className='header-table'>Value</th>
                                <th className='header-table'>%</th>
                            </tr>
                        </thead>
                        <tbody className='body-table'>
                            {
                                data2.map(item => (
                                    <tr className='tr-chart'>
                                        <td>{item.labale}</td>
                                        <td >{item.value}</td>
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
