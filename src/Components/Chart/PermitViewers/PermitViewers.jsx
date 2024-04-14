import React from 'react'
import './ChartViewers.css'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export default function PermitViewers({ valueViewers }) {


    const data1 = [
        { name: "There is no permit from", value: 100, fill: '#d3d3d3' },
    ];

    const data2 = [
        { name: "Reject", value: valueViewers?.reject_count, fill: '#ff5c5c' },
        { name: "Accept", value: valueViewers?.accept_count, fill: '#4c6fff' },
        { name: "Pending", value: valueViewers?.none_count, fill: '#ffae42' },
    ];

    return (
        <>
            <div className='ChartViewers mb-3'>
                <p className="viewer-title">Status of permit forms</p>
                <div className='PieChart-wrapper' style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={
                                    valueViewers.reject_count === 0 &&
                                        valueViewers.reject_count === 0 &&
                                        valueViewers.reject_count === 0 ?
                                        data1 :
                                        data2
                                }
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
