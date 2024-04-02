import React from 'react'
import '../Style/Report.css'
import ChartProgress from '../Components/Chart/ChartProgress/ChartProgress'
import ChartSection from '../Components/Chart/ChartSection/ChartSection'
import LineCharts from '../Components/Chart/LineCharts/LineCharts'
import ChartViewers from '../Components/Chart/ChartViewers/ChartViewers'
import Header from '../Components/Header/Header'
import { Col } from 'react-bootstrap'

export default function Report() {
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
                                    <ChartProgress percent={10} />
                                </Col>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress percent={75} />
                                </Col>
                                <Col xs={12} md={6} xl={4}>
                                    <ChartProgress percent={50} />
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
            </div>
        </>
    )
}
