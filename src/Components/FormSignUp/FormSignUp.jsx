import React, { useState } from 'react'
import Button from '../Button/Button'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './FormSingUp.css'
import { IP } from '../../App';
import { useNavigate } from "react-router-dom";
import DropDown from '../DropDown/DropDown';


export default function FormSignUp({ handleTabChange }) {
    const navigate = useNavigate();
    const [allTypeUsers, setAllTypeUsers] = useState(["Senior Officer", "Ordinary Officer", "Manual Worker"])
    const [isPrivate, setIsPerivate] = useState(true)
    const [signInUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: '',
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
        userType: ""
    }
    )

    // for change of situation of eye
    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

    // change values of signInUpInfo state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    //change type of user in drop down
    const changeTypeUser = (value) => {
        signInUpInfo.userType = value
        console.log(signInUpInfo)
    }

    // send vlaue of form to server
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
            { name: 'phone', regex: /^[0-9]+$/ },
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
        if (signInUpInfo.password !== signInUpInfo.confirmPass) {
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


        try {
            const response = await fetch(`${IP}//`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInUpInfo),
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

                navigate('/signin')

            }
        } catch (e) {
            console.log(e)
            toast.error(`${e.response.data.message}`, {
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
                            name='firstName'
                            className='input-signin input-name'
                            type="text"
                            autoComplete="false"
                            placeholder='First Name'
                            value={signInUpInfo.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='input-signup-wrapper'>
                        <input
                            name='lastName'
                            className='input-signin input-lastNAme'
                            type="text"
                            autoComplete="false"
                            placeholder='Last Name'
                            value={signInUpInfo.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='input-signup-wrapper'>
                        <input
                            name='phone'
                            className='input-signin input-phone'
                            type="text"
                            autoComplete="false"
                            placeholder='Phone Number'
                            value={signInUpInfo.phone}
                            onChange={handleChange}
                            // for just enter number value
                            onKeyPress={(e) => {
                                const isValid = /^\d+$/.test(e.key);
                                if (!isValid) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                    <div className='input-signup-wrapper'>
                        <input
                            name='email'
                            className='input-signin input-email'
                            autoComplete="false"
                            placeholder='Email'
                            value={signInUpInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <DropDown name="usertype"
                        allTypeUsers={allTypeUsers}
                        defaultDrop={"User"}
                        changeValue={changeTypeUser}
                    />
                    <div className='input-signup-wrapper d-flex align-items-end'>
                        <input
                            name='password'
                            className='input-signin input-password'
                            type={isPrivate ? "password" : "text"}
                            autoComplete="false"
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
                            name='confirmPass'
                            className='input-signin input-password'
                            type={isPrivate ? "password" : "text"}
                            autoComplete="false"
                            placeholder='ConfirmPassword'
                            value={signInUpInfo.confirmPass}
                            onChange={handleChange}
                            // for user cant paste password value in confirmpass
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
                            btnCalss={"button-component"}
                            type={"submit"}
                            content={"Sign Up"}
                        /></div>
                </form>
            </div>
        </>
    )
}
