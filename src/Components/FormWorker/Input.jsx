import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'
export default function Input({ uuid, value }) {
    const { handleChange } = useContext(FormContext)

    return (

        <div className='option-wrapper'>
            <input
                id={uuid}
                value={value}
                type="text"
                onChange={e => handleChange(uuid, e)}
                class="input-answer"
            />
        </div>
    )
}
