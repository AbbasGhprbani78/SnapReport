import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../Components/FormWorker/FormContext'

export default function Radio({ field_id,
    field_lable,
    field_value,
    field_options }

) {

    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <label >{field_lable}</label>
            {
                field_options.map((option, i) => (
                    <div key={i}>
                        <input
                            type="radio"
                            id={field_id}
                            name={`radio_${field_id}`}
                            value={option.option_value}
                            checked={field_value === option.option_value}
                            onChange={e => handleChange(field_id, e)}
                        />
                        <label htmlFor={`${field_id}_${option.option_value}`}>
                            {option.option_label}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
