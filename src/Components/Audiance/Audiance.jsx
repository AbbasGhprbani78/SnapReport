import React from 'react'
import './Audiance.css'
import CloseIcon from '@mui/icons-material/Close';
import UserInfo from '../UserInfo/UserInfo';
export default function Audiance({ isActive, toggleAudianceActive, selectUser, user, setuserProf }) {

    // console.log(user)


    const ordinaryAudiance = [...user].filter(item => item.user_type === "O")
    const manualAudiance = [...user].filter(item => item.user_type === "M")

    return (
        <>
            <div className={`audiance-container ${isActive ? "activeAudiance" : ""}`}>
                <div className="audiance-container-header">
                    <CloseIcon
                        onClick={toggleAudianceActive}
                        style={{ cursor: "pointer" }} />
                </div>

                <div className="ordinaryAudianceWrapper">
                    <p className='ordinaryAudianc-title'>Ordinary Officer</p>
                    <div className="ordinaryAudiance-content">
                        {ordinaryAudiance.length ?
                            ordinaryAudiance.map(user => (
                                <UserInfo
                                    key={user.uuid}
                                    user={user}
                                    selectUser={() => selectUser(user.uuid)}
                                    setuserProf={setuserProf}
                                />
                            )) :
                            <>
                                <p className='nothing-user'>
                                    there is no user !
                                </p>
                            </>
                        }

                    </div>
                </div>
                <div className="manualAudianceWrapper">
                    <p className='manualAudianc-title'>Manual Worker</p>
                    <div className="manualAudiance-content">
                        {manualAudiance.length ?
                            manualAudiance.map(user => (
                                <UserInfo
                                    key={user.uuid}
                                    user={user}
                                    selectUser={() => selectUser(user.uuid)}
                                />
                            ))
                            :
                            <p className='nothing-user'>
                                there is no user !
                            </p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
