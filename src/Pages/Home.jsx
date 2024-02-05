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


export default function Home() {
    const navigate = useNavigate()
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

    }

    return (
        <>{
            showForm ? <AddNewForm
                showForm={showForm}
                back={openFormHandler}
                mainForm={mainForm}
                isDelete={isDelete}
            /> :
                <div className="home-container">
                    <div className='recentForm-conteiner'>
                        <div className="allFormText">
                            <Link className='linkAll-form' to={'/allform'}>All Form <ChevronRightIcon /></Link>
                        </div>
                        <div className='recentForm mt-3'>
                            <div className='grid-form-recentItem d-flex '>
                                {
                                    allform.length > 0 && allform.map(form => (
                                        <Col
                                            style={{ position: "relative" }}
                                            key={form.uuid}
                                            className='item-recent'
                                            xs={12} md={4}
                                            onClick={() => {
                                                openFormHandler();
                                                setFromuuid(form.uuid);
                                                setMainForm(form)
                                            }}
                                        >
                                            <div className="col-container">
                                                <FormOverView formData={form} />
                                            </div>
                                            <span
                                                style={{ position: "absolute", bottom: "2%", zIndex: "99", right: "2%" }}>
                                                <DeleteForeverIcon
                                                    className='deleteFormIcon'
                                                    onClick={() => {
                                                        openFormHandler()
                                                        setIsDelete(true)
                                                    }} />
                                            </span>
                                        </Col>
                                    ))
                                }



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



