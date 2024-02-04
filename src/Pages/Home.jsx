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


export default function Home() {
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [formId, setFromId] = useState(null)
    const [allform, setAllForm] = useState()


    const getAllForm = async () => {
        const access = localStorage.getItem("access")
        const uuid = localStorage.getItem('uuid')
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/get-user-form/${uuid}`, {
                headers,
            });
            if (response.status === 200) {

                console.log(response)

            }

        } catch (e) {
            console.log(e)
            // if (e.response.status === 401) {
            //     localStorage.removeItem('access')
            //     localStorage.removeItem('uuid')
            //     localStorage.removeItem('refresh')
            //     navigate("/signin")
            // }
        }
    }

    useEffect(() => {
        getAllForm()
    }, [])

    const getFormInfo = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.post(`${IP}//`, {
                headers,
            });
            if (response.status === 200) {

                console.log(response)

            }

        } catch (e) {
            console.log(e)
            // if (e.response.status === 401) {
            //     localStorage.removeItem('access')
            //     localStorage.removeItem('uuid')
            //     localStorage.removeItem('refresh')
            //     navigate("/signin")
            // }
        }
    }

    const openFormHandler = () => {
        setShowForm(prevState => {
            setShowForm(!prevState)
        })
        if (showForm) {
            getFormInfo()
        }
    }


    return (
        <>{
            showForm ? <AddNewForm showForm={showForm} back={openFormHandler} /> :
                <div className="home-container">
                    <div className='recentForm-conteiner'>
                        <div className="allFormText">
                            <Link className='linkAll-form' to={'/allform'}>All Form <ChevronRightIcon /></Link>
                        </div>
                        <div className='recentForm mt-3'>
                            <div className='grid-form-recentItem d-flex '>
                                <Col className='item-recent'
                                    xs={12} md={4}
                                    onClick={openFormHandler}
                                >
                                    asfsac
                                    {/* <FormOverView formData={"dsfsfc"} /> */}
                                </Col>

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
