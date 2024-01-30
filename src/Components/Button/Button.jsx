import React from 'react'
import './Button.css'

export default function Button({ type, content, btnCalss, onClick, disabled }) {
    return (
        <>
            <button
                className={`button-component ${btnCalss} ${disabled ? "btn-component" : ""}`}
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {content}
            </button>
        </>
    )
}