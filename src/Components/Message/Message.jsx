
import React, { useState, useEffect } from 'react'
import './Message.css'
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import { IP } from '../../App';
import dayjs from 'dayjs';


export default function Message(props) {

        const dateObject = dayjs(props.created_at).format('YYYY-MM-DD HH:mm');;
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);
        useEffect(() => {

                const handleWindowResize = () => {
                        setWindowWidth(window.innerWidth);
                };

                window.addEventListener('resize', handleWindowResize);

                return () => {
                        window.removeEventListener('resize', handleWindowResize);
                }
        }
        )

        const user_uuid = localStorage.getItem("uuid")
        const imgPattern = /(jpg|png|jpeg|webp|bmp|gif|svg|tiff)$/i;



        return (
                <>
                        <>
                                {
                                        windowWidth < 600 ?
                                                <>
                                                        {props.sender.uuid === user_uuid ?
                                                                (<>
                                                                        <div className='mt-3'>
                                                                                <div className='d-flex align-items-end  col-sm-12' style={{ direction: "rtl" }}>
                                                                                        {props.message &&
                                                                                                <div className="message-wrapper mt-2">
                                                                                                        <div className="message-content content-right">
                                                                                                                <p className="message-text">
                                                                                                                        {props.message}
                                                                                                                </p>
                                                                                                                <p className="message-time">
                                                                                                                        {dateObject}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }
                                                                                        {props.file && imgPattern.test(props.file) &&

                                                                                                <div className='d-flex align-items-end mt-5 col-sm-12 my-5' style={{ direction: "rtl" }}>
                                                                                                        <a
                                                                                                                className='img-url '
                                                                                                                href={`${IP}${props.file}`}
                                                                                                                target='blank'
                                                                                                                style={{ textDecoration: "none" }}
                                                                                                        >
                                                                                                                <div className='file-content d-flex flex-column'>
                                                                                                                        <img className='img-send' src={`${IP}${props.file}`} />
                                                                                                                        <p className="message-time">
                                                                                                                                {dateObject}
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                        </a>

                                                                                                </div>}

                                                                                        {props.file && !imgPattern.test(props.file) &&
                                                                                                <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                                                                                                        <div className='file-content'>
                                                                                                                <a className='place' href={`${IP}${props.file}`} target='blank' download>
                                                                                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                                                                                                                </a>
                                                                                                                <p className="message-time">
                                                                                                                        {dateObject}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }
                                                                                        {props.voice &&

                                                                                                <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                                                                                                        <div className='file-content'>
                                                                                                                <audio className='audioright' src={`${IP}${props.voice}`} controls></audio>
                                                                                                                <p className="message-time-audio">
                                                                                                                        {dateObject}
                                                                                                                </p>
                                                                                                        </div>

                                                                                                </div>}
                                                                                </div>
                                                                        </div>

                                                                </>

                                                                ) : (
                                                                        <>
                                                                                <div className='align-items-center mt-3 col-sm-12'>
                                                                                        {
                                                                                                props.message &&
                                                                                                <div className="message-wrapper mt-4">

                                                                                                        <div className="message-content content-left">
                                                                                                                <p className="message-text">
                                                                                                                        {props.message}
                                                                                                                </p>
                                                                                                                <p className="message-time">
                                                                                                                        {dateObject}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }

                                                                                        {props.file && imgPattern.test(props.file) &&
                                                                                                <div className='d-flex mt-5 user align-items-end my-5'>
                                                                                                        <a
                                                                                                                className='img-url'
                                                                                                                href={`${IP}${props.file}`}
                                                                                                                target='blank'
                                                                                                                style={{ textDecoration: "none" }}
                                                                                                        >
                                                                                                                <div className='d-flex flex-column' style={{ marginLeft: "10px" }}>
                                                                                                                        <img src={(`${IP}${props.file}`)} className='img-send' />
                                                                                                                        <p className="message-time">
                                                                                                                                {dateObject}
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                        </a>

                                                                                                </div>
                                                                                        }

                                                                                        {props.voice &&

                                                                                                <div className='d-flex mt-4 user align-items-end'>

                                                                                                        <div style={{ marginLeft: "10px" }}>
                                                                                                                <audio className='audioChat audio-left' src={`${IP}${props.voice}`} controls ></audio>
                                                                                                                <p className=" message-time-audio">
                                                                                                                        {dateObject}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }

                                                                                        {
                                                                                                props.file && !imgPattern.test(props.file) &&

                                                                                                <div className='d-flex mt-4 user align-items-end'>

                                                                                                        <div style={{ marginLeft: "10px" }}>
                                                                                                                <a href={`${IP}${props.file}`} className='place' target='blank' download>
                                                                                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-left' />
                                                                                                                </a>
                                                                                                                <p className="message-time">
                                                                                                                        {dateObject}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }
                                                                                </div>

                                                                        </>
                                                                )

                                                        }
                                                </>
                                                :
                                                <>
                                                        {props.sender.uuid === user_uuid ?
                                                                (<>
                                                                        <div className='mt-5  d-flex justify-content-between align-items-center chat-near'>
                                                                                <p className="message-time">
                                                                                        {dateObject}
                                                                                </p>
                                                                                <div className='d-flex align-items-end  col-sm-10' style={{ direction: "rtl" }}>
                                                                                        {props.message &&
                                                                                                <div className="message-wrapper mt-2">
                                                                                                        <div className="message-content content-right">
                                                                                                                <p className="message-text">
                                                                                                                        {props.message}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }
                                                                                        {props.file && imgPattern.test(props.file) &&

                                                                                                <div className='d-flex align-items-end mt-5 col-sm-10 my-5' style={{ direction: "rtl" }}>
                                                                                                        <a
                                                                                                                className='img-url '
                                                                                                                href={`${IP}${props.file}`}
                                                                                                                target='blank'
                                                                                                                style={{ textDecoration: "none" }}
                                                                                                        >
                                                                                                                <div className='file-content d-flex flex-column'>
                                                                                                                        <img className='img-send' src={`${IP}${props.file}`} />
                                                                                                                </div>
                                                                                                        </a>

                                                                                                </div>}

                                                                                        {props.file && !imgPattern.test(props.file) &&
                                                                                                <div className='d-flex align-items-end mt-4 col-sm-10' style={{ direction: "rtl" }}>
                                                                                                        <div className='file-content'>
                                                                                                                <a className='place' href={`${IP}${props.file}`} target='blank' download>
                                                                                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                                                                                                                </a>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }
                                                                                        {props.voice &&

                                                                                                <div className='d-flex align-items-end mt-4 col-sm-10' style={{ direction: "rtl" }}>
                                                                                                        <div className='file-content'>
                                                                                                                <audio className='audioright' src={`${IP}${props.voice}`} controls></audio>
                                                                                                        </div>

                                                                                                </div>}
                                                                                </div>
                                                                        </div>

                                                                </>

                                                                ) : (
                                                                        <>
                                                                                <div className='mt-5  d-flex justify-content-between  align-items-center chat-near'>
                                                                                        {
                                                                                                props.message &&
                                                                                                <div className="message-wrapper mt-4">
                                                                                                        <div className="message-content  content-left">
                                                                                                                <p className="message-text">
                                                                                                                        {props.message}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }

                                                                                        {props.file && imgPattern.test(props.file) &&
                                                                                                <div className='d-flex mt-5 user align-items-end my-5'>
                                                                                                        <a
                                                                                                                className='img-url'
                                                                                                                href={`${IP}${props.file}`}
                                                                                                                target='blank'
                                                                                                                style={{ textDecoration: "none" }}
                                                                                                        >
                                                                                                                <div className='d-flex flex-column' style={{ marginLeft: "10px" }}>
                                                                                                                        <img src={(`${IP}${props.file}`)} className='img-send' />
                                                                                                                </div>
                                                                                                        </a>

                                                                                                </div>
                                                                                        }

                                                                                        {props.voice &&

                                                                                                <div className='d-flex mt-4 user align-items-end'>

                                                                                                        <div style={{ marginLeft: "10px" }}>
                                                                                                                <audio className='audioChat audio-left' src={`${IP}${props.voice}`} controls ></audio>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }

                                                                                        {
                                                                                                props.file && !imgPattern.test(props.file) &&

                                                                                                <div className='d-flex mt-4 user align-items-end'>

                                                                                                        <div style={{ marginLeft: "10px" }}>
                                                                                                                <a href={`${IP}${props.file}`} className='place' target='blank' download>
                                                                                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-left' />
                                                                                                                </a>
                                                                                                        </div>
                                                                                                </div>
                                                                                        }
                                                                                        <p className="message-time">
                                                                                                {dateObject}
                                                                                        </p>
                                                                                </div>

                                                                        </>
                                                                )

                                                        }

                                                </>
                                }
                        </>

                </>
        )
}




// const voicePattern = /(mp3|wav|ogg|m4a|webm|mpeg|blob|aac|alac|flac|aiff|wma|ape)$/i;
// const filePattern = /(pdf|txt|docx|doc|pptx|ppt|xlsx|xls|accdb|mdb|AVI|MKV|MP4|MOV|WMV|FLV|3GP|jsx|js|css|html|json|java|py|ts|php|zip|rar|exe)$/i;