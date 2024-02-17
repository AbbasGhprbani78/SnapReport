import React, { useState } from 'react'
import './FormWorker.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormContext } from './FormContext';
export default function FormWorker({
    back,
    mainTitle,
    mianDes,
    uuid,
    mainFields }) {

    const [fields, setFields] = useState(mainFields)

    const handleChange = (id, event) => {
        const newElements = [...fields]
        newElements.forEach(element => {

            const { uuid, field_type } = element

            if (id === field_id) {
                switch (field_type) {
                    case 'checkbox':
                        element.field_value = event.target.checked
                        break;

                    default:
                        element.field_value = event.target.value;
                        break;
                }
            }

        })
        setFields(newElements)

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
                        <span style={{ color: "lightgray" }}>Permit Forms</span>
                        <button className='view-btn'>View Request</button>
                    </div>
                    <div className="formWorker form-display">
                        <h3 className='from-title'>{mainTitle}</h3>
                        <p className='from-description'>{mianDes}</p>
                    </div>
                    <div className='mt-4' style={{ direction: "rtl" }} > <button className='view-btn send-worker'>Send</button></div>
                </div>
            </FormContext.Provider>

        </>
    )
}
