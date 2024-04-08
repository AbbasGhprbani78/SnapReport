import React from 'react'
export default function Select({ uuid, field_options, onChange }) {

    return (
        <div className="option-wrapper"
            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
        >
            <select
                className=' dropDwon-option'
                onChange={e => onChange(uuid, e)}
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
