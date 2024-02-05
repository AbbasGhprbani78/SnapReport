import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './BoxInput.css'

export default function BoxInput({ deleteBox, uuid, onChange, name, value }) {

    return (
        <>
            <div
                style={{ marginBottom: "5%" }}
                className=" d-flex align-items-center">
                <input
                    className='input-form input-option'
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
