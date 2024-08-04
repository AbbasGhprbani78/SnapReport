import React, { useEffect, useState } from 'react'
import '../../Style/Home.css'
import Header from '../../Components/Header/Header'
import { IP } from '../../App';
import axios from 'axios';
import BoxtForm from '../../Components/BoxForm/BoxForm';
import TopSection from '../../Components/TopSection/TopSection';
import FormWorker from '../../Components/FormWorker/FormWorker';
import { useMyContext } from '../../Components/RoleContext';
import { Col } from 'react-bootstrap';
import NotificationsHome from '../../Components/NotificationsHome/NotificationsHome';



export default function OrdinaryHome() {
    const [formData, setFormData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [mainTitle, setMainTitle] = useState('')
    const [mianDes, setMainDes] = useState('')
    const [uuid, setUuuid] = useState('')
    const [mainFields, setMainFields] = useState([])
    const [isOpenDefaultIns, setSOpenDefaultIns] = useState(false)
    const [randomId, setRandomId] = useState("")
    const [notifId, setNotifId] = useState("")
    const { type } = useMyContext();



    const getFormData = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const body = {
            type: type
        }
        try {
            const response = await axios.post(`${IP}/form/get-form/`, body, {
                headers,
            })

            if (response.status === 200) {
                setFormData(response.data)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const getAllNotifications = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/chat/get-all-notif/`, {
                headers,
            });
            if (response.status === 200) {
                // console.log(response.data)
            }

        } catch (e) {
            (e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    const openFormHandler = () => {
        setShowForm(true)
    }

    const backHandler = () => {
        setShowForm(false)
        setSOpenDefaultIns(false)
        console.log(isOpenDefaultIns)
    }

    const PermitForms = formData.filter(form => form.type === "permit")
    const accidentForms = formData.filter(form => form.type === "accident")
    const infractions = formData.filter(form => form.type === "violation")
    const inspections = formData.filter(form => form.type === "inspections")


    const openDefaultInspectionsForm = () => {
        const mainForm = inspections.filter(form => form.default == true)
        setMainTitle(mainForm[0].title)
        setMainDes(mainForm[0].descriptions)
        setUuuid(mainForm[0].uuid)
        setMainFields(mainForm[0].fields)
        setSOpenDefaultIns(true)
        setShowForm(true)
    }


    useEffect(() => {
        getFormData()
        getAllNotifications()
    }, [])



    return (

        <>
            {
                showForm ? (

                    <>
                        <FormWorker
                            back={backHandler}
                            mainTitle={mainTitle}
                            mianDes={mianDes}
                            uuid={uuid}
                            mainFields={mainFields}
                            getFormData={getFormData}
                            isOpenDefaultIns={isOpenDefaultIns}
                            randomId={randomId}
                            notifId={notifId}
                        />
                    </>) : (
                    <>
                        <div div className="home-container" >
                            <Header />

                            <div className='d-flex flex-wrap wrap-ordinaryhome'>
                                <Col xs={12} xl={8}>
                                    {
                                        PermitForms.length > 0 ?
                                            <>
                                                <TopSection
                                                    text="Permit forms"
                                                />
                                                <div className='topHome-worker'>
                                                    {
                                                        PermitForms.slice().reverse().map((form) => (
                                                            <BoxtForm
                                                                key={form.uuid}
                                                                styleCalss={"bluedot"}
                                                                title="Permit Form"
                                                                openForm={openFormHandler}
                                                                des={form.descriptions}
                                                                setMainTitle={setMainTitle}
                                                                setMainDes={setMainDes}
                                                                setuuid={setUuuid}
                                                                setMainFields={setMainFields}
                                                                titleForm={form.title}
                                                                uuid={form.uuid}
                                                                fields={form.fields}
                                                            />
                                                        ))
                                                    }

                                                </div>
                                            </> :
                                            <>
                                                <TopSection
                                                    text="Permit forms"
                                                />
                                                <div className='noform formhome-worker'>There is no form</div>
                                            </>

                                    }

                                    {
                                        accidentForms.length > 0 ?
                                            <>
                                                <TopSection
                                                    text="Accident forms"
                                                />
                                                <div className='bottomHome-worker'>
                                                    {
                                                        accidentForms.slice().reverse().map((form) => (
                                                            <BoxtForm
                                                                key={form.uuid}
                                                                styleCalss={"greendot"}
                                                                title="Accident Form"
                                                                openForm={openFormHandler}
                                                                des={form.descriptions}
                                                                setMainTitle={setMainTitle}
                                                                setMainDes={setMainDes}
                                                                setuuid={setUuuid}
                                                                setMainFields={setMainFields}
                                                                titleForm={form.title}
                                                                uuid={form.uuid}
                                                                fields={form.fields}
                                                            />
                                                        ))
                                                    }

                                                </div>
                                            </> :
                                            <>
                                                <TopSection
                                                    text="Accident forms"
                                                />
                                                <div className='noform formhome-worker'>There is no form</div>
                                            </>
                                    }

                                    {
                                        infractions.length > 0 ?
                                            <>
                                                <TopSection
                                                    text="violation Forms"
                                                />
                                                <div className='bottomHome-worker'>
                                                    {
                                                        infractions.slice().reverse().map((form) => (
                                                            <BoxtForm
                                                                key={form.uuid}
                                                                styleCalss={"redDot"}
                                                                title="Violation forms"
                                                                openForm={openFormHandler}
                                                                des={form.descriptions}
                                                                setMainTitle={setMainTitle}
                                                                setMainDes={setMainDes}
                                                                setuuid={setUuuid}
                                                                setMainFields={setMainFields}
                                                                titleForm={form.title}
                                                                uuid={form.uuid}
                                                                fields={form.fields}
                                                            />
                                                        ))
                                                    }

                                                </div>
                                            </> :
                                            <>
                                                <TopSection
                                                    text="violation Forms"
                                                />
                                                <div className='noform formhome-worker'>There is no form</div>
                                            </>
                                    }

                                    {
                                        inspections.length > 0 ?
                                            <>
                                                <TopSection
                                                    text="Inspections forms"
                                                />
                                                <div className='bottomHome-worker'>
                                                    {
                                                        inspections.slice().reverse().map((form) => (
                                                            <BoxtForm
                                                                key={form.uuid}
                                                                styleCalss={"orangeDot"}
                                                                title="Inspections Form"
                                                                openForm={openFormHandler}
                                                                des={form.descriptions}
                                                                setMainTitle={setMainTitle}
                                                                setMainDes={setMainDes}
                                                                setuuid={setUuuid}
                                                                setMainFields={setMainFields}
                                                                titleForm={form.title}
                                                                uuid={form.uuid}
                                                                fields={form.fields}
                                                            />))
                                                    }

                                                </div>
                                            </> :
                                            <>
                                                <TopSection
                                                    text="Inspections forms"
                                                />
                                                <div className='noform formhome-worker'>There is no form</div>
                                            </>

                                    }
                                </Col>
                                <Col xs={12} xl={4}>
                                    <div className='notif-ordinary-wrapper'>
                                        <NotificationsHome
                                            filledform={"filledform"}
                                            openDefaultInspectionsForm={openDefaultInspectionsForm}
                                            setRandomId={setRandomId}
                                            setNotifId={setNotifId}
                                            heightnotif={"heightnotif"}
                                        />
                                    </div>
                                </Col>
                            </div>


                        </div>
                    </>)
            }
        </>


    )
}
