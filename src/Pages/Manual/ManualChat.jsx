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
export default function ManualChat() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [text, setText] = useState("")
    const [allMessage, setAllMessage] = useState([])
    const messageEndRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const micRef = useRef(null);
    const navigate = useNavigate()


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
                // console.log(response.data)
                setAllMessage(response.data)
            }
            else {
                setAllMessage([])
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                // localStorage.clear()
                // navigate("/login")
            }
        }
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
                    console.log(response)
                    setText('')

                }

            }
            catch (e) {
                console.log(e)
                if (e.response.status === 401) {
                    // localStorage.clear()

                    // navigate("/login")
                }
            }

        }
    }

    const sendFile = async (e, employeeId) => {
        const access = localStorage.getItem("access")
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("receiver", employeeId)

        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {

            const response = await axios.post(`${IP}/chat/send-message-senior/`, formData, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
            }

        } catch (e) {
            // console.log(e)
            // if (e.response.status === 401) {
            //     localStorage.clear()
            //     navigate("/login")
            // }
        }

    }

    const sendVoice = async (audioBlob) => {

        const uuid = localStorage.getItem("userUuid")
        const access = localStorage.getItem('access')
        if (audioBlob) {

            const formvoiceData = new FormData();
            formvoiceData.append('file', audioBlob);
            formvoiceData.append("receiver", uuid)
            const headers = {
                Authorization: `Bearer ${access}`
            };
            try {

                const response = await axios.post(`${IP}/chat/send-message-senior/`, formvoiceData, {
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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getMessages()
    //         // getUnreadMessages();

    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);


    useEffect(() => {

        if (allMessage.length > 5) {
            messageEndRef.current?.scrollIntoView();
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

                                            <span className="member-name">Abbas ghorbani</span>
                                        </div>
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
                                            className='send-icon2'
                                            onClick={() => sendText(selectedUser)} />
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

                    </> : <div style={{ width: "100%" }}>
                        <Header />

                        <div className="chat-container">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={avatar} alt="member" />
                                        </div>
                                        <span className="member-name"> Abbas ghorbani</span>
                                    </div>
                                </div>

                                {allMessage.map((message) => (
                                    <Message key={message.id}  {...message} />
                                ))}
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
                    </div>
            }

        </>
    )
}
