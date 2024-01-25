import React, { useState } from 'react'
import Button from '../Button/Button'
import './FormSignIn.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IP } from '../../App'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from '../../Images/logo.svg'


export default function FormSignIn({ handleTabChange }) {
    const navigate = useNavigate();
    const [isPrivate, setIsPerivate] = useState(true)
    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)

    // for change of situation of eye
    const handleToggle = () => {
        setIsPerivate((e) => !e);
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
        const post = { username: userName, password: password };

        try {
            const response = await fetch(`${IP}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });

            if (response.status === 200) {
                const responseData = await response.json();
                toast.success("Successfull", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(responseData)
                console.log(post)
                navigate('/')

            }
        } catch (e) {

            console.log(e)
            toast.error("Login Faild due to :" + e.message, {
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
                            btnCalss={"button-component"}
                            type={"submit"}
                            content={"Sign In"}
                        /></div>
                </form>
            </div>
        </>
    )
}
