import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import '../../Style/Report.css'
import ChartSection from '../../Components/Chart/ChartSection/ChartSection'
import LineCharts from '../../Components/Chart/LineCharts/LineCharts'
import Header from '../../Components/Header/Header'
import { Col } from 'react-bootstrap'
import dayjs from 'dayjs';
import axios from 'axios'
import { IP } from '../../App'
import BarChartSection from '../../Components/BarChartSection/BarChartSection';
import TableLocation from '../../Components/TableLocation/TableLocation';
import AiHeader from '../../Components/AiHeader/AiHeader';
import HistoryTable from '../../Components/HistoryTable/HistoryTable'
export default function Report() {

    const [expanded, setExpanded] = React.useState(false);
    const [progressData, setProgressData] = useState("");
    const [notifs, setNotif] = useState("")
    const [notFix, setNotFix] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [lineData, setLineData] = useState("");
    const [valueBarChart, setValueBarChart] = useState("All");
    const [getLable, setGetLable] = useState(false)

    const allLineChart = async () => {

        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/label-count/`, {
                headers,
            });

            if (response.status === 200) {
                const processedData = response.data.map(item => {
                    const [year, month, day] = item.month.split('-');

                    return {
                        ...item,
                        date: `${month}-${day}`,
                        year: year,
                        month: month,
                        day: day,
                        low: item.label_1_count,
                        high: item.label_2_count
                    };
                });

                setLineData(processedData);
            }
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getlineChart = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/form/loc-label-count/${valueBarChart}`, {
                headers,
            });

            if (response.status === 200) {
                const processedData = response.data.map(item => {
                    const [year, month, day] = item.month.split('-');

                    return {
                        ...item,
                        date: `${month}-${day}`,
                        year: year,
                        month: month,
                        day: day,
                        low: item.label_1_count,
                        high: item.label_2_count
                    };
                });

                setLineData(processedData);
            }
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };



    const handleChangechart = (event) => {
        setValueBarChart(event.target.value);
    };



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
                setGetLable(true)
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


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


    useEffect(() => {
        getlineChart();
    }, [valueBarChart]);

    useEffect(() => {
        allLineChart()
    }, [valueBarChart])


    useEffect(() => {
        randomData()
        getProgressData()
        getNotif()
        allLineChart()
    }, [])


    return (
        <>
            <Header notFix={notFix} />
            <AiHeader />
            {
                showHistory ?
                    <>
                        <HistoryTable setShowHistory={setShowHistory} />
                    </> :
                    <>
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
                                            <LineCharts
                                                lineData={lineData}
                                                valueBarChart={valueBarChart}
                                                handleChangechart={handleChangechart}
                                                allLineChart={allLineChart}
                                            />
                                        </div>
                                        <div className='table-section'>
                                            <TableLocation
                                                setShowHistory={setShowHistory}
                                                getLable={getLable}
                                            />
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
            }
        </>
    )
}








//  <Col xs={12} lg={5} xl={4} className="chart-right">
//     <PermitViewers valueViewers={permitState} />
//     <Viewers1 kindForm={kindForm} />
// </Col>


//   const getLable = async () => {
//         const access = localStorage.getItem("access")
//         const headers = {
//             Authorization: `Bearer${access}`
//         }
//         try {
//             const response = await axios.post(`${IP}/form/single-send-data-to-api/`, {
//                 headers
//             })

//             if (response.status === 200) {

//                 localStorage.setItem('levelrick', response.data.label);
//                 localStorage.setItem("message", response.data.message);
//             }
//         } catch (error) {
//             if (error.response.status === 401) {
//                 localStorage.clear()
//                 navigate("/login")
//             }
//         }
//     }