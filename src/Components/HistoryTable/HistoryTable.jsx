import React from 'react'
import './HistoryTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IP } from '../../App'
import data from '../../Data/Data';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function HistoryTable({ setShowHistory }) {


    const [locations, setLocation] = useState(data)
    const [filterLoc, setFilterLoc] = useState(data)

    // console.log(data)


    const getHistoryLocation = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}//`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data)
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    const changeStatus = (status) => {
        if (status === "all") {
            setFilterLoc(locations)
        } else {
            const filterStatusLocation = [...locations].filter(loc => loc.label == status)
            setFilterLoc(filterStatusLocation)
        }
    }

    const changeLoctions = (status) => {
        if (status === "all") {
            setFilterLoc(locations)
        } else {
            const filterStatusLocation = [...locations].filter(loc => loc.location == status)
            setFilterLoc(filterStatusLocation)
        }
    }


    const showMessage = () => {
        swal({
            title: `Form Filled`,
            button: "OK"
        })
    }
    
    return (
        <div style={{ padding: "0 20px" }}>
            <div className='my-3'>
                <div
                    onClick={() => setShowHistory(false)}
                    style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                >
                    <ArrowBackIcon
                        style={{ fontSize: "1rem", cursor: "pointer" }} />back
                </div>
            </div>
            <TableContainer component={Paper} style={{ maxHeight: 600 }} >
                <Table sx={{ minWidth: 750 }} stickyHeader aria-label="sticky table" >
                    <TableHead >
                        <TableRow >
                            <TableCell className='head-table-r' align="center">
                                <select className='dropdown-table' onChange={e => changeStatus(e.target.value)}>
                                    <option value={"all"}>Status</option>
                                    <option value={0}>No Accident</option>
                                    <option value={1}>Low</option>
                                    <option value={2}>High</option>
                                </select>
                            </TableCell>
                            <TableCell className='head-table-r' align="center">
                                <select className='dropdown-table' onChange={e => changeLoctions(e.target.value)}>
                                    <option value={"all"}>Locations</option>
                                    {
                                        locations?.map(loc => (
                                            <option key={loc.id} value={loc.location}>{loc.location}</option>
                                        ))
                                    }
                                </select>
                            </TableCell>
                            <TableCell className='head-table-r' align="center">Description</TableCell>
                            <TableCell className='head-table-r' align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterLoc?.map((loc) => (
                            <TableRow
                                key={loc.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={`${loc.label === 1 ? "row-low" : loc.label === 2 ? "row-hight" : "row-noaccident"}`}
                            >
                                <TableCell align="center d-flex  one-col" style={{ marginLeft: "10px" }} className={`fi-col ${loc.label === 1 ? "lable1" : loc.label === 2 ? "lable2" : "lable0"}`}>
                                    <div className="loader2"></div>
                                    {loc.label === 1 ? "Low" : loc.label === 2 ? "High" : "No Accident"}

                                </TableCell>
                                <TableCell className='two-col-c' align="center">{loc.location}</TableCell>
                                <TableCell className='two-col-c' align="center">
                                    {
                                        loc.label === 2 ? `In ${loc.location} there is a high risk of an accident` :
                                            loc.label === 1 ? `In ${loc.location}there is a low risk of an accident ` :
                                                `In ${loc.location} there is no accident`
                                    }
                                </TableCell>
                                < TableCell >
                                    {
                                        loc.status === 1 &&
                                        <button className='btn-sent'>Sent</button>
                                    }
                                    {
                                        loc.status === 2 &&
                                        <button className='btn-filled' onClick={showMessage}>Form Filled</button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    )
}
