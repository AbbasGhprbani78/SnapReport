import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Alert } from 'react-bootstrap';
export default function AiHeader() {

    const [isAccident, setIsAccident] = useState(null)
    const [meesageRick, setMessageRisk] = useState()


    useEffect(() => {
        if (location.pathname !== '/login') {
            setIsAccident(localStorage.getItem("levelrick"));
            setMessageRisk(localStorage.getItem("message"));
        }
    }, [location]);

    return (
        <>
            {

                <>
                    {
                        isAccident == 2 ?
                            <Alert className='alert-wrapper alert-accident'>
                                <div className='content-alert'>
                                    <h4 className='alert-title-ai'>Danger</h4>
                                    <p className='alert-text'>{meesageRick}</p>
                                    <p className='powerd-text'>Powered By Snap Report Ai</p>
                                </div>

                            </Alert> :
                            isAccident == 1 ?
                                <Alert className='alert-wrapper warningAccident'>
                                    <div className='content-alert'>
                                        <h4 className='alert-title-ai'>Warning</h4>
                                        <p className='alert-text'>{meesageRick}</p>
                                        <p className='powerd-text'>Powered By Snap Report Ai</p>
                                    </div>

                                </Alert> :
                                isAccident == 0 ?
                                    <Alert className='alert-wrapper noAccident'>
                                        <div className='content-alert'>
                                            <h4 className='alert-title-ai'>No Accident</h4>
                                            <p className='alert-text'>{meesageRick}</p>
                                            <p className='powerd-text'>Powered By Snap Report Ai</p>
                                        </div>

                                    </Alert>
                                    : null
                    }
                </>
            }

        </>

    )
}
