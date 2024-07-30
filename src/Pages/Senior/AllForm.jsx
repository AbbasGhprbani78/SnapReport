import React, { useState, useEffect } from 'react'
import '../../Style/AllForm.css'
import AddNewForm from './AddNewForm';
import FormOverView from '../../Components/FormOverView/FormOverView';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import axios from 'axios';
import { IP } from '../../App';
import Header from '../../Components/Header/Header'; import AiHeader from '../../Components/AiHeader/AiHeader';
;

export default function AllForm() {

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
            const response = await axios.get(`${IP}/form/get-user-form/`, {
                headers,
            });
            if (response.status === 200) {
                setAllForm(response.data)
            }


        } catch (e) {

            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                localStorage.removeItem("type")
                localStorage.removeItem("type")
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
                showForm ?
                    <AddNewForm
                        showForm={showForm}
                        back={backHandler}
                        mainForm={mainForm}
                        isDelete={isDelete}
                        getAllForm={getAllForm}

                    /> :
                    <div style={{ width: "100%" }}>
                        <Header />
                        <AiHeader />
                        <div className={`${allform.length === 0 ? "emptyForm" : ""} allForm-container`} >

                            {
                                allform && allform.length > 0 && allform.slice().reverse().map(form => (
                                    <div
                                        className='item-recent'
                                        key={form.uuid}
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
                                    </div>
                                ))
                            }

                        </div>
                    </div>

            }

        </>
    )
}
