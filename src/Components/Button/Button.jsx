import React from 'react'
import './Button.css'

export default function Button({ type, content, btnCalss }) {
    return (
        <>
            <button
                className={`button-component ${btnCalss}`}
                type={type}

            >
                {content}
            </button>
        </>
    )
}