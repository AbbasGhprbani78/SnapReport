import React from 'react'
import TextField from '@mui/material/TextField';
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'

export default function FIllItem2({ field }) {
    return (
        <div>
            <div className={`question-wrapper`}>
                <p className='qusetion-form'>{field?.questions}</p>
                
                {
                    field?.fields_type === "dropdown" ?
                        <div
                            className="option-wrapper"
                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
                        >
                            <select
                                className=' dropDwon-option'

                            >
                                {field?.options && field?.options.map((option, i) => (
                                    <option  key={i}>{option?.choice}</option>
                                ))}
                            </select>
                        </div>

                        : field?.fields_type === "shortanswer" ?
                            field &&
                            <div className="option-wrapper">
                                <TextField
                                    placeholder='Short Answer'
                                    type="text"
                                    disabled
                                />
                            </div>
                            : field?.fields_type === "file" ?
                                field &&
                                <div className="option-wrapper">
                                    <div style={{ marginLeft: "10px" }}>
                                        <a  className='place' target='blank' download>
                                            <BsFillFileEarmarkArrowDownFill className='fileIcon file-left' />
                                        </a>
                                    </div>
                                </div>

                                : field?.fields_type === "textarea" ?
                                    field &&
                                    <div className='d-flex align-items-center option-wrapper'>
                                        <textarea className='textarea-option'
                                            style={{ outline: "none", padding: "10px" }}
                                            placeholder='Write Your Text ...'

                                            disabled
                                        />
                                    </div>
                                    :
                                    field?.fields_type === "date" ?
                                        field &&
                                        <div className="option-wrapper">
                                            <TextField
                                                id="date"
                                                type="date"
                                                
                                            />
                                        </div>
                                        :
                                        field?.fields_type === "time" ?
                                            field &&
                                            <div className="option-wrapper" >
                                                <TextField
                                                    placeholder='Short Answer'
                                                    type="time"
                                                    
                                                />
                                            </div>

                                            : field && field?.fields_type === "radio" ?

                                                field?.options.map((option, i) => (

                                                    <div className='option-wrapper' key={i}>
                                                        <input
                                                            type="radio"
                                                        />
                                                        <label className='lable-option multiyop'>{option?.choice}</label>
                                                    </div>
                                                )) :

                                                field && field?.fields_type === "checkbox" &&

                                                field?.options.map((option, i) => (
                                                    <div className='option-wrapper' key={i}>
                                                        <input
                                                            type="checkbox" />
                                                        <label className='lable-option multiyop'>{option?.choice}</label>
                                                    </div>
                                                ))
                }

            </div>
        </div>
    )
}
