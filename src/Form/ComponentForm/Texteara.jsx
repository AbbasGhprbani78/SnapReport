import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../Components/FormWorker/FormContext'
export default function Texteara({
    field_id,
    field_lable,
    field_value
}) {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <label
                htmlFor={field_id}>
                {field_lable}
            </label>
            <textarea
                value={field_value}
                id={field_id}
                onChange={e => handleChange(field_id, e)}
            />
        </div>
    )
}
