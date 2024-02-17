import React from 'react'
import Input from './Input'
import CheckBox from './CheckBox'
import Select from './Select'
import Radio from './Radio'
import Texteara from './Texteara'

export default function Element({ field }) {

    const type = field.field_type
    switch (type) {
        case "text":
            return (<Input
                uuid={field.uuid}
                question={field.question}
                field_type={field.field_type}
                field_options={field.options}
            />)
            break;
        case "checkbox":
            return (<CheckBox
                field_id={field.uuid}
                question={field.field.question}
                field_type={field.field_type}
                field_options={field.options}
            />)
            break;
        case "select":
            return (<Select
                uuid={field.uuid}
                question={field.field.question}
                field_type={field.field_type}
                field_options={field.field_options}
            />)
        case "radio":
            return (<Radio
                uuid={field.uuid}
                question={field.field.question}
                field_type={field.field_type}
                field_options={field.options}
            />)

        case "textarea":
            return (
                <>
                    <Texteara
                        uuid={field.uuid}
                        question={field.field.question}
                        field_type={field.field_type}

                    />
                </>
            )

        default:
            break;
    }
}
