import React from 'react'
import Input from './Input'
import CheckBox from './CheckBox'
import Select from './Select'
import Radio from './Radio'

export default function Element({ field }) {

    const type = field.field_type
    switch (type) {
        case "text":
            return (<Input
                field_id={field.field_id}
                field_lable={field.field_lable}
                field_type={field.field_type}
                field_value={field.field_value}
            />)
            break;
        case "checkbox":
            return (<CheckBox
                field_id={field.field_id}
                field_lable={field.field_lable}
                field_type={field.field_type}
                field_value={field.field_value}
            />)
            break;
        case "select":
            return (<Select
                field_id={field.field_id}
                field_lable={field.field_lable}
                field_type={field.field_type}
                field_value={field.field_value}
                field_options={field.field_options}
            />)
        case "radio":
            return (<Radio
                field_id={field.field_id}
                field_lable={field.field_lable}
                field_type={field.field_type}
                field_value={field.field_value}
                field_options={field.field_options}
            />)

        default:
            break;
    }
}
