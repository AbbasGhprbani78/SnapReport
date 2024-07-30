import React, { useState } from 'react'
import './FormOverView.css'
import FillItem from '../FillItem/FillItem'
import FIllItem2 from '../FillItem/FIllItem2'
export default function FormOverView({ formData }) {
    const [checks, setChecks] = useState(null)

    return (
        <div className="form-overview-container">
            <div className="form-overview">
                <h3 className='from-title'>{formData.title}</h3>
                <p className='from-description'>{formData.descriptions}</p>
{
                    formData?.checked?
                        formData &&
                        formData?.fields?.length > 0 &&
                        formData.fields.map((field) => (
                            <FillItem
                                key={field.uuid}
                                field={field}
                                setChecks={setChecks}
                            />
                        )):
                            formData &&
                            formData?.fields?.length > 0 &&
                            formData.fields.map((field) => (
                                <FIllItem2
                                    key={field.uuid}
                                    field={field}
                                    setChecks={setChecks}
                                />
                            ))
}
                 
                    
                
            </div>
        </div>
    )
}
