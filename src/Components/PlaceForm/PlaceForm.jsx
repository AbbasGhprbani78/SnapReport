import React, { useState } from 'react'
import './PlaceForm.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FillItem from '../FillItem/FillItem';
import axios from 'axios';
import swal from "sweetalert";
import { IP } from '../../App';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatForm from '../../Pages/ChatForm/ChatForm';
import ChatForm2 from '../../Pages/ChatForm2/ChatForm2';

export default function PlaceForm({ back, title, description, fields, formUuid, getAllFillForms, notseniro }) {

    const [accept, setAccept] = useState(null);
    const [checks, setChecks] = useState(null)
    const [showChatPage, setShowChatPage] = useState(false)
    const [showchatForm2, setShowChatForm2] = useState(false)

    // console.log(fields[0]?.checks[0])


    const sendCondition = async (e, accept) => {
        e.preventDefault();
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            uuid: formUuid,
            accept: accept,
            group: checks
        };


        swal({
            title: "Are you Sure ?",
            icon: "warning",
            buttons: ["No", "Yes"],

        }).then(async (result) => {

            if (result) {
                try {
                    const response = await axios.post(`${IP}/form/get-form-data/`, body, {
                        headers,
                    });

                    if (response.status === 200) {
                        toast.success(`Done successfully`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            style: {
                                backgroundColor: '#64bbe5'
                            }
                        });
                        setTimeout(() => {
                            getAllFillForms()
                            back()
                        }, 2000)

                    }
                } catch (e) {

                    console.log("Error:", e);
                    if (e.response.status === 401) {
                        localStorage.clear();
                        navigate("/login");
                    }
                }
            }
        });
    };


    return (
        <>{
            showchatForm2 ?
                < ChatForm2
                    setShowChatForm2={setShowChatForm2}
                    group={fields[0]?.checks[0]?.group}
                />
                : <>
                    {
                        showChatPage ?
                            <ChatForm
                                setShowChatPage={setShowChatPage}
                                group={fields[0]?.checks[0]?.group}
                                uuid={fields[0]?.checks[0]?.user.uuid} /> :
                            <div style={{ width: "95%", margin: "0 auto" }}>
                                <div className='my-3'>
                                    <div
                                        onClick={back}
                                        style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                                    >
                                        <ArrowBackIcon
                                            style={{ fontSize: "1rem", cursor: "pointer" }} />back
                                    </div>
                                </div>
                                <div className='about-user-fill-wrapper my-2 d-flex justify-content-between align-items-center flex-wrap'>
                                    <div>
                                        <span className='about-user-fill-form fname-fill-form'>
                                            {fields[0]?.checks[0]?.user.first_name}
                                        </span>
                                        <span className='about-user-fill-form lname-fill-form'>
                                            {fields[0]?.checks[0]?.user?.last_name}
                                        </span>
                                    </div>
                                    <p className='job-cond-fill-form'>
                                        {fields[0]?.checks[0]?.user?.user_type === "O" ? "Ordinary Officer" :
                                            fields[0]?.checks[0]?.user?.user_type === "M" ? "Manual Worker" :
                                                fields[0]?.checks[0]?.user?.user_type === "S" ? "Senior Officer" : ""
                                        }
                                    </p>
                                </div>
                                <div className='placeForm'>
                                    <h3 className='from-title'>{title}</h3>
                                    <p className='from-description'>{description}</p>

                                    {
                                        fields.map((field) => (
                                            <FillItem
                                                key={field.uuid}
                                                field={field}
                                                setChecks={setChecks}
                                            />
                                        ))
                                    }

                                </div>
                                {
                                    formUuid &&
                                    <div className='d-flex justify-content-between mt-4'>
                                        {
                                            fields[0]?.checks[0]?.accept === "2" ?
                                                <div className="chat-only-form" onClick={() => setShowChatPage(true)}>
                                                    <ChatBubbleOutlineIcon />
                                                </div>
                                                :
                                                null
                                        }

                                        <div className=' btn-ar-wrapper mb-3'>
                                            <button className='btn-ar acceptBtn' onClick={(e) => {
                                                setAccept("2")
                                                sendCondition(e, "2")

                                            }}>Accept</button>
                                            <button className='btn-ar rejecttBtn' onClick={(e) => {
                                                setAccept("1")
                                                sendCondition(e, "1")
                                            }}>Reject</button>
                                        </div>
                                    </div>
                                }
                                {
                                    notseniro && fields[0]?.checks[0]?.accept === "2" &&
                                    <div className='mt-4'>
                                        <div className="chat-only-form" onClick={() => setShowChatForm2(true)}>
                                            <ChatBubbleOutlineIcon />
                                        </div>
                                    </div>

                                }

                            </div>
                    }
                </>
        }


            <ToastContainer />
        </>

    )
}
