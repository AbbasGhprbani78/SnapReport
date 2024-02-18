import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'
export default function Select({ uuid, field_options }) {
    const { handleChange } = useContext(FormContext)
    return (
        <div class="option-wrapper"
            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
        >
            <select
                className=' dropDwon-option'
                onChange={e => handleChange(uuid, e)}
                id={uuid}
            >
                <option >select value</option>
                {field_options.map((option, i) => (
                    <option key={i} value={option.choice}>{option.choice}</option>
                ))}
            </select>
        </div>
    )
}
