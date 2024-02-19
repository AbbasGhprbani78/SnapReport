import React, { useState } from 'react'

export default function FillItem({ field }) {


    return (
        <div>
            <div className={`question-wrapper`}>
                <p className='qusetion-form'>{field.questions}</p>

                {
                    field.fields_type === "dropdown" ?
                        <div
                            class="option-wrapper"
                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}
                        >
                            <select
                                className=' dropDwon-option'

                            >
                                {field.choices && field.choices.map((option, i) => (
                                    <option selected={field.checks[0].value === option.choice} key={i}>{option.choice}</option>
                                ))}
                            </select>
                        </div>

                        : field.fields_type === "shortanswer" ?
                            field &&
                            <div className="option-wrapper">
                                <input
                                    placeholder='Short Answer'
                                    className='input-answer'
                                    type="text"
                                    value={field.checks[0].value}
                                    disabled
                                />
                            </div>

                            : field.fields_type === "textarea" ?
                                field &&
                                <div className='d-flex align-items-center option-wrapper'>
                                    <textarea className='textarea-option'
                                        style={{ minWidth: "250px", maxWidth: "250px", outline: "none", padding: "10px" }}
                                        placeholder='Write Your Text ...'
                                        value={field.checks[0].value}
                                        disabled

                                    />
                                </div>
                                :
                                field.fields_type === "date" ?
                                    field &&
                                    <div class="option-wrapper">
                                        <input
                                            placeholder='Short Answer date-option'
                                            className='input-answer'
                                            type="date"
                                            value={field.checks[0].value}
                                        />
                                    </div>
                                    :
                                    field.fields_type === "time" ?
                                        field &&
                                        <div className="option-wrapper" >
                                            <input
                                                placeholder='Short Answer'
                                                className='input-answer'
                                                type="time"
                                                value={field.checks[0].value}
                                            />
                                        </div>

                                        : field && field.fields_type === "radio" ?

                                            field.choices.map((option, i) => (

                                                <div className='option-wrapper' key={i}>
                                                    <input
                                                        type="radio"
                                                        checked={option.choice === field.checks[0].value}
                                                    />
                                                    <label className='lable-option multiyop'>{option.choice}</label>
                                                </div>
                                            )) :

                                            field && field.fields_type === "checkbox" &&

                                            field.choices.map((option, i) => (

                                                <div className='option-wrapper' key={i}>
                                                    <input
                                                        checked={option.choice === field.checks[0].value}
                                                        type="checkbox" />
                                                    <label className='lable-option multiyop'>{option.choice}</label>
                                                </div>
                                            ))
                }

            </div>
        </div>
    )
}