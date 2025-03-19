import React, { useState } from 'react'
import Button from '../Button/Button'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './FormSingUp.css'
import { IP } from '../../App';
import DropDown from '../DropDown/DropDown';
import axios from 'axios';


export default function FormSignUp({ handleTabChange }) {

    const [isPrivate, setIsPerivate] = useState(true)
    const [signInUpInfo, setSignUpInfo] = useState({
        first_name: "",
        last_name: '',
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        user_type: ""
    }
    )

    console.log(signInUpInfo)

    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const changeTypeUser = (value) => {
        (value)
        signInUpInfo.user_type = value
    }


    async function submit(e) {
        e.preventDefault();

        // do check  value of input
        for (const key in signInUpInfo) {
            if (signInUpInfo[key].trim() === "") {
                toast.warning(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
        }

        // reg ex for Validations of inputs
        const inputValidations = [
            { name: 'firstName', regex: /^[a-zA-Z]+$/ },
            { name: 'lastName', regex: /^[a-zA-Z]+$/ },
            { name: 'email', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        ];

        // check Validations of inputs
        for (const validation of inputValidations) {
            const { name, regex } = validation;
            if (!regex.test(signInUpInfo[name])) {
                toast.error(`${name.charAt(0).toUpperCase() + name.slice(1)} is not valid.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
        }

        // it check that the value of password input and confirmpass input is the same
        if (signInUpInfo.password !== signInUpInfo.confirm_password) {
            toast.error("Confirmation password does not match the password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return false;
        }

        const body = signInUpInfo
        try {
            const response = await axios.post(`${IP}/user/signup/`, body, {
                headers: {
                },
            });

            if (response.status === 201) {
                handleTabChange(1)
            }
        } catch (error) {
            toast.error(`${error.response.data.username[0]}`, {
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
            <div className={`form-container signUp`}>
                <p className='signIn-text'>Create Account</p>
                <form className='form-signup' onSubmit={submit}>
                    <div className='input-signup-wrapper'>
                        <input
                            name='first_name'
                            className='input-signin input-name'
                            type="text"
                            autoComplete="off"
                            placeholder='First Name'
                            value={signInUpInfo.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='input-signup-wrapper'>
                        <input
                            name='last_name'
                            className='input-signin input-lastNAme'
                            type="text"
                            autoComplete="off"
                            placeholder='Last Name'
                            value={signInUpInfo.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='input-signup-wrapper'>
                        <input
                            name='username'
                            className='input-signin input-userName'
                            type="text"
                            autoComplete="off"
                            placeholder='user Name'
                            value={signInUpInfo.username}
                            onChange={handleChange}

                        />
                    </div>
                    <div className='input-signup-wrapper'>
                        <input
                            name='email'
                            className='input-signin input-email'
                            autoComplete="off"
                            placeholder='Email'
                            value={signInUpInfo.email}
                            onChange={handleChange}
                        />
                    </div>

                    <DropDown name="user_type"
                        defaultDrop={"User"}
                        changeValue={changeTypeUser}
                    />
                    <div className='input-signup-wrapper d-flex align-items-end'>
                        <input
                            name='password'
                            className='input-signin input-password'
                            type={isPrivate ? "password" : "text"}
                            autoComplete="off"
                            placeholder='Password'
                            value={signInUpInfo.password}
                            onChange={handleChange}
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
                    <div className='input-signup-wrapper d-flex align-items-end'>
                        <input
                            name='confirm_password'
                            className='input-signin input-password'
                            type={isPrivate ? "password" : "text"}
                            autoComplete="off"
                            placeholder='ConfirmPassword'
                            value={signInUpInfo.confirm_password}
                            onChange={handleChange}
                            onPaste={(e) => e.preventDefault()}
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

                    <p className='registered text-muted'>Already have an account?
                        <span className='link-to-form'
                            onClick={() => handleTabChange(1)}>
                            Sign In
                        </span>
                    </p>
                    <div className='btn-signIn-wrapper'>
                        <Button
                            btnCalss={"button-component only"}
                            type={"submit"}
                            content={"Sign Up"}
                        /></div>
                </form>
            </div>
        </>
    )
}

