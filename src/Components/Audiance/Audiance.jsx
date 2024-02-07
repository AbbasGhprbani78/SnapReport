import React from 'react'
import './Audiance.css'
import CloseIcon from '@mui/icons-material/Close';
import UserInfo from '../UserInfo/UserInfo';
export default function Audiance({ isActive, toggleAudianceActive, selectUser }) {


    return (
        <>
            <div className={`audiance-container ${isActive ? "activeAudiance" : ""}`}>
                <div className="audiance-container-header">
                    <CloseIcon
                        onClick={toggleAudianceActive}
                        style={{ cursor: "pointer" }} />
                </div>
                <UserInfo
                    selectUser={selectUser} />
            </div>
        </>
    )
}
