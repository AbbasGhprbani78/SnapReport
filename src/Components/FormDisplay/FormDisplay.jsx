import React from 'react'
import './FormDisplay.css'
import QuestionCOmponent from '../QuestionComponent/QuestionCOmponent'
export default function FormDisplay({ fromInfom, selectElement }) {
    return (
        <>
            <h2 className='from-title'>{fromInfom.title}</h2>
            <p className='from-description'>{fromInfom.description}</p>
            {fromInfom && fromInfom.fields.length > 0 && fromInfom.fields.map((content, i) => (
                <QuestionCOmponent key={i}
                    content={content}
                    selectElement={selectElement}

                />
            ))}

        </>
    )
}
