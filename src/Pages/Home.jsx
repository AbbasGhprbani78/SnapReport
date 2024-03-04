import React, { useState, useEffect } from 'react'
import '../Style/Home.css'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';;
import { Col } from 'react-bootstrap';
import AddNewForm from './AddNewForm';
import { IP } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormOverView from '../Components/FormOverView/FormOverView';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Header from '../Components/Header/Header'


export default function Home() {

    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
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
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getAllForm()
    }, [])


    const openFormHandler = () => {
        setShowForm(true)
        if (!showForm) {
            setIsDelete(false)
        }
    }
    const backHandler = () => {
        setShowForm(false)
    }

    return (

        <>

            {
                showForm ? <AddNewForm
                    showForm={showForm}
                    back={backHandler}
                    mainForm={mainForm}
                    isDelete={isDelete}
                    getAllForm={getAllForm}
                /> :
                    <div className="home-container">
                        <Header />
                        <div className='recentForm-conteiner'>
                            <div className="allFormText">
                                <Link className='linkAll-form' to={'/allform'}>All Form <ChevronRightIcon /></Link>
                            </div>
                            <div className='recentForm '>
                                <div className='grid-form-recentItem d-flex '>
                                    {
                                        allform.length > 0 ? allform.map(form => (
                                            <Col
                                                style={{ position: "relative" }}
                                                key={form.uuid}
                                                className='item-recent'
                                                xs={12} md={4}
                                            >
                                                <div className="col-container">
                                                    <FormOverView formData={form} />
                                                </div>
                                                <div>
                                                    <div
                                                        className='actions-form'
                                                    >
                                                        <div
                                                            onClick={() => {

                                                                openFormHandler();
                                                                setMainForm(form);
                                                            }}
                                                            style={{ cursor: "pointer" }}

                                                        >
                                                            <EditCalendarIcon
                                                                className='editFormIcom'
                                                            />
                                                        </div>

                                                        <div
                                                            onClick={() => {

                                                                openFormHandler()
                                                                setMainForm(form)
                                                                setIsDelete(true)
                                                            }}
                                                            style={{ cursor: "pointer" }}

                                                        >
                                                            <DeleteForeverIcon
                                                                className='deleteFormIcon'

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        )) : <div className='noform'>There is no form</div>}
                                </div>
                            </div>
                        </div>
                        <div className="defaultFormText">
                            <span className='linkAll-form'>Default Forms</span>
                        </div>
                    </div>
            }

        </>
    )
}




