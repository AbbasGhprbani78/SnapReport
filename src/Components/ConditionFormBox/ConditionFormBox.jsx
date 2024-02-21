import React, { useEffect, useState } from 'react'
import './ConditionFormBox.css'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';


export default function ConditionFormBox({
    styleCalss,
    title,
    openFormHandler,
    dec,
    setTitle,
    setDescription,
    form,
    setFields,
    setFormUuid,
    accept,
    paddingStyle
}) {

    const acceptForm = form.fields[0].checks[0].accept


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
                    {
                        accept ? (
                            <>
                                <div className={`ConditionFormBox-container-small ${paddingStyle}`}>
                                    <div className='d-flex align-items-center justify-content-between mb-4'>
                                        <div className='d-flex align-items-center'>
                                            <div className={`BoxForm ${styleCalss}`}></div>
                                            <p className='ConditionFormBox-permit'>{title}</p>
                                        </div>
                                        {
                                            accept &&
                                            <p className='condition-request-text'>{acceptForm === "2" ?
                                                (<>
                                                    Accepted <span style={{ marginLeft: "15px" }} ><DoneIcon className='condition-request-done icon-condition' /></span>
                                                </>) :
                                                acceptForm === "1" ?
                                                    (<>
                                                        Reject <span style={{ marginLeft: "15px" }} ><CloseIcon className='condition-request-reject icon-condition' /></span>
                                                    </>) :
                                                    <>pending <span style={{ marginLeft: "15px" }}><ReportGmailerrorredIcon className='condition-request-pending icon-condition' /></span></>}
                                            </p>
                                        }

                                    </div>
                                    <p className='ConditionFormBox-dec'>{dec}</p>
                                    <div className='viewmore mt-3' onClick={() => {
                                        openFormHandler()
                                        setTitle(form.title)
                                        setDescription(form.descriptions)
                                        setFields(form.fields)
                                        setFormUuid(form.uuid)
                                    }
                                    }>view More</div>
                                </div>
                            </>) : (
                            <>
                                <div className={`ConditionFormBox-container-small ${paddingStyle}`} style={{ width: "100%" }}>
                                    <div style={{ marginBottom: "1.7%" }} className='d-flex align-items-center justify-content-between mb-4'>
                                        <div className='d-flex align-items-center '>
                                            <div className={`BoxForm ${styleCalss}`}></div>
                                            <p className='ConditionFormBox-permit'>{title}</p>
                                        </div>
                                        <div className='viewmore'
                                            onClick={() => {
                                                openFormHandler()
                                                setTitle(form.title)
                                                setDescription(form.descriptions)
                                                setFields(form.fields)
                                                setFormUuid(form.uuid)
                                            }}>view More
                                        </div>
                                    </div>
                                    <div>
                                        <p className='ConditionFormBox-dec'>{dec}</p>
                                    </div>
                                </div>
                            </>)
                    }

                </>
            ) : (
                <>
                    <div className='ConditionFormBox-container'>
                        {
                            accept ? (
                                <>
                                    <div className="ConditionFormBox-left">
                                        <div className='ConditionFormBox-top'>
                                            <div className='d-flex align-items-center'>
                                                <div className={`BoxForm ${styleCalss}`}></div>
                                                <p className='ConditionFormBox-permit'>{title}</p>
                                            </div>
                                            <div className='viewmore'
                                                onClick={() => {
                                                    openFormHandler()
                                                    setTitle(form.title)
                                                    setDescription(form.descriptions)
                                                    setFields(form.fields)
                                                    setFormUuid(form.uuid)
                                                }}>view More</div>
                                        </div>
                                        <p className='ConditionFormBox-dec'>{dec}</p>
                                    </div>
                                    <div className="permkitFormBox-right">
                                        {
                                            accept &&
                                            <p className='condition-request-text'>{acceptForm === "2" ?
                                                (<>
                                                    Accepted <span style={{ marginLeft: "15px" }} ><DoneIcon className='condition-request-done icon-condition' /></span>
                                                </>) :
                                                acceptForm === "1" ?
                                                    (<>
                                                        Reject <span style={{ marginLeft: "15px" }} ><CloseIcon className='condition-request-reject icon-condition' /></span>
                                                    </>) :
                                                    <>pending <span style={{ marginLeft: "15px" }}><ReportGmailerrorredIcon className='condition-request-pending icon-condition' /></span></>}
                                            </p>
                                        }
                                    </div>
                                </>) : (
                                <>
                                    <div style={{ width: "100%" }}>
                                        <div style={{ marginBottom: "1.7%" }} className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex align-items-center'>
                                                <div className={`BoxForm ${styleCalss}`}></div>
                                                <p className='ConditionFormBox-permit'>{title}</p>
                                            </div>
                                            <div className='viewmore'
                                                onClick={() => {
                                                    openFormHandler()
                                                    setTitle(form.title)
                                                    setDescription(form.descriptions)
                                                    setFields(form.fields)
                                                    setFormUuid(form.uuid)
                                                }}>view More
                                            </div>
                                        </div>
                                        <div>
                                            <p className='ConditionFormBox-dec'>{dec}</p>
                                        </div>
                                    </div>
                                </>)
                        }

                    </div>
                </>)
        }

        </>

    )
}
