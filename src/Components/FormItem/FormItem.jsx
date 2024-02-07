import React, { useEffect, useRef } from 'react'
import './FormItem.css'
export default function FormItem({ content, selectElement, ishover, disable }) {

    const formEndRef = useRef(null);

    useEffect(() => {
        if (!ishover) {
            formEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [content])
    return (
        <>
            <div className={`question-wrapper ${!ishover && "option-item-form"}`} onClick={() => selectElement(content.questions, content)}>
                <p className='qusetion-form'>{content.questions}</p>

                {
                    content.fields_type === "dropdown" ?
                        <div

                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
                        >
                            <select
                                className=' dropDwon-option'
                                disabled={disable}
                            >
                                {content.options && content.options.map((option, i) => (
                                    <option key={i}>{option.choice}</option>
                                ))}
                            </select>
                        </div>

                        : content.fields_type === "shortanswer" ?
                            content &&
                            <div >
                                <input
                                    placeholder='Short Answer'
                                    className='input-answer'
                                    type="text"
                                    disabled={disable}
                                />
                            </div>

                            : content.fields_type === "textarea" ?
                                content &&
                                <div className='d-flex align-items-center'>
                                    <textarea className='textarea-option'
                                        style={{ minWidth: "250px", maxWidth: "250px", outline: "none", padding: "10px" }}
                                        placeholder='Write Your Text ...'
                                        disabled={disable}
                                    />
                                </div>
                                :
                                content.fields_type === "date" ?
                                    content &&
                                    <div >
                                        <input
                                            placeholder='Short Answer date-option'
                                            className='input-answer'
                                            type="date"
                                            disabled={disable}
                                        />
                                    </div>
                                    :
                                    content.fields_type === "time" ?
                                        content &&
                                        <div >
                                            <input
                                                placeholder='Short Answer'
                                                className='input-answer'
                                                type="time"
                                                disabled={disable}
                                            />
                                        </div>

                                        : content.options && content.options.map((option, i) => (

                                            <div className='option-wrapper' key={i}>
                                                <input
                                                    disabled={disable}
                                                    type={content.fields_type} />
                                                <label className='lable-option multiyop'>{option.choice}</label>
                                            </div>
                                        ))
                }

            </div>
            <div ref={formEndRef} />
        </>

    )
}




