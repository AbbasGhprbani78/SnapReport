import React, { useState } from 'react'
import './Search.css'
import FormOverView from '../../Components/FormOverView/FormOverView'
import { useContext } from 'react';
import { SearchContext } from '../../Components/Context/SearchContext';
import { Col } from 'react-bootstrap';
import FillItem from '../../Components/FillItem/FillItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Header from '../../Components/Header/Header';
export default function Search() {

    const { searchResult } = useContext(SearchContext);
    const [showForm, setShowForm] = useState(false);
    const [mainForm, setMainForm] = useState("");
    const [checks, setChecks] = useState(null)

    const backHandler = () => {
        setShowForm(false)
    }

    const openFormHandler = (uuid) => {
        const filterForm = searchResult?.filter(form => form.uuid === uuid)
        setMainForm(filterForm)
        setShowForm(true)

    }
   

    return (
        <>
            <Header />
            {
                showForm ?
                    <>
                        <div className='searchpage'>
                            <div
                                onClick={backHandler}
                                style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                                className='mb-3'
                            >
                                <ArrowBackIcon
                                    style={{ fontSize: "1rem", cursor: "pointer" }} />back
                            </div>
                            {
                                mainForm[0]?.fields && mainForm[0]?.fields.length > 0 &&

                                <div className='search-item-wrappper'>
                                    <div className='search-item-content'>
                                        <h3 className='from-title'>{mainForm[0].title}</h3>
                                        <p className='from-description'>{mainForm[0].descriptions}</p>
                                        {
                                            mainForm[0].fields.map(field => (
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

                            }
                        </div>

                    </> :
                    <>

                        {
                            searchResult && searchResult.length > 0 ?
                                <div className='searchpagecontainer'>
                                    {
                                        searchResult.map(form => (
                                            <Col
                                                key={form.uuid}
                                                xs={12} md={6} xl={4}
                                            >
                                                <div className='item-recent1' onClick={() => openFormHandler(form.uuid)}>
                                                    <div className="col-container1">
                                                        <FormOverView formData={form} />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-center mt-2' style={{ width: "95%", color: "#9a9a9a" }}>
                                                    <span className='d-flex align-items-center '>
                                                        <FiberManualRecordIcon style={{ marginRight: "5px" }} />
                                                        {form.fields[0]?.checks[0]?.group}
                                                    </span>
                                                    <span>
                                                        <AccessTimeIcon style={{ marginRight: "5px" }} />
                                                        {dayjs(form.fields[0]?.checks[0]?.date).format('YYYY-MM-DD')}
                                                    </span>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </div>
                                :
                                <div className='w-100 d-flex text-center justify-content-center align-content-center' style={{ height: "100vh", position: "relative" }}>
                                    <p className='notitemsearch'>
                                        The requested form was not found
                                        <SentimentVeryDissatisfiedIcon style={{ fontSize: "2rem", marginLeft: "10px" }} />
                                    </p>
                                </div>
                        }

                    </>
            }

        </>

    )
}

