import React from 'react'
import TextField from '@mui/material/TextField';
export default function Input({ uuid, value, onChange }) {


    return (

        <div className='option-wrapper'>
            <TextField
                id={uuid}
                value={value}
                type="text"
                onChange={e => onChange(uuid, e)}
                placeholder='Short Answer'
            />
        </div>
    )
}
