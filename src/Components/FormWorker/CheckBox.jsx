import React from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'

export default function CheckBox({ uuid, field_options, value }) {
    const { handleChange } = useContext(FormContext)
    return (
        <div className="option-wrapper">
            {
                field_options.map((option, i) => (
                    <div key={i} className='option-wrapper'>
                        <input
                            type="checkbox"
                            id={uuid}
                            name={`checkbox_${uuid}`}
                            value={option.choice}
                            checked={value === option.choice}
                            onChange={e => handleChange(uuid, e)}
                        />
                        <label className='lable-option multiyop' htmlFor={`${uuid}_${option.choice}`}>
                            {option.choice}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
