import React from 'react'
import './AddInput.css'
import AddIcon from '@mui/icons-material/Add';
export default function AddInput({ textAdd, createBox }) {
    return (
        <>
            <div className="checkBoxText-Wrapper d-flex align-items-start justify-content-between">
                <p className="checkBoxText">
                    {textAdd === "text" ? "Item" :
                        textAdd === "checkbox" ? "checkBox" :
                            textAdd === "radio" ? "RadioButton" :
                                ""
                    }
                </p>
                <AddIcon
                    onClick={createBox}
                    style={{ fontSize: "1rem", cursor: "pointer" }} />
            </div>
        </>
    )
}
