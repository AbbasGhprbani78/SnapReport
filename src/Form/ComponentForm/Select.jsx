import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../Components/FormWorker/FormContext'
export default function Select({
    field_id,
    field_lable,
    field_type,
    field_value,
    field_options
}) {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <label htmlFor={field_id}>{field_lable}</label>
            <select
                onChange={e => handleChange(field_id, e)}
                id={field_id}
            >
                <option >select value</option>
                {field_options.map((option, i) => (
                    <option key={i} value={option.option_lable}>{option.option_lable}</option>
                ))}
            </select>
        </div>
    )
}
