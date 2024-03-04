import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'
import TextField from '@mui/material/TextField';
export default function Input({ uuid, value }) {
    const { handleChange } = useContext(FormContext)

    return (

        <div className='option-wrapper'>
            <TextField
                id={uuid}
                value={value}
                type="text"
                onChange={e => handleChange(uuid, e)}
                placeholder='Short Answer'
            />
        </div>
    )
}
