import React from 'react'
import './QuestionComponent.css'
export default function QuestionCOmponent({ content, selectElement }) {

    return (
        <>
            <div className={`question-wrapper`} onClick={() => selectElement(content.question, content)}>
                <p className='qusetion-form'>{content.question}</p>

                {
                    content.type === "dropdown" ?
                        <div>
                            <select >
                                {content.options && content.options.map((option, i) => (
                                    <option key={i}>{option.content}</option>
                                ))}
                            </select>
                        </div>

                        : content.type === "Short Answer" ?
                            content.options && content.options.map((option, i) => (
                                <div key={i}>
                                    <label htmlFor="">{option.content}</label>
                                    <input type="text" />
                                </div>
                            ))


                            : content.options && content.options.map((option, i) => (

                                <div key={i}>
                                    <label htmlFor="">{option.content}</label>
                                    <input type={content.type} />
                                </div>
                            ))
                }

            </div>
        </>

    )
}




