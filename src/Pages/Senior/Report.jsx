import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import '../../Style/Report.css'
import ChartProgress from '../../Components/Chart/ChartProgress/ChartProgress'
import ChartSection from '../../Components/Chart/ChartSection/ChartSection'
import LineCharts from '../../Components/Chart/LineCharts/LineCharts'
import PermitViewers from '../../Components/Chart/PermitViewers/PermitViewers'
import Header from '../../Components/Header/Header'
import { Col } from 'react-bootstrap'
import Viewers1 from '../../Components/Chart/Viewers1/Viewers1';
import dayjs from 'dayjs';
import axios from 'axios'
import { IP } from '../../App'

export default function Report() {

    const [expanded, setExpanded] = React.useState(false);
    const [progressData, setProgressData] = useState("");
    const [permitState, setPermitState] = useState("");
    const [kindForm, setKindForm] = useState("")
    const [notifs, setNotif] = useState("")

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getProgressData = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/equipment-stats/`, {
                headers,
            })

            if (response.status === 200) {
                setProgressData(response.data)
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
                setKindForm(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    const getNotif = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/get-report-notif/`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data)
                setNotif(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const notifReadHandler = async (id) => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {

            const response = await axios.get(`${IP}/form/seen-notif-report/${id}`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getProgressData()
        getPermitState()
        getKindForm()
        getNotif()
    }, [])


    return (
        <>
            <Header />
            <div className="reportContainer">
                <p className="reportTitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, sint. Error delectus qui laudantium aut alias animi mollitia obcaecati asperiores. Accusamus natus dicta eius distinctio cupiditate quia obcaecati est nostrum.
                </p>
                <div className="charts-content">
                    {/* <p className="text-chart-top">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                    <div className="charts-top">
                        <Col xs={12} lg={7} xl={8} className="chart-left">
                            <div className='d-flex justify-content-around flex-wrap'>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress
                                        percent={progressData.percentage_age_equipment?.toFixed(2)}
                                        title={"Age of equipment"}
                                    />
                                </Col>
                                <Col xs={12} md={6} xl={4} className='mt-4 mt-md-0'>
                                    <ChartProgress
                                        percent={progressData.percentage_failure_rate?.toFixed(2)}
                                        title={"failure rate"}
                                    />
                                </Col>
                            </div>

                            <div className='chart-section-wrappeer'>
                                <p className='text-chart-top mt-4'>Number of Accident</p>
                                <ChartSection />
                            </div>
                            <div className="chart-bottom">
                                <LineCharts />
                            </div>
                        </Col>
                        <Col xs={12} lg={5} xl={4} className="chart-right">
                            <PermitViewers valueViewers={permitState} />
                            <Viewers1 kindForm={kindForm} />
                            {/* <Viewers2 /> */}
                        </Col>
                    </div>
                </div>
                <div className="noti-report-wrapper my-3">
                    <p className='accident-notif-title font-bold fw-bold'>Notifications</p>
                    <div className='accrdion-weapper'>
                        {
                            notifs.length ?
                                <Accordion defaultActiveKey="0">
                                    {
                                        notifs.slice().reverse().map(notif => (
                                            <Accordion.Item eventKey={notif.id} className='mb-3' onClick={() => notifReadHandler(notif.id)}>
                                                <Accordion.Header>
                                                    {dayjs(notif.created_at).format('YYYY-MM-DD HH:mm')}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {notif.message}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))
                                    }
                                </Accordion>
                                : null
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

{/* <Col xs={12} md={6} xl={4}>
                                    <ChartProgress percent={50} />
                                </Col> */}




