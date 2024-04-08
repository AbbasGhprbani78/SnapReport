import React, { useState } from 'react'
import './AddInput.css'
import AddIcon from '@mui/icons-material/Add';
export default function AddInput({ createBox }) {
    const [clicked, setClicked] = useState(false);

    const handleIconClick = () => {
        createBox();
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
    };
    return (
        <>
            <div className="checkBoxText-Wrapper d-flex align-items-start justify-content-between my-3">
                <p className="checkBoxText">
                    Add
                </p>
                <div className={`icon-wrapper ${clicked ? 'rotate-animation' : ''}`} onClick={handleIconClick}>
                    <AddIcon className='addIcon' style={{ fontSize: "1.2rem", cursor: "pointer" }} />
                </div>
            </div>
        </>
    )
}
