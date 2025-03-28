import React, { useEffect, useState } from 'react'
import './ConditionFormBox.css'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import dayjs from 'dayjs';

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

    const acceptForm = form?.fields[0]?.checks[0]?.accept




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
                                                    <>Pending <span style={{ marginLeft: "15px" }}><ReportGmailerrorredIcon className='condition-request-pending icon-condition' /></span></>}
                                            </p>
                                        }

                                    </div>
                                    <p className='job-cond-fill-form mb-2'>
                                        {form?.fields[0]?.checks[0]?.user?.user_type === "O" ? "Ordinary Officer" :
                                            form?.fields[0]?.checks[0]?.user?.user_type === "M" ? "Manual Worker" :
                                                form?.fields[0]?.checks[0]?.user?.user_type === "S" ? "Senior Officer" : ""
                                        }
                                        <span style={{ marginLeft: "10px", fontSize: ".9rem" }}>{dayjs(form?.fields[0]?.checks[0]?.date).format('YYYY-MM-DD HH:mm')}</span>
                                    </p>
                                    <div className='mb-2'>FormNumber : {form?.fields[0]?.checks[0]?.group}</div>
                                    <p className='ConditionFormBox-dec'>{dec}</p>
                                    <p className='viewmore my-2' onClick={() => {
                                        openFormHandler()
                                        setTitle(form.title)
                                        setDescription(form.descriptions)
                                        setFields(form.fields)
                                        setFormUuid(form.uuid)
                                    }
                                    }>view More</p>
                                </div>
                            </>) : (
                            <>
                                <div className={`ConditionFormBox-container-small ${paddingStyle}`} style={{ width: "100%" }}>
                                    <div style={{ marginBottom: "1.7%" }} className='d-flex align-items-center justify-content-between mb-4'>
                                        <div className='d-flex align-items-center '>
                                            <div className={`BoxForm ${styleCalss}`}></div>
                                            <p className='ConditionFormBox-permit'>{title}</p>
                                        </div>
                                        <p className='viewmore'
                                            onClick={() => {
                                                openFormHandler()
                                                setTitle(form.title)
                                                setDescription(form.descriptions)
                                                setFields(form.fields)
                                                setFormUuid(form.uuid)
                                            }}>view More
                                        </p>
                                    </div>
                                    <p className='job-cond-fill-form mb-2'>
                                        {form?.fields[0]?.checks[0]?.user?.user_type === "O" ? "Ordinary Officer" :
                                            form?.fields[0]?.checks[0]?.user?.user_type === "M" ? "Manual Worker" :
                                                form?.fields[0]?.checks[0]?.user?.user_type === "S" ? "Senior Officer" : ""
                                        }
                                        <span style={{ marginLeft: "10px", fontSize: ".9rem" }}>{dayjs(form?.fields[0]?.checks[0]?.date).format('YYYY-MM-DD HH:mm')}</span>
                                    </p>
                                    <div className='mb-2'>FormNumber : {form?.fields[0]?.checks[0]?.group}</div>
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
                                            <p className='viewmore'
                                                onClick={() => {
                                                    openFormHandler()
                                                    setTitle(form.title)
                                                    setDescription(form.descriptions)
                                                    setFields(form.fields)
                                                    setFormUuid(form.uuid)
                                                }}>view More</p>
                                        </div>
                                        <p className='job-cond-fill-form mb-2'>
                                            {form?.fields[0]?.checks[0]?.user?.user_type === "O" ? "Ordinary Officer" :
                                                form?.fields[0]?.checks[0]?.user?.user_type === "M" ? "Manual Worker" :
                                                    form?.fields[0]?.checks[0]?.user?.user_type === "S" ? "Senior Officer" : ""
                                            }
                                            <span style={{ marginLeft: "10px", fontSize: ".9rem" }}>{dayjs(form?.fields[0]?.checks[0]?.date).format('YYYY-MM-DD HH:mm')}</span>
                                        </p>
                                        <div className='mb-2'>FormNumber : {form?.fields[0]?.checks[0]?.group}</div>

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
                                                    <>Pending <span style={{ marginLeft: "15px" }}><ReportGmailerrorredIcon className='condition-request-pending icon-condition' /></span></>}
                                            </p>
                                        }
                                    </div>
                                </>)
                                : (
                                    <>
                                        <div style={{ width: "100%" }}>
                                            <div style={{ marginBottom: "1.7%" }} className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    <div className={`BoxForm ${styleCalss}`}></div>
                                                    <p className='ConditionFormBox-permit'>{title}</p>
                                                </div>
                                                <p className='viewmore'
                                                    onClick={() => {
                                                        openFormHandler()
                                                        setTitle(form.title)
                                                        setDescription(form.descriptions)
                                                        setFields(form.fields)
                                                        setFormUuid(form.uuid)
                                                    }}>view More
                                                </p>
                                            </div>
                                            <p className='job-cond-fill-form mb-2'>
                                                {form?.fields[0]?.checks[0]?.user?.user_type === "O" ? "Ordinary Officer" :
                                                    form?.fields[0]?.checks[0]?.user?.user_type === "M" ? "Manual Worker" :
                                                        form?.fields[0]?.checks[0]?.user?.user_type === "S" ? "Senior Officer" : ""
                                                }
                                                <span style={{ marginLeft: "10px", fontSize: ".9rem" }}>{dayjs(form?.fields[0]?.checks[0]?.date).format('YYYY-MM-DD HH:mm')}</span>
                                            </p>
                                            <div className='mb-2'>FormNumber : {form?.fields[0]?.checks[0]?.group}</div>
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


