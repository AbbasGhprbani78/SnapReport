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

    const openFormFailHandler = () => {
        setShowFailForm(true)
    }

    const getDefaultForm = async () => {
        const access = localStorage.getItem("access")

        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/get-default-form`, {
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

    useEffect(() => {
        getAllFillForms()
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
                                    <Header />
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
                                        <Col xs={12} md={7} lg={8}>
                                            <div className='form-sections'>
                                                <div className="form-section">
                                                    <p className='form-section-title'>Permit</p>
                                                    <Link to={'/filledforms/0'} className='link-form-section'>see more < ChevronRightIcon /></Link>
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
                                                    <Link to={'/filledforms/1'} className='link-form-section'> see more < ChevronRightIcon /></Link>
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
                                                    <Link to={'/filledforms/2'} className='link-form-section'>see more < ChevronRightIcon /></Link>
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
                                                    <Link to={'/filledforms/3'} className='link-form-section'>see more < ChevronRightIcon /></Link>
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
                                        <Col xs={12} md={5} lg={4} className='mb-4 mb-md-0'>
                                            <NotificationsHome />
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