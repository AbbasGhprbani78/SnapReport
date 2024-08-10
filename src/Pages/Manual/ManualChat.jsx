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
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HistoryForm from '../../Components/HistoryForm/HistoryForm';

export default function ManualChat() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [text, setText] = useState("")
    const [allMessage, setAllMessage] = useState([])
    const messageEndRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const micRef = useRef(null);
    const navigate = useNavigate()
    const [showfile, setShowFile] = useState(false)
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const prevLengthRef = useRef(0);
    const [isAudianceActive, setIsAudianceActive] = useState(false);
    const [allFormInfo, setAllFormInfo] = useState([])
    const [AllForms, setAllforms] = useState([])
    const [group, setGroup] = useState("")
    const [showChat, setShowChat] = useState(false)

    const filterUnique = (array) => {
        const uniqueKeys = new Set();
        const uniqueItems = [];

        for (const item of array) {
            const key = `${item.group}-${item.date}`;
            if (!uniqueKeys.has(key)) {
                uniqueKeys.add(key);
                uniqueItems.push(item);
            }
        }

        return uniqueItems;
    }

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onStop = (recordedData) => {
        sendVoice(recordedData.blob);

    };


    const getAllForms = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {

            const response = await axios.get(`${IP}/user/senior-chat/`, {
                headers,

            })

            if (response.status === 200) {
                setAllFormInfo(response.data)
                setGroup(response.data[0]?.form[0]?.group)
                const forms = filterUnique(response.data[0]?.form)
                if (forms) {
                    setAllforms(forms)
                }

            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }

    }

    const getMessages = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            permit_form: true,
            full_form: group,
        }

        try {
            const response = await axios.post(`${IP}/chat/get-chat-senior/`, body, {
                headers,
            })

            if (response.status === 200) {
                setAllMessage(response.data)
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
                permit_form: true,
                full_form: group,
            }
            try {
                const response = await axios.post(`${IP}/chat/send-message-senior/`, body, {
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

    const sendFile = async (e) => {
        setShowFile(true)
        const access = localStorage.getItem("access")
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("permit_form", true)
        formData.append(" full_form", group)

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
            formvoiceData.append("permit_form", true)
            formvoiceData.append(" full_form", group)

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
        getAllForms()
    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            getMessages()
        }, 1000);
        return () => clearInterval(interval);
    }, [group]);



    useEffect(() => {
        if (allMessage.length <= 3) {
            return
        }
        if (allMessage.length > prevLengthRef.current) {
            messageEndRef.current?.scrollIntoView();
            prevLengthRef.current = allMessage.length;
        }
    }, [allMessage]);


    useEffect(() => {

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftkey) {
            event.preventDefault()
            sendText()
        }
    }

    const toggleAudianceActive = () => {
        setIsAudianceActive(prevState => !prevState);
    };

    return (
        <>
            {
                windowWidth < 992 ?

                    <>
                        {
                            showChat ?
                                <div className="chat-container">
                                    <div className="chat-body">
                                        <div className="chat-header">
                                            <div className="member-info">
                                                <div className="member-img-wrapper">
                                                    <img className='member-img' src={allFormInfo ? `${IP}${allFormInfo[0]?.image}` : avatar} alt="member" />
                                                </div>
                                                <span className="member-name">{allFormInfo && allFormInfo[0]?.first_name} {allFormInfo && allFormInfo[0]?.last_name}</span>
                                            </div>
                                            <div>
                                                <div className="header-wrapper d-flex">
                                                    <ArrowForwardIcon onClick={() => setShowChat(false)} />
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
                                </div> :
                                <>
                                    <Header />
                                    <p style={{ color: "#6EC1E4", padding: "12px" }}>History Chats</p>
                                    <div className='history-content mt-3'>
                                        {
                                            AllForms.length > 0 && AllForms.map(form => (
                                                <div
                                                    key={form.group}
                                                    className="history-item d-flex justify-content-between"
                                                    onClick={() => {
                                                        setGroup(form.group)
                                                        setShowChat(true)
                                                    }}
                                                >
                                                    <p>Form Number : {form.group}</p>
                                                    <p>{form.date}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                        }


                    </>

                    :

                    <div style={{ width: "100%" }}>
                        <HistoryForm
                            toggleAudianceActive={toggleAudianceActive}
                            isActive={isAudianceActive}
                            AllForms={AllForms}
                            setGroup={setGroup}
                        />
                        <div className="chat-container">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <div className="member-info">
                                        <div className="member-img-wrapper">
                                            <img className='member-img' src={allFormInfo ? `${IP}${allFormInfo[0]?.image}` : avatar} alt="member" />
                                        </div>
                                        <span className="member-name">{allFormInfo && allFormInfo[0]?.first_name} {allFormInfo && allFormInfo[0]?.last_name}</span>
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
                                        allMessage.length > 0 &&
                                        allMessage?.map((message) => (
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
