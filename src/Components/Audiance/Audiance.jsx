import React from 'react';
import './Audiance.css';
import CloseIcon from '@mui/icons-material/Close';
import UserInfo from '../UserInfo/UserInfo';
import Accordion from 'react-bootstrap/Accordion';
import avatar from '../../Images/avatar.png'
import { IP } from '../../App';

export default function Audiance({ isActive, toggleAudianceActive, selectUser, users, setuserProf }) {

    const filterUnique = (array) => {
        const uniqueKeys = new Set();
        const uniqueItems = [];

        for (const item of array) {
            const key = `${item.group}-${item.date}`;
            if (!uniqueKeys.has(key)) {
                uniqueKeys.add(key);
                uniqueItems.push(item);
            }
        }

        return uniqueItems;
    }

    return (
        <>
            <div className={`audiance-container ${isActive ? "activeAudiance" : ""}`}>
                <div className="audiance-container-header">
                    <CloseIcon
                        onClick={toggleAudianceActive}
                        style={{ cursor: "pointer" }} />
                </div>
                <div className='audiance-content mt-3'>
                    {
                        users.map(userItem => (
                            <Accordion defaultActiveKey={null} key={userItem.first_name}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <div className='audiance-header'>
                                            <div className='img-profile-item'>
                                                <img src={userItem.image ? `${IP}${userItem.image}` : avatar} alt="profile" />
                                            </div>
                                            <p className='audiance-name'>{userItem?.first_name} {userItem?.last_name}</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            filterUnique(userItem?.form).map(item => (
                                                <UserInfo
                                                    key={item.group}
                                                    user={item}
                                                    selectUser={() => selectUser(userItem, item.group)}
                                                    setuserProf={setuserProf}
                                                />
                                            ))
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))
                    }
                </div>
            </div>
        </>
    );
}


