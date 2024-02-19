import React, { useEffect, useState } from 'react'
import '../../Style/PermitForm.css'
import ConditionFormBox from '../../Components/ConditionFormBox/ConditionFormBox'
import TopSection from '../../Components/TopSection/TopSection'
import Header from '../../Components/Header/Header'
import axios from 'axios'
import { IP } from '../../App'
import PlaceForm from '../../Components/PlaceForm/PlaceForm'
export default function PermitForm() {

    const [permitForms, setPermitForms] = useState([])
    const [showForm, setShowForm] = useState(false)


    const getAllPermitForm = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}//`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
                // setPermitForms(response.data)
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                //     localStorage.clear()
                //     navigate("/login")
                // }
            }
        }
    }

    // useEffect(() => {
    //     getAllPermitForm()
    // }, [])

    const openFormHandler = () => {
        setShowForm(true)
    }

    const backHandler = () => {
        setShowForm(false)
    }

    return (
        <>
            {
                showForm ? (
                    <>
                        <PlaceForm
                            back={backHandler}
                        />
                    </>) : (
                    <>
                        <div className='permitForm-page'>
                            <Header />
                            <TopSection
                                text="Permit Form"
                            />
                            <div className="permitForm-container">
                                < ConditionFormBox
                                    styleCalss={"bluedot"}
                                    title={"PermitForm"}
                                    openFormHandler={openFormHandler}
                                />
                                < ConditionFormBox
                                    styleCalss={"bluedot"}
                                    title={"PermitForm"}
                                    openFormHandler={openFormHandler}
                                />
                                < ConditionFormBox
                                    styleCalss={"bluedot"}
                                    title={"PermitForm"}
                                    openFormHandler={openFormHandler}
                                />
                                < ConditionFormBox
                                    styleCalss={"bluedot"}
                                    title={"PermitForm"}
                                    openFormHandler={openFormHandler}
                                />
                            </div>
                        </div>
                    </>)
            }

        </>

    )
}
