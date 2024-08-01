import React, { useState, useEffect } from 'react'
import '../../Style/Home.css'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';;
import { Col } from 'react-bootstrap';
import AddNewForm from './AddNewForm';
import { IP } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormOverView from '../../Components/FormOverView/FormOverView';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Header from '../../Components/Header/Header'
import NotificationsHome from '../../Components/NotificationsHome/NotificationsHome'
import FailHomeItem from '../../Components/FailHomeItem/FailHomeItem';
import PlaceForm from '../../Components/PlaceForm/PlaceForm';
import logo from '../../Images/logo.svg'
import PermitViewers from '../../Components/Chart/PermitViewers/PermitViewers';
import Viewers1 from '../../Components/Chart/Viewers1/Viewers1';


export default function Home() {

    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [allform, setAllForm] = useState([])
    const [mainForm, setMainForm] = useState(null)
    const [isDelete, setIsDelete] = useState(false)
    const [failForms, setFailForms] = useState([])
    const [formUuid, setFormUuid] = useState('')
    const [fields, setFields] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [showFailForm, setShowFailForm] = useState(false)
    const [isDefault, setIsDefault] = useState("")
    const [openModalAi, setOpenModalAi] = useState(false)
    const [notFix, setNotFix] = useState(false)
    const [permitState, setPermitState] = useState("");
    const [kindForm, setKindForm] = useState("")

    const openFormFailHandler = () => {
        setShowFailForm(true)
    }

    const getDefaultForm = async () => {
        const access = localStorage.getItem("access")

        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/get-default-form/`, {
                headers,
            });
            if (response.status === 200) {
                setAllForm(response.data)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getDefaultForm()
    }, [])


    const openFormHandler = () => {
        setShowForm(true)
        if (!showForm) {
            setIsDelete(false)
        }
    }

    const backHandler = () => {
        setShowForm(false)
    }

    const backFailHandler = () => {
        setShowFailForm(false)
        setFormUuid("")
    }

    const getAllFillForms = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/all-full-form/`, {
                headers,
            })

            if (response.status === 200) {
                setFailForms(response.data.forms)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const getPermitState = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/permit-form-state/`, {
                headers,
            })

            if (response.status === 200) {
                setPermitState(response.data)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const getKindForm = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/form-state/`, {
                headers,
            })

            if (response.status === 200) {
                const formattedData = Object.entries(response.data).map(([name, value]) => ({ name: name.replace(/_/g, ' '), value }))
                setKindForm(formattedData)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    useEffect(() => {

        getAllFillForms()
        getPermitState()
        getKindForm()
    }, [])


    const permitForm = [...failForms].filter(form => form.type === "permit")
    const accidentForm = [...failForms].filter(form => form.type === "accident")
    const violationForm = [...failForms].filter(form => form.type === "violation")
    const inspectionsForm = [...failForms].filter(form => form.type === "inspections")

    return (

        <>
            {
                showFailForm ?
                    <>
                        <PlaceForm
                            back={backFailHandler}
                            title={title}
                            description={description}
                            fields={fields}
                            formUuid={formUuid}
                            getAllFillForms={getAllFillForms}

                        />
                    </> :
                    <>
                        {
                            showForm ?
                                <AddNewForm
                                    showForm={showForm}
                                    back={backHandler}
                                    mainForm={mainForm}
                                    isDelete={isDelete}
                                    getAllForm={getDefaultForm}
                                    isDefault={isDefault}
                                /> :
                                <div className="home-container">
                                    <Header notFix={notFix} />
                                    <div className={`modal-ai-container ${openModalAi ? "open-modal-active" : ""}`}>
                                        <div className="close-ai-modal"
                                            onClick={() => {
                                                setOpenModalAi(false)
                                                setNotFix(false)
                                            }}
                                        >

                                        </div>
                                        <div className="modal-ai">
                                            <div className="modal-ai-header">
                                                <p className='order-ai'>SnapReport AI: Advanced Workplace Safety Prediction</p>
                                                <img className='sideBar-img' src={logo} alt="logo" />
                                            </div>
                                            <div className="modal-ai-body">
                                                SnapReport AI revolutionizes workplace safety by harnessing a multifaceted approach to accident prediction. Integrating employee experience, education, and shift patterns alongside environmental hazards and equipment factors such as maintenance schedules and age, the system offers unparalleled predictive capabilities. By comprehensively analyzing these variables, SnapReport AI provides proactive insights into accident-prone areas, enabling preemptive interventions to mitigate risks and ensure a safer work environment for all.
                                            </div>
                                            <div className="modal-ai-footer">
                                                Powered By Snapreport Ai
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-report-ai">
                                        <p className="ai-report">Ai Report</p>
                                        <div className='ai-circle' onClick={() => {
                                            setOpenModalAi(true)
                                            setNotFix(true)
                                        }}>
                                            <span className='ai-circle-text'>Ai</span>
                                        </div>
                                    </div>
                                    <div className='recentForm-conteiner'>
                                        <div className="allFormText">
                                            <Link className='linkAll-form' to={''}>Default Forms</Link>
                                        </div>
                                        <div className='recentForm '>
                                            <div className='grid-form-recentItem d-flex '>
                                                {
                                                    allform.length > 0 ? allform.map(form => (
                                                        <Col
                                                            style={{ position: "relative" }}
                                                            key={form.uuid}
                                                            className='item-recent'
                                                            xs={12} md={6} xl={4}
                                                        >
                                                            <div className="col-container">
                                                                <FormOverView formData={form} />
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className='actions-form'
                                                                >
                                                                    <div
                                                                        onClick={() => {
                                                                            openFormHandler();
                                                                            setMainForm(form);
                                                                            setIsDefault(form.default)
                                                                        }}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        <EditCalendarIcon
                                                                            className='editFormIcom'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    )) : <div className='noform'>There is no form</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottomHome">
                                        <Col xs={12} xl={8}>
                                            <div className='form-sections'>
                                                <div className="form-section">
                                                    <p className='form-section-title'>Permit</p>
                                                    <Link to={'/filledforms/0'} className='link-form-section'>See More < ChevronRightIcon /></Link>
                                                    <div className='grid-form d-flex '>
                                                        {
                                                            permitForm.length ?
                                                                <>
                                                                    {permitForm.slice().reverse().slice(0, 3).map(form => (
                                                                        <Col
                                                                            key={form.id}
                                                                            style={{ position: "relative" }}
                                                                            className='item-recent'
                                                                            xs={12} md={6} xl={4}
                                                                        >
                                                                            <FailHomeItem
                                                                                id={form.id}
                                                                                dec={form.descriptions}
                                                                                title={form.title}
                                                                                type={form.type}
                                                                                form={form}
                                                                                accept={form.accept}
                                                                                setFormUuid={setFormUuid}
                                                                                setFields={setFields}
                                                                                setTitle={setTitle}
                                                                                setDescription={setDescription}
                                                                                openFormFailHandler={openFormFailHandler}
                                                                            />
                                                                        </Col>
                                                                    ))}
                                                                </> :
                                                                <>
                                                                    <div className='noform'>There is no permit form</div>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-section">
                                                    <p className='form-section-title'>Accident</p>
                                                    <Link to={'/filledforms/1'} className='link-form-section'> See More < ChevronRightIcon /></Link>
                                                    <div className='grid-form d-flex '>
                                                        {
                                                            accidentForm.length ?
                                                                <>
                                                                    {accidentForm.slice().reverse().slice(0, 3).map(form => (
                                                                        <Col
                                                                            key={form.id}
                                                                            style={{ position: "relative" }}
                                                                            className='item-recent'
                                                                            xs={12} md={6} xl={4}
                                                                        >
                                                                            <FailHomeItem
                                                                                id={form.id}
                                                                                dec={form.descriptions}
                                                                                title={form.title}
                                                                                type={form.type}
                                                                                form={form}
                                                                                setFields={setFields}
                                                                                setTitle={setTitle}
                                                                                setDescription={setDescription}
                                                                                openFormFailHandler={openFormFailHandler}
                                                                            />
                                                                        </Col>
                                                                    ))}
                                                                </> :
                                                                <>
                                                                    <div className='noform'>There is no accident form</div>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-section">
                                                    <p className='form-section-title'>Violation</p>
                                                    <Link to={'/filledforms/2'} className='link-form-section'>See More < ChevronRightIcon /></Link>
                                                    <div className='grid-form d-flex '>
                                                        {
                                                            violationForm.length ?
                                                                <>
                                                                    {violationForm.slice().reverse().slice(0, 3).map(form => (
                                                                        <Col
                                                                            key={form.id}
                                                                            style={{ position: "relative" }}
                                                                            className='item-recent'
                                                                            xs={12} md={6} xl={4}
                                                                        >
                                                                            <FailHomeItem
                                                                                id={form.id}
                                                                                dec={form.descriptions}
                                                                                title={form.title}
                                                                                type={form.type}
                                                                                form={form}
                                                                                setFields={setFields}
                                                                                setTitle={setTitle}
                                                                                setDescription={setDescription}
                                                                                openFormFailHandler={openFormFailHandler}
                                                                            />
                                                                        </Col>
                                                                    ))}
                                                                </> :
                                                                <>
                                                                    <div className='noform'>There is no violation form</div>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-section">
                                                    <p className='form-section-title'>Inspections</p>
                                                    <Link to={'/filledforms/3'} className='link-form-section'>See More < ChevronRightIcon /></Link>
                                                    <div className='grid-form d-flex '>
                                                        {
                                                            inspectionsForm.length ?
                                                                <>
                                                                    {inspectionsForm.slice().reverse().slice(0, 3).map(form => (
                                                                        <Col
                                                                            key={form.id}
                                                                            style={{ position: "relative" }}
                                                                            className='item-recent'
                                                                            xs={12} md={6} xl={4}
                                                                        >
                                                                            <FailHomeItem
                                                                                id={form.id}
                                                                                dec={form.descriptions}
                                                                                title={form.title}
                                                                                type={form.type}
                                                                                form={form}
                                                                                setFields={setFields}
                                                                                setTitle={setTitle}
                                                                                setDescription={setDescription}
                                                                                openFormFailHandler={openFormFailHandler}
                                                                            />
                                                                        </Col>
                                                                    ))}
                                                                </> :
                                                                <>
                                                                    <div className='noform'>There is no inspections form</div>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} xl={4} className='mb-4 mb-md-0'>
                                            <NotificationsHome />
                                            <div className='mt-4'>
                                                <PermitViewers valueViewers={permitState} />
                                                <Viewers1 kindForm={kindForm} />
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                        }
                    </>
            }

        </>
    )
}




// for delete default form

{/* <div
                                                                        onClick={() => {
                                                                            openFormHandler()
                                                                            setMainForm(form)
                                                                            setIsDelete(true)
                                                                        }}
                                                                        style={{ cursor: "pointer" }}

                                                                    >
                                                                        <DeleteForeverIcon
                                                                            className='deleteFormIcon'

                                                                        />
                                                                    </div> */}