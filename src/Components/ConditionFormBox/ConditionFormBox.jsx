import React, { useEffect, useState } from 'react'
import './ConditionFormBox.css'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


export default function ConditionFormBox({
    styleCalss,
    title,
    openFormHandler,
    dec,
    setTitle,
    setDescription,
    form,
    setFields

}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <>{
            windowWidth < 817 ? (
                <>
                    <div className='ConditionFormBox-container-small'>
                        <div className='d-flex align-items-center justify-content-between mb-4'>
                            <p className='ConditionFormBox-permit'>{title}</p>
                            <p className='condition-request-text'> Accepted
                                <span style={{ marginLeft: "15px" }} className='condition-request-reject'><CloseIcon /></span>
                            </p>
                        </div>
                        <p className='ConditionFormBox-dec'>{dec}</p>
                        <div className='viewmore mt-3' onClick={openFormHandler}>view More</div>
                    </div>
                </>) : (
                <>
                    <div className='ConditionFormBox-container'>
                        <div className="ConditionFormBox-left">
                            <div className='ConditionFormBox-top'>
                                <div className='d-flex'>
                                    <div className={`BoxForm ${styleCalss}`}></div>
                                    <p className='ConditionFormBox-permit'>{title}</p>
                                </div>
                                <div className='viewmore'
                                    onClick={() => {
                                        openFormHandler()
                                        setTitle(form.title)
                                        setDescription(form.descriptions)
                                        setFields(form.fields)
                                    }}>view More</div>
                            </div>
                            <p className='ConditionFormBox-dec'>{dec}</p>
                        </div>
                        <div className="permkitFormBox-right">
                            <p className='condition-request-text'>Request Accepted <span className='condition-request-reject'><CloseIcon /></span></p>
                        </div>
                    </div>
                </>)
        }

        </>

    )
}
