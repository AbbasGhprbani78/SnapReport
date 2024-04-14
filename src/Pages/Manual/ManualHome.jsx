import React, { useEffect, useState } from 'react'
import '../../Style/Home.css'
import Header from '../../Components/Header/Header'
import { IP } from '../../App';
import axios from 'axios';
import BoxtForm from '../../Components/BoxForm/BoxForm';
import TopSection from '../../Components/TopSection/TopSection';
import FormWorker from '../../Components/FormWorker/FormWorker';
import { useMyContext } from '../../Components/RoleContext';

export default function ManualHome() {
    const [formData, setFormData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [mainTitle, setMainTitle] = useState('')
    const [mianDes, setMainDes] = useState('')
    const [uuid, setUuuid] = useState('')
    const [mainFields, setMainFields] = useState([])
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

    useEffect(() => {
        getFormData()
    }, [])

    const openFormHandler = () => {
        setShowForm(true)
    }

    const backHandler = () => {
        setShowForm(false)
    }

    const PermitForms = formData.filter(form => form.type === "permit")
    const accidentForms = formData.filter(form => form.type === "accident")
    const infractions = formData.filter(form => form.type === "violation")
    const inspections = formData.filter(form => form.type === "inspections")


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
                        />
                    </>) : (
                    <>
                        <div div className="home-container" >
                            <Header />
                            {
                                PermitForms.length > 0 ?
                                    <>
                                        <TopSection
                                            text="Permit forms"
                                        />
                                        <div className='topHome-worker'>
                                            {
                                                PermitForms.map((form) => (
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
                                                accidentForms.map((form) => (
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
                                                infractions.map((form) => (
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
                                                inspections.map((form) => (
                                                    <BoxtForm
                                                        key={form.uuid}
                                                        styleCalss={"oliveForm"}
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

                        </div>
                    </>)
            }
        </>


    )
}

