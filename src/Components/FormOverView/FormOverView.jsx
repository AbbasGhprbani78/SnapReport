import React from 'react'
import './FormOverView.css'
import FormDisplay from '../FormDisplay/FormDisplay'
export default function FormOverView({ formData }) {
    return (
        <div className="form-overview-container">
            <div className="form-overview">
                <FormDisplay fromInfom={formData} ishover={true} disable={true} />
            </div>
        </div>
    )
}
