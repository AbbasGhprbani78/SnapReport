import React, { useEffect, useRef, useState } from 'react'
import '../../Style/Chat.css'
import avatar from '../../Images/avatar.png'
import SendSharpIcon from '@mui/icons-material/SendSharp';
import AttachmentSharpIcon from '@mui/icons-material/AttachmentSharp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Audiance from '../../Components/Audiance/Audiance';
import UserInfo from '../../Components/UserInfo/UserInfo';
import { IP } from '../../App'
import axios from 'axios';
import Message from '../../Components/Message/Message'
import { ReactMic } from 'react-mic';
import { useNavigate } from 'react-router-dom';
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '../../Components/Header/Header';
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import AiHeader from '../../Components/AiHeader/AiHeader';
import Accordion from 'react-bootstrap/Accordion';

export default function Chat() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [users, setUsers] = useState([])
    const [text, setText] = useState("")
    const [allMessage, setAllMessage] = useState([])
    const messageEndRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const micRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState();
    const [audiuanceinfo, setAudiuanceInfo] = useState()
    const [isAudianceActive, setIsAudianceActive] = useState(false);
    const [showChat, setShowChat] = useState(false)
    const navigate = useNavigate()
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [showfile, setShowFile] = useState(false)
    const prevLengthRef = useRef(0);
    const [imgProfile, setImageProfile] = useState(null)
    const [mainGroup, setMainGroup] = useState("")


    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onStop = (recordedData) => {
        sendVoice(recordedData.blob);
    };


    const getAllUser = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/user/user-chat/`, {
                headers,
            })

            if (response.status === 200) {
                setUsers(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    const getMessages = async (selectedUser) => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            permit_form: true,
            full_form: mainGroup,
            receiver: selectedUser.uuid
        }


        try {
            const response = await axios.post(`${IP}/chat/get-chat/`, body, {
                headers,
            })

            if (response.status === 200) {
                setAllMessage(response.data)
                console.log(response.data)
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


    const sendText = async () => {
        const access = localStorage.getItem("access")
        const uuid = localStorage.getItem("uuiduserChat")
        const group = localStorage.getItem("group")
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
        const uuid = localStorage.getItem("uuiduserChat")
        const group = localStorage.getItem("group")

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
        const uuid = localStorage.getItem("uuiduserChat")
        const group = localStorage.getItem("group")
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


    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftkey) {
            event.preventDefault()
            sendText(selectedUser)
        }
    }

    const toggleAudianceActive = () => {
        setIsAudianceActive(prevState => !prevState);
    };


    const selectUser = (user, group) => {
        setImageProfile(user?.image)
        setAudiuanceInfo(user)
        setSelectedUser(user)
        setShowChat(true)
        localStorage.setItem("uuiduserChat", user.uuid)
        setIsAudianceActive(false)
        prevLengthRef.current = 0
        if (group) {
            localStorage.setItem("group", group)
            setMainGroup(group)
        } else {
            localStorage.setItem("group", user?.form[0]?.group)
            setMainGroup(user?.form[0]?.group)
        }

    }

    useEffect(() => {
        getAllUser()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages(selectedUser)

        }, 1000);
        return () => clearInterval(interval);
    }, [mainGroup]);


    useEffect(() => {
        if (users.length > 0) {
            const defaultUser = users[0]
            selectUser(defaultUser)
            setSelectedUser(defaultUser)
        }
    }, [users])


    useEffect(() => {

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
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



    return (
        <>
            {
                windowWidth < 992 ?
                    <>
                        {showChat ?
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
                                            <ArrowForwardIcon onClick={() => setShowChat(false)} />
                                        </div>
                                        <>
                                            {
                                                allMessage.length > 0 &&
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
                                    <AiHeader />
                                    <div className="list-users">
                                        <div className='audiance-content mt-3'>
                                            <Accordion defaultActiveKey={null}>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <div className='audiance-header'>
                                                            <div className='img-profile-item'>
                                                                <img src="../../../src/Images/avatar.png" alt="profile" />
                                                            </div>
                                                            <p className='audiance-name'>Abbas Ghorbani</p>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectForm={() => selectUser(user.uuid)}
                                                        />

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion defaultActiveKey={null}>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <div className='audiance-header'>
                                                            <div className='img-profile-item'>
                                                                <img src="../../../src/Images/avatar.png" alt="profile" />
                                                            </div>
                                                            <p className='audiance-name'>Abbas Ghorbani</p>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />

                                                        <UserInfo
                                                            key={user.uuid}
                                                            user={user}
                                                            selectUser={() => selectUser(user.uuid)}
                                                        />
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>

                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </> :
                    <div style={{ width: "100%" }}>
                        {/* <AiHeader /> */}
                        <Audiance
                            selectUser={selectUser}
                            isActive={isAudianceActive}
                            toggleAudianceActive={toggleAudianceActive}
                            users={users}
                        />
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
                                <AccountBoxIcon
                                    onClick={toggleAudianceActive}
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "2rem"
                                    }}
                                />
                            </div>
                            <div className="chat-body">
                                <>
                                    {
                                        allMessage.length > 0 && allMessage.map((message) => (
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
            }

        </>
    )

}



//user/senior-cha