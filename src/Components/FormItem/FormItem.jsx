import React from 'react'
import './FormItem.css'
export default function FormItem({ content, selectElement }) {
    return (
        <>
            <div className={`question-wrapper`} onClick={() => selectElement(content.question, content)}>
                <p className='qusetion-form'>{content.question}</p>

                {
                    content.type === "dropdown" ?
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

                        : content.type === "ShortAnswer" ?
                            content &&
                            <div >
                                <input
                                    placeholder='Short Answer'
                                    className='input-answer' type="text" />
                            </div>

                            : content.type === "textarea" ?
                                content &&
                                <div className='d-flex align-items-center'>
                                    <textarea className='textarea-option'
                                        style={{ minWidth: "250px", maxWidth: "250px", outline: "none", padding: "10px" }}
                                        placeholder='Write Your Text ...'
                                    />
                                </div>
                                :
                                content.type === "date" ?
                                    content &&
                                    <div >
                                        <input
                                            placeholder='Short Answer date-option'
                                            className='input-answer' type="date" />
                                    </div>
                                    :
                                    content.type === "time" ?
                                        content &&
                                        <div >
                                            <input
                                                placeholder='Short Answer'
                                                className='input-answer' type="time" />
                                        </div>

                                        : content.options && content.options.map((option, i) => (

                                            <div className='option-wrapper' key={i}>
                                                <input type={content.type} />
                                                <label className='lable-option multiyop'>{option.content}</label>
                                            </div>
                                        ))
                }

            </div>
        </>

    )
}




