import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'
import TextField from '@mui/material/TextField';
export default function Time({ uuid, value }) {

    const { handleChange } = useContext(FormContext)
    return (
        <div class="option-wrapper">
            <TextField
                id={uuid}
                value={value}
                type="date"
                onChange={e => handleChange(uuid, e)}
            />
            {/* <input
                className='input-answer'
                id={uuid}
                value={value}
                type="date"
                onChange={e => handleChange(uuid, e)}
            /> */}
        </div>
    )
}
