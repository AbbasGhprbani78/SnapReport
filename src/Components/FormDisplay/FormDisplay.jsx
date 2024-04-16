import React from 'react'
import './FormDisplay.css'
import FormItem from '../FormItem/FormItem'
export default function FormDisplay({ fromInfom, selectElement, ishover, disable }) {

    return (
        <>
            <h4 className='from-title'>{fromInfom.title}</h4>
            <p className='from-description'>{fromInfom.descriptions}</p>
            {fromInfom && fromInfom.fields.length > 0 && fromInfom.fields.map((content, i) => (
                <FormItem key={i}
                    content={content}
                    selectElement={selectElement}
                    ishover={ishover}
                    disable={disable}

                />
            ))}

        </>
    )
}
