import React from 'react'
import './FormOverView'
import FormDisplay from '../FormDisplay/FormDisplay'
export default function FormOverView({ formData }) {
    return (
        <div className="form-overview-container">
            <div className="form-overview">
                <FormDisplay fromInfom={formData} />
            </div>
        </div>
    )
}
