import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './BoxInput.css'

export default function BoxInput({ type, deleteBox, uuid }) {

    return (
        <>
            <div
                style={{ marginBottom: "5%" }}
                className=" d-flex align-items-center">
                <input
                    className='input-form'
                    placeholder={type}
                />
                {
                    (type === "radio" || type === "checkbox" || type === "text") &&
                    <DeleteIcon
                        className='Delete-form-Icon'
                        onClick={() => deleteBox(uuid)}
                    />
                }


            </div></>
    )
}
