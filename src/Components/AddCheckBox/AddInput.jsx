import React from 'react'
import './AddInput.css'
import AddIcon from '@mui/icons-material/Add';
export default function AddInput({ createBox }) {
    return (
        <>
            <div className="checkBoxText-Wrapper d-flex align-items-start justify-content-between mt-3">
                <p className="checkBoxText">
                    Add
                </p>
                <AddIcon
                    onClick={createBox}
                    style={{ fontSize: "1rem", cursor: "pointer" }} />
            </div>
        </>
    )
}
