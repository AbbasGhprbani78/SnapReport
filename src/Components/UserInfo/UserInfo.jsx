import React from 'react'
import avatar from '../../Images/avatar.png'
export default function UserInfo({ selectUser }) {
    return (
        <div
            className="audiance-item"
            onClick={selectUser}
        >
            <div className="audiance-img-container">
                <img src={avatar} alt="audiance img" className="audiance-img" />
            </div>
            <span className="audiance-text">Abbas Ghorbani 7</span>
        </div>
    )
}
