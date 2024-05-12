import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { IP } from '../../App'
import './TableLocation.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



export default function TableLocation() {


    const [locations, setLocation] = useState()

    useEffect(() => {
        const getlocationCount = async () => {
            const access = localStorage.getItem("access")
            const headers = {
                Authorization: `Bearer ${access}`
            };
            try {
                const response = await axios.get(`${IP}/form/last-loc-status/`, {
                    headers,
                })

                if (response.status === 200) {
                    const data = response.data;
                    const dataLength = data.length;
                    const labels = [];

                    // Generate labels with desired distribution
                    for (let i = 0; i < dataLength; i++) {
                        if (i < Math.floor(dataLength * 0.7)) {
                            labels.push(0); // 70% of labels as 0
                        } else if (i < Math.floor(dataLength * 0.9)) {
                            labels.push(2); // 20% of labels as 2
                        } else {
                            labels.push(1); // 10% of labels as 1
                        }
                    }

                    // Shuffle the labels array
                    for (let i = labels.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [labels[i], labels[j]] = [labels[j], labels[i]];
                    }

                    const updatedLocations = data.map((location, index) => ({
                        ...location,
                        label: labels[index]
                    }));
                    setLocation(updatedLocations);
                    console.log(updatedLocations);
                }

            } catch (e) {
                console.log(e)
                if (e.response.status === 401) {

                    localStorage.clear()
                    navigate("/login")
                }
            }
        }
        getlocationCount()
    }, [])

    return (
        <>
            <p className='mb-3 fw-bold'>Locations Status Monitoring </p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell className='head-table-r' align="center">Status</TableCell>
                            <TableCell className='head-table-r' align="center">Location</TableCell>
                            <TableCell className='head-table-r' align="center">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations?.map((loc) => (
                            <TableRow
                                key={loc.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={`${loc.label === 0 ? "row-noaccident" : loc.label === 1 ? "row-low" : loc.label === 2 ? "row-hight" : ""}`}
                            >
                                <TableCell align="center d-flex  one-col" style={{ marginLeft: "10px" }} className={`fi-col ${loc.label === 0 ? "lable0" : loc.label === 1 ? "lable1" : loc.label === 2 ? "lable2" : ""}`}>
                                    <div class="loader2"></div>
                                    {loc.label === 0 ? "No Accident" : loc.label === 1 ? "Low" : loc.label === 2 ? "High" : ""}

                                </TableCell>
                                <TableCell className='two-col-c' align="center">{loc.location}</TableCell>
                                <TableCell className='two-col-c' align="center">
                                    {loc.label === 0 ? `In ${loc.location} there is no accident` :
                                        loc.label === 2 ? `In ${loc.location} there is a high risk of an accident` :
                                            loc.label === 1 ? `In ${loc.location}there is a low risk of an accident ` :
                                                null
                                    }
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const data = [
    { id: 35180, date: '2024-04-23', label: 0 },
    { id: 35180, date: '2024-04-23', label: 1 },
    { id: 35180, date: '2024-04-23', label: 2 },
]
