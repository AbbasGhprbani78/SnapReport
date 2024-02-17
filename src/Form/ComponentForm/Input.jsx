import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../Components/FormWorker/FormContext'
export default function Input({
    field_id,
    field_lable,
    field_type,
    field_value
}) {
    const { handleChange } = useContext(FormContext)

    return (
        <div>
            <label
                htmlFor={field_id}>
                {field_lable}
            </label>
            <input
                value={field_value}
                id={field_id}
                type="text"
                onChange={e => handleChange(field_id, e)}
            />
        </div>
    )
}
