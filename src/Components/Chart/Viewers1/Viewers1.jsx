import React from 'react'
import '../PermitViewers/ChartViewers.css'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Viewers1({ kindForm }) {

    const data01 = [

        { name: 'Permit', value: kindForm.permit_count, fill: '#a6b7d4' },
        { name: 'Accident', value: kindForm.permit_accident, fill: '#ff92ae' },
        { name: 'Violations', value: kindForm.permit_violation, fill: '#4c6fff' },
        { name: 'Inpections', value: kindForm.inspections_count, fill: '#4c6fff' },
    ];
    return (
        <div className='ChartViewers mb-3'>
            <p className="viewer-title">All Form</p>
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
