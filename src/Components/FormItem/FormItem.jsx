import React from 'react'
import './FormItem.css'
export default function FormItem({ content, selectElement }) {
    console.log(content.fields_type)
    return (
        <>
            <div className={`question-wrapper`} onClick={() => selectElement(content.questions, content)}>
                <p className='qusetion-form'>{content.questions}</p>

                {
                    content.fields_type === "dropdown" ?
                        <div

                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
                        >
                            <select
                                className=' dropDwon-option'
                            >
                                {content.options && content.options.map((option, i) => (
                                    <option key={i}>{option.content}</option>
                                ))}
                            </select>
                        </div>

                        : content.fields_type === "ShortAnswer" ?
                            content &&
                            <div >
                                <input
                                    placeholder='Short Answer'
                                    className='input-answer' type="text" />
                            </div>

                            : content.fields_type === "textarea" ?
                                content &&
                                <div className='d-flex align-items-center'>
                                    <textarea className='textarea-option'
                                        style={{ minWidth: "250px", maxWidth: "250px", outline: "none", padding: "10px" }}
                                        placeholder='Write Your Text ...'
                                    />
                                </div>
                                :
                                content.fields_type === "date" ?
                                    content &&
                                    <div >
                                        <input
                                            placeholder='Short Answer date-option'
                                            className='input-answer' type="date" />
                                    </div>
                                    :
                                    content.fields_type === "time" ?
                                        content &&
                                        <div >
                                            <input
                                                placeholder='Short Answer'
                                                className='input-answer' type="time" />
                                        </div>

                                        : content.options && content.options.map((option, i) => (

                                            <div className='option-wrapper' key={i}>
                                                <input type={content.fields_type} />
                                                <label className='lable-option multiyop'>{option.content}</label>
                                            </div>
                                        ))
                }

            </div>
        </>

    )
}




