import React from 'react'
import './Button.css'

export default function Button({ type, content, btnCalss, onClick }) {
    return (
        <>
            <button
                className={`button-component ${btnCalss}`}
                type={type}
                onClick={onClick}
            >
                {content}
            </button>
        </>
    )
}