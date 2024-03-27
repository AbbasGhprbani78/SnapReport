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
import Header from '../Components/Header/Header';
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
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
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [showfile, setShowFile] = useState(false)
    const prevLengthRef = useRef(0);

    const getAllUser = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/user/user-chat`, {
                headers,
            })

            if (response.status === 200) {
                setUser(response.data)
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
        getAllUser()
    }, [])

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


    const getMessages = async (selectedUser) => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            receiver: selectedUser,
        }

        try {
            const response = await axios.post(`${IP}/chat/get-chat/`, body, {
                headers,
            })

            if (response.status === 200) {
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


    const sendText = async (employeeId) => {
        const access = localStorage.getItem("access")
        const trimmedText = text.trim();
        if (trimmedText) {

            const headers = {
                Authorization: `Bearer ${access}`
            };

            const body = {
                message: trimmedText,
                receiver: employeeId
            }

            try {
                const response = await axios.post(`${IP}/chat/send-message/`, body, {
                    headers,
                })

                if (response.status === 200) {
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


    const sendFile = async (e, employeeId) => {
        setShowFile(true)
        const access = localStorage.getItem("access")
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("receiver", employeeId)

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
                console.log(response)
                setShowFile(false)
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const sendVoice = async (audioBlob) => {

        const uuid = localStorage.getItem("userUuid")
        const access = localStorage.getItem('access')
        if (audioBlob) {
            const formvoiceData = new FormData();
            formvoiceData.append('voice', audioBlob);
            formvoiceData.append("receiver", uuid)
            const headers = {
                Authorization: `Bearer ${access}`
            };
            try {

                const response = await axios.post(`${IP}/chat/send-message/`, formvoiceData, {
                    headers,
                })

                if (response.status === 200) {
                    console.log(response)
                }

            } catch (e) {
                console.log(e)
                if (e.response.status === 401) {
                    localStorage.clear()
                    navigate("/login")
                }
            }
        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages(selectedUser)

        }, 1000);
        return () => clearInterval(interval);
    }, [selectedUser]);

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
            sendText(selectedUser)
        }
    }

    const toggleAudianceActive = () => {
        setIsAudianceActive(prevState => !prevState);
    };

    const selectUser = (employeeId) => {
        localStorage.removeItem('userUuid')
        window.localStorage.setItem("userUuid", employeeId)
        const mainUser = user.find(employee => employee.uuid == employeeId)
        setAudiuanceInfo(mainUser)
        setActiveUser(employeeId);
        setSelectedUser(employeeId)
        if (activeEmployee) {
            setShowChat(true)
            toggleAudianceActive()
            prevLengthRef.current = 0
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
                        {showChat ?
                            <>
                                <div className="chat-container">
                                    <div className="chat-body">
                                        <div className="chat-header">
                                            <div className="member-info">
                                                <div className="member-img-wrapper">
                                                    <img className='member-img' src={avatar} alt="member" />
                                                </div>
                                                {
                                                    audiuanceinfo &&
                                                    <span className="member-name">{audiuanceinfo && audiuanceinfo.first_name} {audiuanceinfo.last_name}</span>
                                                }
                                            </div>
                                            <ArrowForwardIcon onClick={() => setShowChat(false)} />
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
                            </> :
                            <>
                                <div style={{ width: "100%" }}>
                                    <Header />
                                    <div className="list-users">
                                        {
                                            user && user.length > 0 && user.map((user) => (
                                                <UserInfo
                                                    key={user.uuid}
                                                    user={user}
                                                    selectUser={() => selectUser(user.uuid)}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        }

                    </> : <div style={{ width: "100%" }}>
                        <Header />
                        <Audiance
                            selectUser={selectUser}
                            isActive={isAudianceActive}
                            toggleAudianceActive={toggleAudianceActive}
                            user={user}
                        />
                        <div className="chat-container">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={avatar} alt="member" />
                                        </div>
                                        {
                                            audiuanceinfo &&
                                            <span className="member-name">{audiuanceinfo && audiuanceinfo.first_name} {audiuanceinfo.last_name}</span>
                                        }

                                    </div>
                                    <AccountBoxIcon
                                        onClick={toggleAudianceActive}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "2rem"
                                        }}
                                    />
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
            }

        </>
    )
}

// const getUnreadMessages = async () => {
//     const access = localStorage.getItem("access")
//     const headers = {
//         Authorization: `Bearer ${access}`
//     };
//     try {
//         const response = await axios.get(`${IP}/chat/get-unread-chat/`, {
//             headers,
//         });

//         if (response.status === 200) {
//             console.log(response)
//             // setAllMessage(prevState => {
//             //     return [...prevState, ...response.data.Messages]
//             // })

//         }

//     } catch (e) {
//         console.log(e)
//         if (e.response.status === 401) {
//             localStorage.removeItem('access')
//             localStorage.removeItem('uuid')
//             localStorage.removeItem('refresh')
//             localStorage.removeItem("type")
//             navigate("/login")
//         }
//     }
// }



// 