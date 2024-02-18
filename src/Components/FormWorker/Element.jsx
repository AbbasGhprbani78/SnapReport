import React from 'react'
import Input from './Input'
import CheckBox from './CheckBox'
import Select from './Select'
import Radio from './Radio'
import Time from './Time'
import Date from './Date'
import Texteara from './Texteara'

export default function Element({ field }) {

    const type = field.fields_type


    switch (type) {

        case "shortanswer":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <Input
                            uuid={field.uuid}
                            value={field.value}
                        />
                    </div>
                </>
            )
                ;
        case "textarea":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <Texteara
                            uuid={field.uuid}
                            value={field.value}
                        />
                    </div>
                </>
            )
                ;
        case "date":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <Time
                            uuid={field.uuid}
                            value={field.value}
                        />
                    </div>
                </>
            )
                ;
        case "time":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <Date
                            uuid={field.uuid}
                            value={field.value}
                        />
                    </div>

                </>
            )
                ;
        case "checkbox":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <CheckBox
                            uuid={field.uuid}
                            field_options={field.options}
                            value={field.value}
                        />
                    </div>

                </>
            )
                ;
        case "dropdown":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'> {field.questions}</p>
                        <Select
                            uuid={field.uuid}
                            field_options={field.options}
                            value={field.value}
                        />
                    </div>
                </>
            )
        case "radio":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <Radio
                            uuid={field.uuid}
                            field_options={field.options}
                            value={field.value}
                        />
                    </div>
                </>

            )

        default:
            break;
    }
}
