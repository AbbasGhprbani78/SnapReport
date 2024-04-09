import React from 'react'
import Input from './Input'
import CheckBox from './CheckBox'
import Select from './Select'
import Radio from './Radio'
import Time from './Time'
import Date from './Date'
import Texteara from './Texteara'
import File from './File'

export default function Element({ field, onInputChange }) {

    const type = field.fields_type
    console.log(field)

    switch (type) {

        case "shortanswer":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <Input
                            uuid={field.uuid}
                            value={field.value}
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
                        <Time
                            uuid={field.uuid}
                            value={field.value}
                            onChange={onInputChange}
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
                        <Date
                            uuid={field.uuid}
                            value={field.value}
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
                            onChange={onInputChange}
                        />
                    </div>
                </>

            )
        case "file":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'>{field.questions}</p>
                        <File
                            uuid={field.uuid}
                            value={field.value}
                            onChange={onInputChange}
                        />
                    </div>
                </>

            )

        default:
            break;
    }
}
