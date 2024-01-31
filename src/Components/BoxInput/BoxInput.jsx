import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './BoxInput.css'

export default function BoxInput({ type, deleteBox, uuid, onChange, name, value }) {

    return (
        <>
            <div
                style={{ marginBottom: "5%" }}
                className=" d-flex align-items-center">
                <input
                    className='input-form'
                    placeholder={type}
                    onChange={(e) => onChange(uuid, e.target.value)}
                    name={name}
                    value={value}
                />

                <DeleteIcon
                    className='Delete-form-Icon'
                    onClick={() => deleteBox(uuid)}
                />



            </div>
        </>
    )
}
