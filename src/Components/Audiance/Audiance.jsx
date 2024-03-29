import React from 'react'
import './Audiance.css'
import CloseIcon from '@mui/icons-material/Close';
import UserInfo from '../UserInfo/UserInfo';
export default function Audiance({ isActive, toggleAudianceActive, selectUser, user }) {

    return (
        <>
            <div className={`audiance-container ${isActive ? "activeAudiance" : ""}`}>
                <div className="audiance-container-header">
                    <CloseIcon
                        onClick={toggleAudianceActive}
                        style={{ cursor: "pointer" }} />
                </div>
                {
                    user.map(user => (
                        <UserInfo
                            key={user.uuid}
                            user={user}
                            selectUser={() => selectUser(user.uuid)}
                        />
                    ))
                }

            </div>
        </>
    )
}
