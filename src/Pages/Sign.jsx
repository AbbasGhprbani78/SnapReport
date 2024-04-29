import React, { useState, useEffect } from 'react';
import '../Style/Sign.css';
import { Row, Col } from 'react-bootstrap';
import FormSignIn from '../Components/FormSignIn/FormSignIn'
import FormSignUp from '../Components/FormSignUp/FormSignUp';
import logo from '../Images/logo.svg';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {

    const [loginTab, setLoginTab] = useState(1)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    // for display signin form or signUp form as tab
    const changeTab = (tabnumber) => {
        setLoginTab(tabnumber);
    }


    // to change the page structure for tablet and mobile screen size
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

                            <div className="header-signin-mobile">
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
                    <div className='container-fluid sign-container'>
                        <Row className='d-flex signIn-container'>

                            <Col
                                className={`signIn-left`}
                                xs={12}
                                md={6}
                                lg={5}>

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
                                    <p className='text-singIn'>
                                        SnapReport redefines workplace safety with its innovative form generator and predictive AI engine. Seamlessly create accident, violation, permit, and inspection reports. Predict accidents based on employee profiles, environmental hazards, and equipment factors for unparalleled safety insights. From senior officers to ordinary workers, SnapReport ensures proactive safety measures and streamlined operations.
                                    </p>
                                </div>
                            </Col>

                        </Row>
                    </div>
                )
            }
            {/* show toast */}
            <ToastContainer />

        </>
    )
}
