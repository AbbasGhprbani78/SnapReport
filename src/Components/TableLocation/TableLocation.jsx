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
import CloseIcon from '@mui/icons-material/Close';


export default function TableLocation({ setShowHistory }) {

    const [locations, setLocation] = useState()
    const [filterLoc, setFilterLoc] = useState([])
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [manualWorker, setManualWorker] = useState("-1")
    const [randomId, setRandomId] = useState("")
    const [error, setError] = useState(false)
    const [name, setName] = useState("")



    const getUser = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/user/get-manual-worker/`, {
                headers,
            })

            if (response.status === 200) {

                setUsers(response.data)
              
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

    const handleChangeSelcet = (e) => {
        setManualWorker(e.target.value)
        const userUuid = e.target.value
        const selectUser = users.find(user => user.uuid === userUuid)
        if (selectUser) {
            setName(selectUser.first_name)
        }
    }



    const openModalTable = (id) => {
        setShowModal(true)
        getUser()
        setRandomId(id)
    }


    const sendDataHandler = async () => {

        if (manualWorker === "-1") {
            setError(true)
            return false
        }
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            data_id: randomId,
            user_id: manualWorker
        }
        try {
            const response = await axios.post(`${IP}/form/change-random-data-status/`, body, {
                headers,
            })

            if (response.status === 200) {
                setError(false)
                setManualWorker("")
                setShowModal(false)

                swal({
                    title: `request send to ${name}`,
                    icon: "success",
                    buttons: "yes"
                })
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
            setError(false)
        }
    }


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
                    setLocation(response.data);
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
        getlocationCount()
    }, [])



    return (
        <>
            <div className={`modal-tabel-container ${showModal ? "modal-tabel-active" : ""}`}>
                <div className="close-modal-table" onClick={() => setShowModal(false)}></div>
                <div className="modal-table">
                    <div className='sendto d-flex justify-content-between align-items-center'>
                        <p className='sendto-text'> Send To</p>
                        <CloseIcon onClick={() => setShowModal(false)} style={{ cursor: "pointer" }} />
                    </div>
                    <div className='modal-table-contant'>
                        <div className='wrap-drop-modal mb-2'>
                            <select className='drop-modal' onChange={handleChangeSelcet}>
                                <option selected value="-1" disabled style={{ color: "#c7c7c7" }}>select user</option>
                                {
                                    users.length > 0 && users.map(user => (
                                        <option option value={user.uuid} > {user.first_name} {user.last_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {error && <span className='text-center' style={{ color: "#CC3366" }}>please select user !</span>}
                        <div>
                            <button className='btn-sendto' onClick={sendDataHandler} >send</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-between align-items-start mb-3'>
                <p className='fw-bold'>Locations Status Monitoring </p>
                <button className='btn-history-table' onClick={() => setShowHistory(true)}>History</button>
            </div>
            <TableContainer component={Paper} style={{ maxHeight: 500 }} >
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
                                        loc.status == 0 &&
                                        <button className='btn-ac-table' onClick={() => openModalTable(loc.id)}>Send</button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
}


// const dataLength = data.length;
// const labels = [];

// // Generate labels with desired distribution
// for (let i = 0; i < dataLength; i++) {
//     if (i < Math.floor(dataLength * 0.7)) {
//         labels.push(0); // 70% of labels as 0
//     } else if (i < Math.floor(dataLength * 0.9)) {
//         labels.push(2); // 20% of labels as 2
//     } else {
//         labels.push(1); // 10% of labels as 1
//     }
// }

// // Shuffle the labels array
// for (let i = labels.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [labels[i], labels[j]] = [labels[j], labels[i]];
// }

// const updatedLocations = data.map((location, index) => ({
//     ...location,
//     label: labels[index]
// }));


