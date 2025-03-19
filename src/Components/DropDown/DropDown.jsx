import React from 'react'
import './DropDown.css'
export default function DropDown({ defaultDrop, changeValue }) {

    return (
        <>
            <div className='dropDown-wrapper'>
                <select
                    onChange={(e) => changeValue(e.target.value)}
                    className='dropDwon'>
                    <option selected disabled>{defaultDrop}</option>
                    <option value={"S"} className='dropDwon-item'>Senior officer</option>
                    <option value={"O"} className='dropDwon-item'>Ordinary officer</option>
                    <option value={"M"} className='dropDwon-item'>Manual worker</option>

                </select>
            </div>

        </>
    )
}
