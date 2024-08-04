import React from 'react'
import '../../App.css'
import { Alert } from 'react-bootstrap';
import { useContext } from 'react';
import { SearchContext } from '../Context/SearchContext';
export default function AiHeader() {

    const { isAccident, locationMe } = useContext(SearchContext)


    return (
        <>
            {

                <>
                    {
                        isAccident == 2 ?
                            <Alert className='alert-wrapper alert-accident'>
                                <div className='content-alert'>
                                    <h4 className='alert-title-ai'>Danger</h4>
                                    <p className='alert-text'>In The Region Of {locationMe} There Is A Hight Accident Detected</p>
                                    <p className='powerd-text'>Powered By Snap Report Ai</p>
                                </div>

                            </Alert> :
                            isAccident == 1 ?
                                <Alert className='alert-wrapper warningAccident'>
                                    <div className='content-alert'>
                                        <h4 className='alert-title-ai'>Warning</h4>
                                        <p className='alert-text'>In The Region Of {locationMe} There Is A Low Accident Detected</p>
                                        <p className='powerd-text'>Powered By Snap Report Ai</p>
                                    </div>

                                </Alert> :
                                isAccident == 0 ?
                                    <Alert className='alert-wrapper noAccident'>
                                        <div className='content-alert'>
                                            <h4 className='alert-title-ai'>No Accident</h4>
                                            <p className='alert-text'>In The Region Of {locationMe} There Is A No Accident Detected</p>
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
