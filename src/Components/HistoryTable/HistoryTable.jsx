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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FillItem from '../FillItem/FillItem';

export default function HistoryTable({ setShowHistory }) {

    const [locations, setLocation] = useState()
    const [filterLoc, setFilterLoc] = useState()
    const [allForm, setAllForm] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [acceptForm, setAcceptForm] = useState("")
    const [checks, setChecks] = useState('')

   


    const getHistoryLocation = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/get-all-data-random/`, {
                headers,
            })

            if (response.status === 200) {
                setLocation(response.data)
                setFilterLoc(response.data)
             
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


    const getAllFillForms = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/all-full-form/`, {
                headers,
            })

            if (response.status === 200) {
                setAllForm(response.data.forms)

            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    const selectMainForm = (group) => {
        const mainForm = allForm?.find(form => form?.fields[0]?.checks[0]?.group == group)
        setAcceptForm(mainForm)
    }

    const showMessage = (group) => {
        swal({
            title: `Form Filled with code : ${group}`,
            button: "OK"
        }).then((value) => {
            if (value) {
                setShowForm(true)
            }
        })
    }


    useEffect(() => {
        getHistoryLocation()
        getAllFillForms()
    }, [])


    return (
        <div >
            {
                showForm ?
                    <>
                        <div className='searchpage'>
                            <div
                                onClick={() => setShowForm(false)}
                                style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                                className='mb-3'
                            >
                                <ArrowBackIcon
                                    style={{ fontSize: "1rem", cursor: "pointer" }} />back
                            </div>


                            <div className='search-item-wrappper'>
                                <div className='search-item-content'>
                                    <h3 className='from-title'>{acceptForm?.title}</h3>
                                    <p className='from-description'>{acceptForm?.descriptions}</p>
                                    {
                                        acceptForm?.fields.map(field => (
                                            <>
                                                <FillItem
                                                    key={field.uuid}
                                                    field={field}
                                                    setChecks={setChecks}
                                                />
                                            </>

                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </> :
                    <div div style={{ padding: "0 25px" }}>
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
                                        <TableCell className='head-table-r' align="center">Date</TableCell>
                                        <TableCell className='head-table-r' align="center">Description</TableCell>
                                        <TableCell className='head-table-r' align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterLoc?.slice().reverse().map((loc) => (
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
                                            <TableCell className='two-col-c' align="center">{loc.date}</TableCell>
                                            <TableCell className='two-col-c' align="center">
                                                {
                                                    loc.label === 2 ? `In ${loc.location} there is a high risk of an accident` :
                                                        loc.label === 1 ? `In ${loc.location}there is a low risk of an accident ` :
                                                            `In ${loc.location} there is no accident`
                                                }
                                            </TableCell>
                                            < TableCell >
                                                {
                                                    loc.status == 1 &&
                                                    <button className='btn-sent'>Sent</button>
                                                }
                                                {
                                                    loc.status == 2 &&
                                                    <button
                                                        className='btn-filled'
                                                        onClick={() => {
                                                            showMessage(loc.group)
                                                            selectMainForm(loc.group)
                                                        }}>Form Filled</button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer >
                    </div>
            }

        </div>
    )
}
