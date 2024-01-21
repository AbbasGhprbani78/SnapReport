import React, { useState } from 'react'
import Element from "./ComponentForm/Element"
import { FormContext } from './ComponentForm/FormContext'
export default function Form() {

    const [fields, setFields] = useState([
        {
            field_id: 1,
            field_lable: "Name",
            field_type: "text",
            field_value: ""
        },

        {
            field_id: 2,
            field_lable: "i confirm",
            field_type: "checkbox",
            field_value: false
        },
        {
            field_id: 3,
            field_lable: "Employment",
            field_type: "select",
            field_value: "part-time",
            field_options: [
                {
                    option_lable: "full-time"
                },
                {
                    option_lable: "part-time"
                },

            ]
        },
        {
            field_id: 4,
            field_label: "capital",
            field_type: "radio",
            field_value: "",
            field_options: [
                {
                    option_label: "london",
                    option_value: "london"
                },
                {
                    option_label: "tokyo",
                    option_value: "tokyo"
                },
                {
                    option_label: "kabol",
                    option_value: "kabol"
                },

                {
                    option_label: "helsinki",
                    option_value: "helsinki"
                },


            ]
        },
    ])

    const handleChange = (id, event) => {
        const newElements = [...fields]
        newElements.forEach(element => {

            const { field_id, field_type } = element

            if (id === field_id) {
                switch (field_type) {
                    case 'checkbox':
                        element.field_value = event.target.checked
                        break;

                    default:
                        element.field_value = event.target.value;
                        break;
                }
            }

        })
        setFields(newElements)

    }

    const submit = (e) => {
        e.preventDefault()
        console.log(fields)

    }
    return (
        <FormContext.Provider value={{ handleChange }}>
            <div>
                <form onSubmit={submit}>
                    {
                        fields.map((field, i) => (
                            <Element
                                key={i}
                                field={field}
                            />
                        ))
                    }
                    <button type='submit'>submit</button>
                </form>
            </div>
        </FormContext.Provider>

    )
}
