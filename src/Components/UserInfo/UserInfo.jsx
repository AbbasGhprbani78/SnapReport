import React from 'react'
import avatar from '../../Images/avatar.png'
export default function UserInfo({ selectUser, user }) {
    return (
        <div
            className="audiance-item"
            onClick={selectUser}
        >
            <div className="audiance-img-container">
                <img src={avatar} alt="audiance img" className="audiance-img" />
            </div>
            {
                user &&
                <span className="audiance-text">{user.first_name}{user.last_name}</span>
            }

        </div>
    )
}
