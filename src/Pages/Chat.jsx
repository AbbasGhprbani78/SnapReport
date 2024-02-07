import React, { useEffect, useRef, useState } from 'react'
import '../Style/Chat.css'
import avatar from '../Images/avatar.png'
import SendSharpIcon from '@mui/icons-material/SendSharp';
import AttachmentSharpIcon from '@mui/icons-material/AttachmentSharp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Audiance from '../Components/Audiance/Audiance';
import UserInfo from '../Components/UserInfo/UserInfo';
import { IP } from '../App'
import axios from 'axios';
import Message from '../Components/Message/Message'
import { ReactMic } from 'react-mic';
import { useNavigate } from 'react-router-dom';
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Chat() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [user, setUser] = useState([])
    const [text, setText] = useState("")
    const [allMessage, setAllMessage] = useState([])
    const messageEndRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const micRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState();
    const [audiuanceinfo, setAudiuanceInfo] = useState()
    const [activeEmployee, setActiveUser] = useState(null);
    const [isAudianceActive, setIsAudianceActive] = useState(false);
    const [showChat, setShowChat] = useState(false)
    const navigate = useNavigate()

    const getAllUser = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}//`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)

            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                navigate("/signin")
            }
        }
    }
    // useEffect(() => {
    //     getAllUser()
    // }, [])


    const selectUser = (employeeId) => {
        console.log("se")
        localStorage.removeItem('userUuid')
        window.localStorage.setItem("userUuid", employeeId)
        const mainUser = user.find(employee => employee.uuid == employeeId)
        setAudiuanceInfo(mainUser)
        setActiveUser(employeeId);
        setSelectedUser(employeeId)
        if (selectedUser) {
            setShowChat(true)
        }
    }

    useEffect(() => {

        if (user.length > 0) {
            const inintId = user[0].uuid
            selectUser(inintId)
        }
    }, [user])


    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onStop = (recordedData) => {
        sendVoice(recordedData.blob);

    };

    const getMessages = async (employeeId) => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/get-messages/${employeeId}`, {
                headers,
            })

            if (response.status === 200) {
                setAllMessage(response.data.Messages)

            }
            else {
                setAllMessage([])
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                navigate("/signin")
            }
        }
    }

    const getUnreadMessages = async (employeeId) => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}//${employeeId}`, {
                headers,
            });
            if (response.status === 200) {

                setAllMessage(prevState => {
                    return [...prevState, ...response.data.Messages]
                })

                console.log(response)

            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                navigate("/signin")
            }
        }
    }
    const sendtext = async (employeeId) => {

        const access = localStorage.getItem("access")
        if (text) {

            const headers = {
                Authorization: `Bearer ${access}`
            };

            const body = {
                content: text,
                user_uuid: employeeId
            }
            const newMessage = {
                is_from_manager: true,
                content: text,
                data: text
            }

            setAllMessage(prevState => {
                return [...prevState, newMessage]
            })

            try {
                const response = await axios.post(`${IP}//`, body, {
                    headers,
                })

                if (response.status === 200) {

                    setText('')
                }

            }
            catch (e) {
                setText('')
                console.log(e)
                if (e.response.status === 401) {
                    localStorage.removeItem('access')
                    localStorage.removeItem('uuid')
                    localStorage.removeItem('refresh')

                    navigate("/signin")
                }
            }

        }
    }

    const sendFile = async (e, employeeId) => {
        const access = localStorage.getItem("access")
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("user_uuid", employeeId)

        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {

            const response = await axios.post(`${IP}//`, formData, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                navigate("/signin")
            }
        }

    }

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser);
        }
    }, [selectedUser]);

    const sendVoice = async (audioBlob) => {

        const uuid = localStorage.getItem("userUuid")
        const access = localStorage.getItem('access')
        if (audioBlob) {

            const formvoiceData = new FormData();
            formvoiceData.append('file', audioBlob);
            formvoiceData.append("user_uuid", uuid)
            const headers = {
                Authorization: `Bearer ${access}`
            };
            try {

                const response = await axios.post(`${IP}//`, formvoiceData, {
                    headers,
                })

                if (response.status === 200) {

                    console.log(response)

                }

            } catch (e) {
                console.log(e)
                if (e.response.status === 401) {
                    localStorage.removeItem('access')
                    localStorage.removeItem('uuid')
                    localStorage.removeItem('refresh')
                    navigate("/signin")
                }
            }
        }

    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getUnreadMessages(selectedUser);

    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [allMessage]);


    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [allMessage])

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftkey) {
            sendtext(selectedUser)
            event.preventDefault()
        }
    }

    const exitChatPage = () => {
        setShowChat(false)
    }

    const toggleAudianceActive = () => {
        setIsAudianceActive(prevState => !prevState);
    };
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
                        {showChat ?
                            <>
                                <div className="chat-container">
                                    <div className="chat-header">
                                        <div className="member-info">
                                            <div className="member-img-wrapper">
                                                <img className='member-img' src={avatar} alt="member" />
                                            </div>
                                            <span className="member-name">Abbas Ghorbani</span>
                                        </div>
                                    </div>
                                    <div className="chat-body"></div>
                                    <div className="chat-actions">
                                        <div className="input-wrapper">
                                            <input
                                                onKeyDown={handleKeyDown}
                                                value={text}
                                                onChange={e => setText(e.target.value)}
                                                type="text"
                                                className='input-send'
                                                placeholder='Text Message...' />
                                            <SendSharpIcon className='send-icon2' />
                                            <div className="plus-actions2">
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
                            </> :
                            <>
                                <div className="list-users">
                                    <UserInfo
                                        selectUser={selectUser}
                                    />
                                </div>
                            </>
                        }

                    </> : <>

                        <div className="chat-container">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <Audiance
                                        selectUser={selectUser}
                                        isActive={isAudianceActive}
                                        toggleAudianceActive={toggleAudianceActive}
                                    />
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={avatar} alt="member" />
                                        </div>
                                        <span className="member-name">Abbas Ghorbani</span>
                                    </div>
                                    <AccountBoxIcon
                                        onClick={toggleAudianceActive}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "2rem"
                                        }}
                                    />
                                </div>
                                {
                                    allMessage.map((message, i) => (
                                        <Message key={i}  {...message} />
                                    ))
                                }
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
                                        onClick={sendtext}
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
                    </>
            }

        </>
    )
}
