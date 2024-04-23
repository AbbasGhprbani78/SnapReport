import React, { useState, useEffect } from 'react'
import '../../Style/PermitForm.css'
import ConditionFormBox from '../../Components/ConditionFormBox/ConditionFormBox'
import TopSection from '../../Components/TopSection/TopSection'
import Header from '../../Components/Header/Header'
import axios from 'axios'
import { IP } from '../../App'
import PlaceForm from '../../Components/PlaceForm/PlaceForm'
export default function Infractions() {

    const [infractions, setInfractions] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fields, setFields] = useState([])

    const getAllPermitForm = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/form/all-violation-form/`, {
                headers,
            })

            if (response.status === 200) {
                setInfractions(response.data.forms)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")

            }
        }
    }

    useEffect(() => {
        getAllPermitForm()
    }, [])

    const openFormHandler = () => {
        setShowForm(true)
    }

    const backHandler = () => {
        setShowForm(false)
    }

    const sortForm = [...infractions]
    return (
        <>
            {
                showForm ? (
                    <>
                        <PlaceForm
                            back={backHandler}
                            title={title}
                            description={description}
                            fields={fields}

                        />
                    </>) : (
                    <>
                        <div className='accident-page'>
                            <Header />
                            <TopSection
                                text="Violations Form"
                            />
                            <div className="accidentForm-container">
                                {
                                    sortForm.length > 0 ? sortForm.map((form) => (
                                        < ConditionFormBox
                                            key={form.uuid}
                                            dec={form.descriptions}
                                            styleCalss={"redDot"}
                                            title={"Infractions Form"}
                                            openFormHandler={openFormHandler}
                                            setTitle={setTitle}
                                            setDescription={setDescription}
                                            setFields={setFields}
                                            form={form}
                                            paddingStyle={"padding-style"}

                                        />
                                    )) :
                                        <>
                                            <div className='empty_form'>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </>)
            }

        </>

    )
}
