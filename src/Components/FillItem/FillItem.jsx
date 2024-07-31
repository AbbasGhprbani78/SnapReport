import React from 'react'
import TextField from '@mui/material/TextField';
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import { IP } from '../../App'
export default function FillItem({ field, setChecks }) {

        setChecks(field?.checks[0] && field?.checks[0]?.group)
    


    return (
        <div>
            <div className={`question-wrapper`}>
                <p className='qusetion-form'>{field?.questions}</p>

                {
                    field.fields_type === "dropdown" ?
                        <div
                            className="option-wrapper"
                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
                        >
                            <select
                                className=' dropDwon-option'

                            >
                                {field?.choices && field?.choices.map((option, i) => (
                                    <option selected={field?.checks[0]?.value === option?.choice} key={i}>{option?.choice}</option>
                                ))}
                            </select>
                        </div>

                        : field?.fields_type === "shortanswer" ?
                            field &&
                            <div className="option-wrapper">
                                <TextField
                                    placeholder='Short Answer'
                                    type="text"
                                    value={field?.checks[0]?.value}
                                    disabled
                                />
                            </div>
                            : field.fields_type === "file" ?
                                field &&
                                <div className="option-wrapper">
                                    <div style={{ marginLeft: "10px" }}>
                                        <a href={`${IP}${field?.checks[0]?.file}`} className='place' target='blank' download>
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
                                            value={field?.checks[0]?.value}
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
                                                value={field.checks[0]?.value}
                                            />
                                        </div>
                                        :
                                        field?.fields_type === "time" ?
                                            field &&
                                            <div className="option-wrapper" >
                                                <TextField
                                                    placeholder='Short Answer'
                                                    type="time"
                                                    value={field?.checks[0]?.value}
                                                />
                                            </div>

                                            : field && field?.fields_type === "radio" ?

                                                field?.choices.map((option, i) => (

                                                    <div className='option-wrapper' key={i}>
                                                        <input
                                                            type="radio"
                                                            checked={option?.choice === field?.checks[0].value}
                                                        />
                                                        <label className='lable-option multiyop'>{option?.choice}</label>
                                                    </div>
                                                )) :

                                                field && field?.fields_type === "checkbox" &&

                                                field?.choices.map((option, i) => (
                                                    <div className='option-wrapper' key={i}>
                                                        <input
                                                            checked={option?.choice === field?.checks[0]?.value}
                                                            type="checkbox" />
                                                        <label className='lable-option multiyop'>{option?.choice}</label>
                                                    </div>
                                                ))
                }

            </div>
        </div>
    )
}




