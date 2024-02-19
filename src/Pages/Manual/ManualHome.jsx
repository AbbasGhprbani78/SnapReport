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
                console.log(response)
                setFormData(response.data)
            }

        } catch (e) {
            console.log(e)
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
                            <TopSection
                                text="PermitForm"
                            />
                            <div className='topHome-worker'>

                                {
                                    formData.length > 0 ? (
                                        formData.map((form) => {
                                            if (form.type === "permit") {
                                                return (
                                                    <BoxtForm
                                                        key={form.uuid}
                                                        styleCalss={"bluedot"}
                                                        title="Permit Forms"
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
                                                );
                                            } else {
                                                return null
                                            }
                                        })
                                    ) : (
                                        <div className='mt-1' style={{ width: "95%", margin: "0 auto" }}>
                                            <div className="noform">There is no permit form</div>
                                        </div>

                                    )
                                }

                            </div>
                            <TopSection
                                text="Accidents forms"
                            />
                            <div className='bottomHome-worker'>

                                {
                                    formData.length > 0 ? (
                                        formData.map((form) => {
                                            if (form.type === "accident") {
                                                return (
                                                    <BoxtForm
                                                        key={form.uuid}
                                                        styleCalss={"greendot"}
                                                        title="Accident Forms"
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
                                                );
                                            } else {
                                                return null
                                            }
                                        })
                                    ) : (
                                        <div className='mt-1' style={{ width: "95%", margin: "0 auto" }}>
                                            <div className="noform">There is no accident form</div>
                                        </div>

                                    )
                                }

                            </div>

                        </div>

                    </>)
            }
        </>


    )
}

