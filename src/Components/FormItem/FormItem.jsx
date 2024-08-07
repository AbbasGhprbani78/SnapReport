import React from 'react'
import './FormItem.css'
import TextField from '@mui/material/TextField';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
export default function FormItem({ content, selectElement, ishover }) {
    return (
        <>
            <div className={`question-wrapper ${!ishover && "option-item-form"}`}>
                {
                    ishover ?
                        null
                        :
                        <div>
                            < div className='actions-forms'>
                                <div
                                    onClick={() => selectElement(content.questions, content)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <EditCalendarIcon
                                        className='editFormIcom'
                                    />
                                </div>
                            </div>
                        </div>
                }

                <p className='qusetion-form'>{content.questions}</p>

                {
                    content.fields_type === "dropdown" ?
                        <div
                            className="option-wrapper"
                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
                        >
                            <select
                                className=' dropDwon-option'
                                disabled={true}
                            >
                                {content.options && content.options.map((option, i) => (
                                    <option key={i}>{option.choice}</option>
                                ))}
                            </select>
                        </div>

                        : content.fields_type === "shortanswer" ?
                            content &&
                            <div className="option-wrapper">
                                <TextField
                                    placeholder='Short Answer'
                                    type="text"
                                    disabled={true}
                                />
                            </div>
                            : content.fields_type === "file" ?
                                content &&
                                <div className="option-wrapper">
                                    <input
                                        className='file-form'
                                        type="file"
                                        id="file"
                                        disabled={true}
                                        placeholder='choose image'
                                    />
                                </div>

                                : content.fields_type === "textarea" ?
                                    content &&
                                    <div className='d-flex align-items-center option-wrapper'>
                                        <textarea className='textarea-option'
                                            style={{ outline: "none", padding: "10px" }}
                                            placeholder='Write Your Text ...'
                                            disabled={true}
                                        />
                                    </div>
                                    :
                                    content.fields_type === "date" ?
                                        content &&
                                        <div className="option-wrapper">
                                            <TextField
                                                id="date"
                                                type='date'
                                                disabled={true}
                                            />
                                        </div>
                                        :
                                        content.fields_type === "time" ?
                                            content &&
                                            <div className="option-wrapper" >
                                                <TextField
                                                    id="time"
                                                    type="time"
                                                    disabled={true}
                                                />
                                            </div>

                                            : content.options && content.options.map((option, i) => (
                                                <div className='option-wrapper' key={i}>
                                                    <input
                                                        disabled={true}
                                                        type={content.fields_type} />
                                                    <label className='lable-option multiyop'>{option.choice}</label>
                                                </div>
                                            ))
                }

            </div>
        </>

    )
}




// onClick = {() => selectElement(content.questions, content)}