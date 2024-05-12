import React, { useState } from 'react'
import Button from '../Button/Button'
import './FormSignIn.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IP } from '../../App'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMyContext } from '../RoleContext';
import logo from '../../Images/logo.svg'
import axios from 'axios';




export default function FormSignIn({ handleTabChange }) {
    const navigate = useNavigate();
    const [isPrivate, setIsPerivate] = useState(true)
    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const { sharedData, updateSharedData } = useMyContext();

    // for change of situation of eye
    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }


    const getLable = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer${access}`
        }
        try {
            const response = await axios.post(`${IP}/form/single-send-data-to-api/`, {
                headers
            })

            if (response.status === 200) {
                localStorage.setItem('levelrick', response.data.label);
                localStorage.setItem("message", response.data.message);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    // check vlaue of input
    const validate = () => {
        let result = true;
        if (userName === "" || userName === null) {
            result = false;
            toast.warning(" Username cannot be empty", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (password === "" || password === null) {
            result = false;
            toast.warning("Password cannot be empty", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        return result;
    };


    // send value of form to server
    async function submit(e) {
        e.preventDefault();
        if (!validate()) return;
        const post = { username: userName.toLowerCase(), password: password };

        try {
            const response = await axios.post(`${IP}/user/login/`, post, {
                headers: {
                },
            });

            if (response.status === 200) {
                window.localStorage.setItem("access", response.data.access);
                window.localStorage.setItem('uuid', response.data.uuid);
                window.localStorage.setItem("refresh", response.data.refresh);
                updateSharedData(response.data.user_type)
                if (response.data.user_type === "S") {
                    getLable()
                    navigate("/")
                } if (response.data.user_type === "O") {
                    getLable()
                    navigate("/ordinaryhome")
                } if (response.data.user_type === "M") {
                    navigate("/manualhome")
                }
            }


        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                toast.error(`${error.response.data.detail}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        }
    }




    return (
        <>
            <div className={`form-container signIn`}>
                <div className="header-signin">
                    <img className='header-SignIn-img' src={logo} alt="logo" />
                </div>
                <p className='signIn-text'>Welcome Back</p>
                <form className='form-signin' onSubmit={submit} >
                    <div className='input-signin-wrapper'>
                        <input
                            className='input-signin input-username'
                            type="text"
                            autoComplete="false"
                            placeholder='UserName'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className='input-signin-wrapper d-flex align-items-end'>
                        <input
                            className='input-signin input-password'
                            type={isPrivate ? "password" : "text"}
                            autoComplete="false"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isPrivate ? (
                            <FaEye
                                className="setin"
                                color="#80c8e7"
                                size="1.3rem"
                                onClick={handleToggle}
                            />
                        ) : (
                            <FaEyeSlash
                                className="setin"
                                color="#80c8e7"
                                size="1.3rem"
                                onClick={handleToggle}
                            />
                        )}
                    </div>
                    <p className='registered text-muted'>Not registered yet?
                        <span className='link-to-form' onClick={() => handleTabChange(2)}> Create Account</span>
                    </p>
                    <div className='btn-signIn-wrapper'>
                        <Button

                            btnCalss={"button-component only"}
                            type={"submit"}
                            content={"Sign In"}
                        /></div>
                </form>
            </div>
        </>
    )
}
