import React from 'react'
import '../PermitViewers/ChartViewers.css'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
const data01 = [
    { name: 'Group A', value: 400, fill: '#a6b7d4' },
    { name: 'Group B', value: 300, fill: '#ff92ae' },
    { name: 'Group C', value: 300, fill: '#4c6fff' },
];
export default function Viewers2() {
    return (
        <div className='ChartViewers mb-3'>
            <p className="viewer-title">Viewers</p>
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
    )
}
