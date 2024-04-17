import React, { useEffect, useRef, useState } from 'react'
import '../../Style/Chat.css'
import avatar from '../../Images/avatar.png'
import SendSharpIcon from '@mui/icons-material/SendSharp';
import AttachmentSharpIcon from '@mui/icons-material/AttachmentSharp';
import { IP } from '../../App';
import axios from 'axios';
import Message from '../../Components/Message/Message'
import { ReactMic } from 'react-mic';
import { useNavigate } from 'react-router-dom';
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Header from '../../Components/Header/Header';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SeniorOffCanvas from '../../Components/OffCanvas/SeniorOffCanvas';
import ManualOffcanvas from '../../Components/OffCanvas/ManualOffcanvas';
import OrdinaryOffcanvas from '../../Components/OffCanvas/OrdinaryOffcanvas';
import { useMyContext } from '../../Components/RoleContext';
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'

export default function OrdinaryChat() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [text, setText] = useState("")
    const [allMessage, setAllMessage] = useState([])
    const messageEndRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const micRef = useRef(null);
    const navigate = useNavigate()
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showfile, setShowFile] = useState(false)
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [userInfo, setUserInfo] = useState('')
    const prevLengthRef = useRef(0);

    const handleToggleOffCanvas = () => {
        setShowOffCanvas(!showOffCanvas);
    };
    const { sharedData } = useMyContext();
    const { type } = useMyContext()


    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onStop = (recordedData) => {
        sendVoice(recordedData.blob);

    };

    const getMessages = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/chat/get-chat-senior/`, {
                headers,
            })

            if (response.status === 200) {
                setAllMessage(response.data)
                setUserInfo(response.data[0].sender)
            }

            else {

                setAllMessage([])
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const sendText = async () => {
        const access = localStorage.getItem("access")
        const trimmedText = text.trim();
        if (trimmedText) {

            const headers = {
                Authorization: `Bearer ${access}`
            };

            const body = {
                message: trimmedText,
            }
            try {
                const response = await axios.post(`${IP}/chat/send-message-senior/`, body, {
                    headers,
                })

                if (response.status === 200) {
                    console.log(response.data)
                    setText('')
                }

            }
            catch (e) {

                if (e.response.status === 401) {
                    localStorage.clear()

                    navigate("/login")
                }
            }

        }
    }

    const sendFile = async (e) => {
        setShowFile(true)
        const access = localStorage.getItem("access")
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {

            const response = await axios.post(`${IP}/chat/send-message-senior/`, formData, {
                headers,
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadPercentage(progress);
                },
            })

            if (response.status === 200) {

                setShowFile(false)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }

    }

    const sendVoice = async (audioBlob) => {

        const access = localStorage.getItem('access')
        if (audioBlob) {

            const formvoiceData = new FormData();
            formvoiceData.append('voice', audioBlob);

            const headers = {
                Authorization: `Bearer ${access}`
            };
            try {

                const response = await axios.post(`${IP}/chat/send-message-senior/`, formvoiceData, {
                    headers,
                })

                if (response.status === 200) {

                }

            } catch (e) {

                if (e.response.status === 401) {
                    localStorage.clear()
                    navigate("/login")
                }
            }
        }

    }

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        if (allMessage.length <= 3) {
            return
        }
        if (allMessage.length > prevLengthRef.current) {
            messageEndRef.current?.scrollIntoView();
            prevLengthRef.current = allMessage.length;
        }
    }, [allMessage]);


    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftkey) {
            event.preventDefault()
            sendText()
        }
    }

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
        <>
            {
                windowWidth < 576 ?
                    <>
                        <>
                            <div className="chat-container">
                                <div className="chat-body">
                                    <div className="chat-header">
                                        <div className="member-info">
                                            <div className="member-img-wrapper">
                                                <img className='member-img' src={avatar} alt="member" />
                                            </div>

                                            <span className="member-name">{userInfo && userInfo.first_name} {userInfo && userInfo.last_name}</span>
                                        </div>
                                        <div>
                                            {
                                                (sharedData || type) === "S" ?
                                                    <SeniorOffCanvas
                                                        show={showOffCanvas}
                                                        onHide={() => setShowOffCanvas(false)}
                                                    />
                                                    :
                                                    (sharedData || type) === "M" ?
                                                        <ManualOffcanvas
                                                            show={showOffCanvas}
                                                            onHide={() => setShowOffCanvas(false)}
                                                        />
                                                        :
                                                        (sharedData || type) === "O" ?
                                                            <OrdinaryOffcanvas
                                                                show={showOffCanvas}
                                                                onHide={() => setShowOffCanvas(false)}
                                                            /> :
                                                            null
                                            }

                                            <div className="header-wrapper d-flex">
                                                <IconButton
                                                    style={{ color: "#45ABE5", marginLeft: "5px" }}
                                                    aria-label="open drawer"
                                                    edge="start"
                                                    onClick={handleToggleOffCanvas}
                                                >
                                                    <MenuIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                    <>
                                        {
                                            allMessage.map((message) => (
                                                <Message key={message.id}  {...message} />
                                            ))

                                        }
                                        {showfile &&
                                            <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                                                <div className='file-content' style={{ position: "relative" }}>
                                                    <a className='place' href="#" target='blank' download>
                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                                                    </a>
                                                    <div className='progress-upload'>
                                                        <div style={{ width: "55px", height: "55px" }}>
                                                            <CircularProgressbar
                                                                minValue={0}
                                                                maxValue={100}
                                                                value={uploadPercentage}
                                                                strokeWidth={5}
                                                                background={false}
                                                                styles={{
                                                                    path: {
                                                                        stroke: `#45ABE5`,
                                                                    },
                                                                    trail: {
                                                                        stroke: "#ffffff",
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        }
                                    </>
                                    <div ref={messageEndRef} />
                                </div>
                                <div className="chat-actions">
                                    <div className="input-wrapper">
                                        <input
                                            onKeyDown={handleKeyDown}
                                            value={text}
                                            onChange={e => setText(e.target.value)}
                                            type="text"
                                            className='input-send'
                                            placeholder='Text Message...' />
                                        <SendSharpIcon
                                            className='send-icon2'
                                            onClick={() => sendText()} />
                                        <div className={text ? "plus-actions2 hiddenActions" : "plus-actions2"}>
                                            <span className='voice-wrapper2'>
                                                <ReactMic className='Voice-wave'
                                                    record={isRecording}
                                                    onStop={onStop}
                                                    ref={micRef}
                                                />
                                                {
                                                    isRecording ? (

                                                        <MicOffIcon onClick={stopRecording} />
                                                    ) : (
                                                        <KeyboardVoiceIcon onClick={startRecording} />
                                                    )
                                                }
                                            </span>
                                            <span className='send-file-action2'>
                                                <input
                                                    onChange={(e) => sendFile(e)}
                                                    type="file"
                                                    id='file'
                                                />
                                                <label
                                                    style={{ cursor: "pointer", width: "100%", height: "100%" }}
                                                    htmlFor="file">
                                                    <AttachmentSharpIcon />
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </> :

                    <div style={{ width: "100%" }}>
                        <Header />
                        <div className="chat-container">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={avatar} alt="member" />
                                        </div>
                                        <span className="member-name">{userInfo && userInfo.first_name} {userInfo && userInfo.last_name}</span>
                                    </div>
                                </div>

                                <>
                                    {
                                        allMessage.map((message) => (
                                            <Message key={message.id}  {...message} />
                                        ))

                                    }
                                    {showfile &&
                                        <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                                            <div className='file-content' style={{ position: "relative" }}>
                                                <a className='place' href="#" target='blank' download>
                                                    <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                                                </a>
                                                <div className='progress-upload'>
                                                    <div style={{ width: "55px", height: "55px" }}>
                                                        <CircularProgressbar
                                                            minValue={0}
                                                            maxValue={100}
                                                            value={uploadPercentage}
                                                            strokeWidth={5}
                                                            background={false}
                                                            styles={{
                                                                path: {
                                                                    stroke: `#45ABE5`,
                                                                },
                                                                trail: {
                                                                    stroke: "#ffffff",
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </>
                                <div ref={messageEndRef} />
                            </div>
                            <div className="chat-actions">
                                <div className="input-wrapper">
                                    <input
                                        onKeyDown={handleKeyDown}
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        type="text"
                                        className='input-send'
                                        placeholder='Text Message...' />
                                    <SendSharpIcon
                                        className='send-icon'
                                        onClick={() => sendText()}
                                    />
                                </div>
                                <div className="plus-actions">
                                    <span className='voice-wrapper'>
                                        <ReactMic className='Voice-wave'
                                            record={isRecording}
                                            onStop={onStop}
                                            ref={micRef}
                                        />
                                        {
                                            isRecording ? (

                                                <MicOffIcon onClick={stopRecording} />
                                            ) : (
                                                <KeyboardVoiceIcon onClick={startRecording} />
                                            )
                                        }
                                    </span>
                                    <span className='send-file-action'>
                                        <input
                                            onChange={(e) => sendFile(e)}
                                            type="file"
                                            id='file'
                                        />
                                        <label
                                            style={{ cursor: "pointer", width: "100%", height: "100%" }}
                                            htmlFor="file">
                                            <AttachmentSharpIcon />
                                        </label>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
