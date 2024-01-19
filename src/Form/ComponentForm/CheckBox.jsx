import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'

export default function CheckBox({
    field_id,
    field_lable,
    field_type,
    field_value
}) {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <label htmlFor={field_id}>{field_lable}</label>
            <input
                id={field_id} type="checkbox"
                checked={field_value}
                onChange={e => handleChange(field_id, e)}
            />
        </div>
    )
}
