import React, { useState } from 'react'
import './Search.css'
import FormOverView from '../../Components/FormOverView/FormOverView'
import { useContext } from 'react';
import { SearchContext } from '../../Components/Context/SearchContext';
import { Col } from 'react-bootstrap';
import FIllItem2 from '../../Components/FillItem/FIllItem2';

export default function Search() {

    const { searchResult } = useContext(SearchContext);
    const [showForm, setShowForm] = useState(false);
    const [mainForm, setMainForm] = useState("");

    const backHandler = () => {
        setShowForm(false)
    }

    const openFormHandler = (uuid) => {
        const filterForm = searchResult?.filter(form => form.uuid === uuid)
        console.log(filterForm)
        setMainForm(filterForm)
        setShowForm(true)
    }

    return (
        <>
            {
                showForm ?
                    <>
                        <div>
                        
                        </div>
                    </> :
                    <>
                        <div className='searchpagecontainer'>
                            {
                                searchResult && searchResult.length > 0 &&
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
                                    </Col>
                                ))
                            }
                        </div>
                    </>
            }

        </>

    )
}
