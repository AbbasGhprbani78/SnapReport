import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import '../../Style/Report.css'
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
import TableLocation from '../../Components/TableLocation/TableLocation';
import AiHeader from '../../Components/AiHeader/AiHeader';
export default function Report() {

    const [expanded, setExpanded] = React.useState(false);
    const [progressData, setProgressData] = useState("");
    const [notifs, setNotif] = useState("")
    const [notFix, setNotFix] = useState(false)


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
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    useEffect(() => {
        randomData()
        getProgressData()
        getNotif()
    }, [])


    const randomData = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer${access}`
        }
        try {
            const response = await axios.post(`${IP}/form/random-data/`, {
                headers
            })

            if (response.status === 201) {
                getAllloc()
            }
        } catch (error) {

            if (error.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    const getAllloc = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer${access}`
        }
        try {
            const response = await axios.post(`${IP}/form/send-data-to-api/`, {
                headers
            })

            if (response.status === 200) {
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    return (
        <>
            <Header notFix={notFix} />
            <AiHeader />
            <div className="reportContainer">
                <div className="charts-content">
                    <div className="charts-top">
                        <Col xs={12} className="chart-left">
                            <div className="barchart-wrapper">
                                <BarChartSection />
                            </div>
                            <div className='chart-section-wrappeer mt-4'>
                                <p className='text-chart-top'>Number of Accidents</p>
                                <ChartSection />
                            </div>
                        </Col>

                    </div>
                    <div className="chartbottom">
                        <Col xs={12}>
                            <div className="chart-bottom">
                                <LineCharts />
                            </div>
                            <div className='table-section'>
                                <TableLocation />
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
                                                    <div className=' position-relative header-title-notif'>
                                                        <p className={`${notif.status === "low" ? "lowitem" : "hightitem"} fw-bold d-flex`}>
                                                            <p style={{ color: "#000", marginRight: "5px" }}>Prediction Of An Accident  :  </p> {notif.status}</p>
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








//  <Col xs={12} lg={5} xl={4} className="chart-right">
//     <PermitViewers valueViewers={permitState} />
//     <Viewers1 kindForm={kindForm} />
// </Col> 