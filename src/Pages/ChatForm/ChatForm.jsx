import React, { useEffect, useRef, useState } from 'react'
import '../../Style/Chat.css'
import avatar from '../../Images/avatar.png'
import SendSharpIcon from '@mui/icons-material/SendSharp';
import AttachmentSharpIcon from '@mui/icons-material/AttachmentSharp';
import { IP } from '../../App'
import axios from 'axios';
import Message from '../../Components/Message/Message'
import { ReactMic } from 'react-mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'


export default function ChatForm({ setShowChatPage, group, uuid }) {
    const [text, setText] = useState("")
    const [allMessage, setAllMessage] = useState([])
    const [showfile, setShowFile] = useState(false)
    const [selectedUser, setSelectedUser] = useState();
    const [imgProfile, setImageProfile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audiuanceinfo, setAudiuanceInfo] = useState()
    const micRef = useRef(null);
    const messageEndRef = useRef(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const prevLengthRef = useRef(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onStop = (recordedData) => {
        sendVoice(recordedData.blob);
    };

    const sendText = async () => {
        const access = localStorage.getItem("access")
        const trimmedText = text.trim();
        if (trimmedText) {

            const headers = {
                Authorization: `Bearer ${access}`
            };

            const body = {
                message: trimmedText,
                permit_form: true,
                full_form: group,
                receiver: uuid
            }

            try {
                const response = await axios.post(`${IP}/chat/send-message/`, body, {
                    headers,
                })

                if (response.status === 200) {
                    console.log("send")
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
        formData.append("receiver", uuid)
        formData.append("permit_form", true)
        formData.append(" full_form", group)
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {

            const response = await axios.post(`${IP}/chat/send-message/`, formData, {
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
            formvoiceData.append("receiver", uuid);
            formvoiceData.append("permit_form", true)
            formvoiceData.append(" full_form", group)
            const headers = {
                Authorization: `Bearer ${access}`
            };

            try {

                const response = await axios.post(`${IP}/chat/send-message/`, formvoiceData, {
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

        if (allMessage.length <= 3) {
            return
        }
        if (allMessage.length > prevLengthRef.current) {
            messageEndRef.current?.scrollIntoView();
            prevLengthRef.current = allMessage.length;
        }
    }, [allMessage]);


    const getMessages = async () => {
        const access = localStorage.getItem("access")

        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            permit_form: true,
            full_form: group,
            receiver: uuid
        }

        try {
            const response = await axios.post(`${IP}/chat/get-chat/`, body, {
                headers,
            })
            if (response.status === 200) {
                setAudiuanceInfo(response.data[0].receiver)
                setImageProfile(response.data[0].receiver.avatar)
                setAllMessage(response.data)
            }
            else {
                setAllMessage([])
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages()

        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftkey) {
            event.preventDefault()
            sendText(selectedUser)
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
                windowWidth < 992 ?
                    <>

                        <div className="chat-container">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={imgProfile ? `${IP}${imgProfile}` : avatar} alt="member" />
                                        </div>
                                        {
                                            audiuanceinfo &&
                                            <span className="member-name">{audiuanceinfo && audiuanceinfo.first_name} {audiuanceinfo.last_name}</span>
                                        }
                                    </div>
                                    <ArrowForwardIcon onClick={() => setShowChatPage(false)} />
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
                                        onClick={() => sendText(selectedUser)}
                                    />
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
                                                onChange={(e) => sendFile(e, selectedUser)}
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
                    :
                    <>
                        <div style={{ width: "100%" }}>
                            <div className="chat-container">
                                <div className="chat-header">
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={imgProfile ? `${IP}${imgProfile}` : avatar} alt="member" />
                                        </div>
                                        {
                                            audiuanceinfo &&
                                            <span className="member-name">{audiuanceinfo && audiuanceinfo.first_name} {audiuanceinfo.last_name}</span>
                                        }
                                    </div>
                                    <ArrowForwardIcon onClick={() => setShowChatPage(false)} />
                                </div>
                                <div className="chat-body">
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
                                <div className="chat-actions" style={{ bottom: "3px" }}>
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
                                            onClick={() => sendText(selectedUser)}
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
                                                onChange={(e) => sendFile(e, selectedUser)}
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
                        </div >
                    </>
            }

        </>
    )
}





