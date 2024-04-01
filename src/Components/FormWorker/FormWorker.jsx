import React, { useState } from 'react'
import './FormWorker.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormContext } from './FormContext';
import Element from './Element';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { IP } from '../../App';

export default function FormWorker({
    back,
    mainTitle,
    mianDes,
    mainFields,
    uuid,
    getFormData
}) {

    const user = localStorage.getItem("uuid")

    const newData = mainFields.map(item => {
        return { ...item, value: "", user: user };
    });

    const [allfields, setAllFields] = useState(newData)
    const [sendFileds, setSendFields] = useState([])

    const handleChange = (id, event) => {
        const newElements = [...allfields]
        newElements.forEach(element => {

            const { uuid, fields_type } = element

            if (id === uuid) {
                switch (fields_type) {
                    default:
                        element.value = event.target.value;
                        break;
                }
            }

        })
        setAllFields(newElements)
        setSendFields(newElements)

    }

    const sendFormHandler = async () => {
        const updatedFields = sendFileds.map(obj => {
            return { ...obj, field_uuid: obj.uuid, uuid: undefined };
        });
        updatedFields.forEach(fields => {
            delete fields.uuid
        })
        const hasEmptyValue = sendFileds.some(field => field.value === "");
        if (hasEmptyValue) {
            toast.warning("Please fill all of items", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const access = localStorage.getItem("access")

        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            form_uuid: uuid,
            fields: updatedFields
        }

        try {
            const response = await axios.post(`${IP}/form/check-full-form/`, body, {
                headers,
            })

            if (response.status === 201) {
                (response)
                toast.success(`The form was completed successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    back()
                    getFormData()
                }, 3000)
            }
            else {

            }

        } catch (e) {
            (e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    return (
        <>
            <FormContext.Provider value={{ handleChange }}>
                <div className="formWorker-container">
                    <div>
                        <div
                            onClick={back}
                            style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                        >
                            <ArrowBackIcon
                                style={{ fontSize: "1rem", cursor: "pointer" }} />back
                        </div>
                    </div>

                    <div className="formWorker-top my-4">
                        <span style={{ color: "#bdb5b5" }}>Permit Forms</span>

                    </div>
                    <div className="formWorker form-display">
                        <h3 className='from-title'>{mainTitle}</h3>
                        <p className='from-description'>{mianDes}</p>
                        {
                            allfields.map((field) => (
                                <Element
                                    key={field.uuid}
                                    field={field}
                                />

                            ))
                        }
                    </div>
                    <div className='mt-4' style={{ direction: "rtl" }} > <button onClick={sendFormHandler} className='view-btn send-worker'>Send</button></div>
                </div>
            </FormContext.Provider>
            <ToastContainer />

        </>
    )
}


