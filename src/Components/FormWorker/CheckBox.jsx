import React from 'react'
export default function CheckBox({ uuid, field_options, value, onChange }) {

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
                            onChange={e => onChange(uuid, e)}
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
