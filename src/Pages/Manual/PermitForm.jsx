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
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fields, setFields] = useState([])

    const getAllPermitForm = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/form/all-permit-form/`, {
                headers,
            })

            if (response.status === 200) {
                setPermitForms(response.data.forms)
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

    const sortForm = [...permitForms]

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
                            notseniro={true}
                        />
                    </>) : (
                    <>
                        <div className='permitForm-page '>
                            <Header />
                            <TopSection
                                text="Permit forms"
                            />

                            <div className="permitForm-container">
                                {
                                    sortForm.length > 0 ? sortForm.slice().reverse().map((form) => (
                                        < ConditionFormBox
                                            key={form.uuid} permitForm-container
                                            dec={form.descriptions}
                                            styleCalss={"bluedot"}
                                            title={"Permit Form"}
                                            openFormHandler={openFormHandler}
                                            setTitle={setTitle}
                                            setDescription={setDescription}
                                            setFields={setFields}
                                            form={form}
                                            accept={form.accept}
                                            paddingStyle={"padding-style"}
                                        />
                                    ))
                                        :
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
