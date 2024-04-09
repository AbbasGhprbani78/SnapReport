import React, { useState, useEffect } from 'react'
import '../../Style/Report.css'
import ChartProgress from '../../Components/Chart/ChartProgress/ChartProgress'
import ChartSection from '../../Components/Chart/ChartSection/ChartSection'
import LineCharts from '../../Components/Chart/LineCharts/LineCharts'
import PermitViewers from '../../Components/Chart/PermitViewers/PermitViewers'
import Header from '../../Components/Header/Header'
import { Col } from 'react-bootstrap'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Viewers1 from '../../Components/Chart/Viewers1/Viewers1'
import Viewers2 from '../../Components/Chart/Viewers2/Viewers2'
import axios from 'axios'
import { IP } from '../../App'

export default function Report() {

    const [expanded, setExpanded] = React.useState(false);
    const [progressData, setProgressData] = useState("");
    const [permitState, setPermitState] = useState("");
    const [kindForm, setKindForm] = useState("")

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
            console.log(e)
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
                console.log(response.data)
                setPermitState(response.data)
            }

        } catch (e) {
            console.log(e)
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
                console.log(response.data)
                setKindForm(response.data)
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
        getProgressData()
        getPermitState()
        getKindForm()
    }, [])
    return (
        <>
            <Header />
            <div className="reportContainer">
                <p className="reportTitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, sint. Error delectus qui laudantium aut alias animi mollitia obcaecati asperiores. Accusamus natus dicta eius distinctio cupiditate quia obcaecati est nostrum.
                </p>
                <div className="charts-content">
                    <p className="text-chart-top">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="charts-top">
                        <Col xs={12} lg={8} className="chart-left">
                            <div className='d-flex justify-content-around flex-wrap'>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress
                                        percent={progressData.percentage_age_equipment?.toFixed(2)}
                                        title={"age equipment"}
                                    />
                                </Col>
                                {/* <Col xs={12} md={6} xl={4}>
                                    <ChartProgress percent={50} />
                                </Col> */}
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress
                                        percent={progressData.percentage_failure_rate?.toFixed(2)}
                                        title={"failure rate"}
                                    />
                                </Col>
                            </div>

                            <div className='chart-section-wrappeer'>
                                <p className='text-chart-top mt-4'>Lorem ipsum dolor sit amet.</p>
                                <ChartSection />
                            </div>
                            <div className="chart-bottom">
                                <LineCharts />
                            </div>
                        </Col>
                        <Col xs={12} lg={4} className="chart-right">
                            <PermitViewers valueViewers={permitState} />
                            <Viewers1 kindForm={kindForm} />
                            <Viewers2 />
                        </Col>
                    </div>
                </div>
                <div className="noti-report-wrapper my-3">
                    <p className='accident-notif-title'>Notifications Accident</p>
                    <div className='accrdion-weapper'>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, color: "red" }}>
                                    Warning name 1
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, color: "red" }}> Warning name 2</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Warning name 2
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Filtering has been entirely disabled for whole web server
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, color: "red" }}>
                                    Warning name 3
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Filtering has been entirely disabled for whole web server
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, color: "red" }}> Warning name 4</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}
