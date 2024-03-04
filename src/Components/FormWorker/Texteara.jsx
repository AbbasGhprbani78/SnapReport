import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'
export default function Texteara({ uuid, value }) {

    const { handleChange } = useContext(FormContext)
    return (
        <div className="option-wrapper">
            <textarea
                className='textarea-option'
                id={uuid}
                value={value}
                onChange={e => handleChange(uuid, e)}
                style={{ outline: "none", padding: "10px" }}
                placeholder='Write Your Text ...' />
        </div>
    )
}
