import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'

export default function Time({ uuid, value }) {

    const { handleChange } = useContext(FormContext)
    return (
        <div class="option-wrapper">
            <input
                className='input-answer'
                id={uuid}
                value={value}
                type="date"
                onChange={e => handleChange(uuid, e)}
            />
        </div>
    )
}
