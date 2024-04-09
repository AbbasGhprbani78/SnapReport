import React from 'react'
import './ChartViewers.css'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';



export default function PermitViewers({ valueViewers }) {
    console.log(valueViewers)
    const data01 = [
        { name: "Reject", value: valueViewers?.reject_count, fill: '#ff92ae' },
        { name: "Accept", value: valueViewers?.accept_count, fill: '#4c6fff' },
        { name: "Pending", value: valueViewers?.none_count, fill: '#a6b7d4' },
    ];

    return (
        <>
            <div className='ChartViewers mb-3'>
                <p className="viewer-title">Permit Form</p>
                <div className='PieChart-wrapper' style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>

    )
}
