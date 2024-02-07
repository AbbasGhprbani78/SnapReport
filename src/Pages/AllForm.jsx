import React, { useState, useEffect } from 'react'
import '../Style/AllForm.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddNewForm from './AddNewForm';
import FormOverView from '../Components/FormOverView/FormOverView';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import axios from 'axios';
import { IP } from '../App';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function AllForm() {

    const [showForm, setShowForm] = useState(false)
    const [formuuid, setFromuuid] = useState(null)
    const [allform, setAllForm] = useState([])
    const [mainForm, setMainForm] = useState(null)
    const [isDelete, setIsDelete] = useState(false)

    const getAllForm = async () => {
        const access = localStorage.getItem("access")

        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/get-user-form`, {
                headers,
            });
            if (response.status === 200) {
                setAllForm(response.data)
                console.log(response)

            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                navigate("/signin")
            }
        }
    }

    useEffect(() => {
        getAllForm()
    }, [])


    const openFormHandler = () => {
        setShowForm(prevState => {
            setShowForm(!prevState)
        })
        if (!showForm) {

            setIsDelete(false)
        }

    }
    return (
        <>{
            showForm ?
                <AddNewForm
                    showForm={showForm}
                    back={openFormHandler}
                    mainForm={mainForm}
                    isDelete={isDelete}

                /> :
                <Grid container style={{ padding: "13px" }}>
                    {
                        allform && allform.length > 0 && allform.map(form => (
                            <Grid
                                className='item-recent'
                                key={form.uuid}
                                item
                                xs={12}
                                md={4}
                                onClick={() => {
                                    openFormHandler
                                }}
                                style={{ position: "relative", overflow: "hidden" }}
                            >
                                <div className="col-container">
                                    <FormOverView formData={form} />
                                </div>
                                <div className="actions-form">

                                    <span
                                        style={{ cursor: "pointer" }}

                                    >
                                        <EditCalendarIcon
                                            className='editFormIcom'
                                            onClick={() => {
                                                openFormHandler();
                                                setFromuuid(form.uuid);
                                                setMainForm(form)
                                            }}
                                        />
                                    </span>
                                    <span
                                        style={{ cursor: "pointer" }}

                                    >
                                        <DeleteForeverIcon
                                            className='deleteFormIcon'
                                            onClick={() => {
                                                openFormHandler()
                                                setMainForm(form)
                                                setIsDelete(true)
                                            }}
                                        />
                                    </span>
                                </div>
                            </Grid>
                        ))
                    }

                </Grid>
        }

        </>
    )
}
