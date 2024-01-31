import * as React from 'react';
import './InputCreateForm.css';

export default function InputCreateForm({ lable, title, onChange, value, name }) {

    return (
        <>
            <div className="inputWrapper">
                <span className='input-title'>
                    {title}
                </span>
                <input
                    value={value}
                    type="text"
                    className='input-form'
                    placeholder={lable}
                    onChange={onChange}
                    name={name}
                />
            </div>

        </>
    )
}
