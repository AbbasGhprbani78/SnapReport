import React, { useEffect, useState } from 'react'
import './NotificationsHome.css'
import NotificationHomeItem from '../NotificationHomeItem/NotificationHomeItem'
import axios from 'axios'
import { IP } from '../../App'
import { useNavigate } from 'react-router-dom';

export default function NotificationsHome({
    styleHeight,
    filledform,
    openDefaultInspectionsForm,
    setRandomId,
    setNotifId,
    heightnotif,
    setGroup
}) {

    const [notifs, setNotifs] = useState(null)
    const navigate = useNavigate()

    const getAllNotifications = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/chat/get-all-notif/`, {
                headers,
            });
            if (response.status === 200) {
                setNotifs(response.data)
            }

        } catch (e) {
            (e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getAllNotifications()
    }, [])

    console.log(notifs)

    return (
        <>
            <div className={`NotificationsHome-container notification-senior
                 ${styleHeight} ${heightnotif}
                  ${notifs && !notifs.length ? "nonotif" : ""}`}>
                <p className='notif-home-title'>Notifications</p>
                <div className={`notif-home-wrapper`}>

                    {
                        notifs &&
                            notifs.length > 0 ?
                            <>
                                {
                                    notifs?.slice().reverse().map(notif => (
                                        <NotificationHomeItem
                                            id={notif.id}
                                            key={notif.id}
                                            isRead={notif.is_read}
                                            date={notif.created_at}
                                            message={notif.message}
                                            filledform={filledform}
                                            openDefaultInspectionsForm={openDefaultInspectionsForm}
                                            random_id={notif.random_data}
                                            setRandomId={setRandomId}
                                            setNotifId={setNotifId}
                                            check={notif.checked}
                                            group={notif.group}
                                            setGroup={setGroup}
                                        />
                                    ))
                                }
                            </> :
                            <>
                                <p className='text-center pb-5'>there is no Notifications !</p>
                            </>

                    }

                </div>
            </div>
        </>
    )
}
