import React, { useState, useEffect } from 'react'
import '../Style/AllForm.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddNewForm from './AddNewForm';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function AllForm() {

    const [showForm, setShowForm] = useState(false)
    const [allform, setAllForm] = useState([])
    const [mainForm, setMainForm] = useState(null)
    const [formuuid, setFromuuid] = useState(null)

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
        if (showForm) {

        }
    }
    return (
        <>{
            showForm ? <AddNewForm showForm={showForm} back={openFormHandler} /> :
                <Grid container spacing={2} style={{ padding: "13px" }}>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        onClick={() => {
                            openFormHandler
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <Item className='allFormItem'>xs=8</Item>
                    </Grid>
                </Grid>
        }

        </>
    )
}
