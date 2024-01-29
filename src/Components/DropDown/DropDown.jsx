import React from 'react'
import './DropDown.css'
export default function DropDown({ allTypeUsers, defaultDrop, changeValue }) {

    return (
        <>
            <div className='dropDown-wrapper'>
                <select
                    onChange={(e) => changeValue(e.target.value)}
                    className='dropDwon'>
                    <option selected>{defaultDrop}</option>
                    {
                        allTypeUsers.map((type, i) => (
                            <option key={i}
                                className='dropDwon-item'
                                value={type}>{type}</option>
                        ))
                    }
                </select>
            </div>

        </>
    )
}
