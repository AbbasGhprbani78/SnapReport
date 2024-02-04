import React, { useState } from 'react'
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
                        onClick={openFormHandler}
                    >
                        <Item className='allFormItem'>xs=8</Item>
                    </Grid>
                </Grid>
        }

        </>
    )
}
