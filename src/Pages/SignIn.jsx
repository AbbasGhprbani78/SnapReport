import React, { useState, useEffect } from 'react';
import '../Style/SignIn.css';
import { Row, Col } from 'react-bootstrap';
import FormSignIn from '../Components/FormSignIn/FormSignIn'
import FormSignUp from '../Components/FormSignUp/FormSignUp';
import logo from '../Images/logo.svg';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {

    const [loginTab, setLoginTab] = useState(1)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const changeTab = (tabnumber) => {
        setLoginTab(tabnumber)
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
                windowWidth < 768 ? (
                    <>
                        <div className='backGround'>

                            <div className="header-signin">
                                <img className='header-SignIn-img' src={logo} alt="logo" />
                            </div>
                            {
                                loginTab === 1 ?
                                    <FormSignIn
                                        handleTabChange={changeTab}
                                    /> :
                                    loginTab === 2 ?
                                        <FormSignUp
                                            handleTabChange={changeTab}
                                        />
                                        : ""
                            }
                        </div>
                    </>
                ) : (
                    <div style={{ position: "fixed", bottom: "0", height: "100%" }} className='container-fluid'>
                        <Row className='d-flex signIn-container'>

                            <Col className='signIn-left' xs={12} md={6} lg={5}>

                                {
                                    loginTab === 1 ?
                                        <FormSignIn
                                            handleTabChange={changeTab}
                                        /> :
                                        loginTab === 2 ?
                                            <FormSignUp
                                                handleTabChange={changeTab}
                                            />
                                            : ""
                                }


                            </Col>
                            <Col className='signIn-right' xs={12} md={6} lg={7}>
                                <div className="logo-text-wrapper">
                                    <img className='logo-right' src={logo} alt="logo" />
                                    <p className='text-singIn'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam in numquam, odit quis amet laborum aliquid. Temporibus quae labore tempora ipsum, delectus</p>
                                </div>
                            </Col>

                        </Row>
                    </div>
                )
            }


            <ToastContainer />


        </>
    )
}
