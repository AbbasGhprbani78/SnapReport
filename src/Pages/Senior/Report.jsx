import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import '../../Style/Report.css'
//import ChartProgress from '../../Components/Chart/ChartProgress/ChartProgress'
import ChartSection from '../../Components/Chart/ChartSection/ChartSection'
import LineCharts from '../../Components/Chart/LineCharts/LineCharts'
import PermitViewers from '../../Components/Chart/PermitViewers/PermitViewers'
import Header from '../../Components/Header/Header'
import { Col } from 'react-bootstrap'
import Viewers1 from '../../Components/Chart/Viewers1/Viewers1';
import dayjs from 'dayjs';
import axios from 'axios'
import { IP } from '../../App'
import BarChartSection from '../../Components/BarChartSection/BarChartSection';
import logo from '../../Images/logo.svg'

export default function Report() {

    const [expanded, setExpanded] = React.useState(false);
    const [progressData, setProgressData] = useState("");
    const [permitState, setPermitState] = useState("");
    const [kindForm, setKindForm] = useState("")
    const [notifs, setNotif] = useState("")
    const [openModalAi, setOpenModalAi] = useState(false)


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
                setKindForm(response.data.form_counts)
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
            <>
                <div className={`modal-ai-container ${openModalAi ? "open-modal-active" : ""}`}>
                    <div className="close-ai-modal" onClick={() => setOpenModalAi(false)}></div>
                    <div className="modal-ai">
                        <div className="modal-ai-header">
                            <p>SnapReport AI: Advanced Workplace Safety Prediction</p>
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
            </>
            <Header />
            <div className="header-report-ai">
                <p className="ai-report">Ai Report</p>
                <div className='ai-circle' onClick={() => setOpenModalAi(true)}>
                    <span className='ai-circle-text'>Ai</span>
                </div>
            </div>
            <div className="reportContainer">
                <div className="charts-content">
                    <div className="charts-top">
                        <Col xs={12} lg={7} xl={8} className="chart-left">
                            <div className="barchart-wrapper">
                                <BarChartSection />
                            </div>
                            <div className='chart-section-wrappeer'>
                                <p className='text-chart-top'>Number of Accidents</p>
                                <ChartSection />
                            </div>
                        </Col>
                        <Col xs={12} lg={5} xl={4} className="chart-right">
                            <PermitViewers valueViewers={permitState} />
                            <Viewers1 kindForm={kindForm} />
                        </Col>
                    </div>
                    <div className="chartbottom">
                        <Col xs={12}>
                            <div className="chart-bottom">
                                <LineCharts />
                            </div>
                        </Col>
                    </div>
                </div>

                <div className="notification-header my-4">
                    Ai Reports History
                </div>
                <div className="noti-report-wrapper">
                    <div className='accrdion-weapper'>
                        {
                            notifs.length ?
                                <Accordion defaultActiveKey="0">
                                    {
                                        notifs.slice().reverse().map(notif => (
                                            <Accordion.Item eventKey={notif.id} key={notif.id} className='mb-3' onClick={() => notifReadHandler(notif.id)}>
                                                <Accordion.Header>
                                                    <div className='d-flex position-relative header-title-notif'>
                                                        <p className={`${notif.status === "low" ? "lowitem" : "hightitem"} fw-bold d-flex`}><p style={{ color: "#000", marginRight: "5px" }}>Prediction Of An Accident  :  </p> {notif.status}</p>
                                                        <p className='date-notif-item '>{dayjs(notif.created_at).format('YYYY-MM-DD HH:mm')}</p>
                                                    </div>
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


{/* <p className="text-chart-top">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */ }

{/* <p className="reportTitle">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, sint. Error delectus qui laudantium aut alias animi mollitia obcaecati asperiores. Accusamus natus dicta eius distinctio cupiditate quia obcaecati est nostrum.
                </p> */}


{/* <div className='d-flex justify-content-around flex-wrap'>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress
                                        percent={progressData.percentage_age_equipment?.toFixed(2)}
                                        title={"Age of equipments"}
                                    />
                                </Col>
                                <Col xs={12} md={6} xl={4} className='mt-4 mt-md-0'>
                                    <ChartProgress
                                        percent={progressData.percentage_failure_rate?.toFixed(2)}
                                        title={"failure rates"}
                                    />
                                </Col>
                            </div> */}

{/* <Viewers2 /> */ }