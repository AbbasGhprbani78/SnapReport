import React from 'react'
import '../Style/Home.css'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
export default function Home() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <div className='recentForm-conteiner'>
                <div className="allFormText">
                    <Link className='linkAll-form' to={'/allform'}>All Form <ChevronRightIcon /></Link>
                </div>
                <div className='recentForm mt-3'>
                    <Grid className='grid-form-recentItem' container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Item className='item-recent'>xs=4</Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item className='item-recent'>xs=4</Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item className='item-recent'>xs=4</Item>
                        </Grid>

                    </Grid>
                </div>
            </div>
        </>
    )
}
