import React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../Components/FormWorker/FormContext'
export default function Input({
    uuid
}) {
    const { handleChange } = useContext(FormContext)

    return (
        <div>
            <input
                id={uuid}
                type="text"
                onChange={e => handleChange(uuid, e)}
            />
        </div>
    )
}
