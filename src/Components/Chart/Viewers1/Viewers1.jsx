import React from 'react'
import '../PermitViewers/ChartViewers.css'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export default function Viewers1({ kindForm }) {

    const data1 = [
        { name: "There is no form", value: 100, fill: '#d3d3d3' },
    ];

    const data2 = [
        { name: 'Permit', value: kindForm[1]?.value, fill: '#9747ff' },
        { name: 'Accident', value: kindForm[3]?.value, fill: '#2fcd96' },
        { name: 'Violations', value: kindForm[4]?.value, fill: '#CC3366' },
        { name: 'Inpections', value: kindForm[2]?.value, fill: '#ffa500' },
    ];

    return (
        <div className='ChartViewers mb-3'>
            <p className="viewer-title">All Filled Forms</p>
            <div className="d-flex mt-2">
                <div>
                    <div className="permit-status-color d-flex">
                        <div className='dot permitdot mb-2'></div>
                        <span style={{ fontSize: ".8rem" }}>Permit</span>
                    </div>
                    <div className="permit-status-color d-flex ">
                        <div className='dot accidentdot mb-2'></div>
                        <span style={{ fontSize: ".8rem" }}>Accident</span>
                    </div>
                    <div className="permit-status-color d-flex">
                        <div className='dot violationdot mb-2'></div>
                        <span style={{ fontSize: ".8rem" }}>Violations</span>
                    </div>
                    <div className="permit-status-color d-flex ">
                        <div className='dot inspectionsdot mb-2'></div>
                        <span style={{ fontSize: ".8rem" }}>Inpections</span>
                    </div>
                </div>
                <div className='PieChart-wrapper' style={{ width: "100%", height: 300, marginLeft: "10px" }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={
                                    kindForm ?
                                        data2 :
                                        data1
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
        </div>
    )
}
