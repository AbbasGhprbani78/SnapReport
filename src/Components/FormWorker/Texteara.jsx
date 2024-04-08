import React from 'react'

export default function Texteara({ uuid, value, onChange }) {

    return (
        <div className="option-wrapper">
            <textarea
                className='textarea-option'
                id={uuid}
                value={value}
                onChange={e => onChange(uuid, e)}
                style={{ outline: "none", padding: "10px" }}
                placeholder='Write Your Text ...' />
        </div>
    )
}
