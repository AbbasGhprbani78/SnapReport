import React from 'react'
import '../PermitViewers/ChartViewers.css'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Viewers1({ kindForm }) {

    const data1 = [
        { name: "There is no form", value: 100, fill: '#d3d3d3' },
    ];

    const data2 = [
        { name: 'Permit', value: kindForm.permit_count, fill: '#9747ff' },
        { name: 'Accident', value: kindForm.accident_count, fill: '#2fcd96' },
        { name: 'Violations', value: kindForm.violation_count, fill: '#CC3366' },
        { name: 'Inpections', value: kindForm.inspections_count, fill: '#ffa500' },
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
                            data={
                                kindForm.permit_count === 0 &&
                                    kindForm.accident_count === 0 &&
                                    kindForm.violation_count === 0 &&
                                    kindForm.inspections_count === 0 ?
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
    )
}
