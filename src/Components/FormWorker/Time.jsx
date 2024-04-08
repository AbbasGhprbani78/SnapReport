import React from 'react'
import TextField from '@mui/material/TextField';

export default function Time({ uuid, value, onChange }) {


    return (
        <div className="option-wrapper">
            <TextField
                id={uuid}
                value={value}
                type="time"
                onChange={e => onChange(uuid, e)}

            />

        </div>
    )
}
