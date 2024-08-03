import React, { useState } from 'react'
import './NotificationHomeItem.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import swal from 'sweetalert';
import { IP } from '../../App'
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function NotificationHomeItem({
    id,
    isRead,
    date,
    message,
    filledform,
    openDefaultInspectionsForm,
    setRandomId
}) {

    const [read, setRead] = useState(isRead)
    const showNotifDetail = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/chat/get-notif/${id}`, {
                headers,
            });

            if (response.status === 200) {
                swal({
                    title: `${message}`,
                    button: filledform ? filledform : "OK"
                })
                if (filledform) {
                    openDefaultInspectionsForm()
                }
                setRead(1);
            } else if (response.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };
    const dateObject = dayjs(date).format('YYYY/MM/DD HH:mm');

    return (
        <>
            <div className='NotificationHomeItem-container' onClick={showNotifDetail}>
                <div className="user-notif">
                    {
                        read == 1 ?
                            <PersonOutlineOutlinedIcon style={{ color: "#49454f" }} />
                            :
                            <div className='BoxForm' style={{ marginTop: "5px", backgroundColor: "#2fcd96" }}></div>
                    }

                </div>
                <div className={`d-flex flex-column ${read == 1 ? "content-disable" : ""}`} style={{ marginLeft: "10px", width: "100%" }}>
                    <p className="user-notif-name d-flex justify-content-between">
                        Notif item
                        <span className='notif-date'>{dateObject}</span>
                    </p>
                    <p className="notif-user-content">
                        {message.slice(0, 10)}...
                    </p>
                </div>
            </div>
        </>
    )
}
