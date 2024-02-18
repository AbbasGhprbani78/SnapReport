import React from 'react'
import Input from './Input'
import CheckBox from './CheckBox'
import Select from './Select'
import Radio from './Radio'

export default function Element({ field }) {

    const type = field.field_type


    switch (type) {
        case "text":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'></p>
                        <Input
                            field_id={field.field_id}
                            field_lable={field.field_lable}
                            field_type={field.field_type}
                            field_value={field.field_value}
                        />
                    </div>

                </>
            )
                ;
        case "checkbox":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'></p>
                        <CheckBox
                            field_id={field.field_id}
                            field_lable={field.field_lable}
                            field_type={field.field_type}
                            field_value={field.field_value}
                        />
                    </div>

                </>
            )
                ;
        case "select":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'></p>
                        <Select
                            field_id={field.field_id}
                            field_lable={field.field_lable}
                            field_type={field.field_type}
                            field_value={field.field_value}
                            field_options={field.field_options}
                        />
                    </div>
                </>
            )
        case "radio":
            return (
                <>
                    <div className='question-wrapper'>
                        <p className='qusetion-form'></p>
                        <Radio
                            field_id={field.field_id}
                            field_lable={field.field_lable}
                            field_type={field.field_type}
                            field_value={field.field_value}
                            field_options={field.field_options}
                        />
                    </div>
                </>

            )

        default:
            break;
    }
}
