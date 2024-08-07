import React from 'react'
import avatar from '../../Images/avatar.png'
import './UserInfo.css'
import { IP } from '../../App'
export default function UserInfo({ selectUser, user }) {
    return (
        <div
            className="audiance-item"
            onClick={selectUser}
        >
            <p>Form Number : {user?.group}</p>
            <p>{user?.date}</p>
        </div>
    )
}


{/* <div className="audiance-img-container">
                <img src={(user?.avatar ? `${IP}${user?.avatar}` : avatar)} alt="audiance img" className="audiance-img" />
            </div>
            {
                user &&
                <span className="audiance-text">{user.first_name} {user.last_name}</span>
            } */}
