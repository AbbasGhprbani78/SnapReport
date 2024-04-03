import React, { useState, useEffect } from 'react'
import '../Style/Report.css'
import ChartProgress from '../Components/Chart/ChartProgress/ChartProgress'
import ChartSection from '../Components/Chart/ChartSection/ChartSection'
import LineCharts from '../Components/Chart/LineCharts/LineCharts'
import ChartViewers from '../Components/Chart/ChartViewers/ChartViewers'
import Header from '../Components/Header/Header'
import { Col } from 'react-bootstrap'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Report() {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                                    <ChartProgress percent={25} />
                                </Col>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress percent={50} />
                                </Col>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress percent={75} />
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
                            <ChartViewers />
                            <ChartViewers />
                            <ChartViewers />
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
