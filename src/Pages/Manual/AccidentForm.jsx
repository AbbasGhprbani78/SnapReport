import React, { useEffect, useState } from 'react'
import '../../Style/AccidentForm.css'
import ConditionFormBox from '../../Components/ConditionFormBox/ConditionFormBox'
import TopSection from '../../Components/TopSection/TopSection'
import Header from '../../Components/Header/Header'
import axios from 'axios'
import { IP } from '../../App'
import PlaceForm from '../../Components/PlaceForm/PlaceForm'
export default function AccidentForm() {

    const [accidentFroms, setAccidentForms] = useState([])
    const [showForm, setShowForm] = useState(false)


    const getAllAccidentForm = async () => {
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
                // setAccidentForms(response.data)
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
    //     getAllAccidentForm()
    // }, [])


    const openFormHandler = () => {
        setShowForm(true)
    }

    const backHandler = () => {
        setShowForm(false)
    }



    const getFormsCompleted = async () => {
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
                setFormData(response.data)
            }

        } catch (e) {
            console.log(e)
            // if (e.response.status === 401) {
            //     localStorage.clear()
            //     navigate("/login")
            // }
        }
    }

    // useEffect(() => {
    //     getFormsCompleted()
    // }, [])

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
                        <div className='accident-page'>
                            <Header />
                            <TopSection
                                text="Accident Form"
                            />
                            <div className="accidentForm-container">
                                < ConditionFormBox
                                    styleCalss={"greendot"}
                                    title={"Accident Form"}
                                    openFormHandler={openFormHandler}
                                />
                                < ConditionFormBox
                                    styleCalss={"greendot"}
                                    title={"Accident Form"}
                                    openFormHandler={openFormHandler}
                                />
                                < ConditionFormBox
                                    styleCalss={"greendot"}
                                    title={"Accident Form"}
                                    openFormHandler={openFormHandler}
                                />
                                < ConditionFormBox
                                    styleCalss={"greendot"}
                                    title={"Accident Form"}
                                    openFormHandler={openFormHandler}
                                />
                            </div>
                        </div>
                    </>)
            }

        </>

    )
}
