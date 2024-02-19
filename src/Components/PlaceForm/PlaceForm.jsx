import React from 'react'
import './PlaceForm.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FillItem from '../FillItem/FillItem';
export default function PlaceForm({ back, title, description, fields }) {

    return (
        <>
            <div style={{ width: "95%", margin: "0 auto" }}>
                <div className='my-3'>
                    <div
                        onClick={back}
                        style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                    >
                        <ArrowBackIcon
                            style={{ fontSize: "1rem", cursor: "pointer" }} />back
                    </div>
                </div>
                <div className='placeForm'>
                    <h3 className='from-title'>{title}</h3>
                    <p className='from-description'>{description}</p>

                    {
                        fields.map((field) => (
                            <FillItem
                                key={field.uuid}
                                field={field}
                            />
                        ))
                    }

                </div>
            </div>
        </>

    )
}
