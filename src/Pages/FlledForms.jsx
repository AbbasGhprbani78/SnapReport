import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../Components/Header/Header'
import '../Style/Report.css'
import PlaceForm from '../Components/PlaceForm/PlaceForm';
import ConditionFormBox from '../Components/ConditionFormBox/ConditionFormBox';
import axios from 'axios';
import { IP } from '../App';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <>

            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        </>

    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function FilledForms() {
    const [value, setValue] = React.useState(0);
    const [showForm, setShowForm] = useState(false)
    const [allforms, setAllForms] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fields, setFields] = useState([])
    const [formUuid, setFormUuid] = useState('')
    const openFormHandler = () => {
        setShowForm(true)
    }

    const backHandler = () => {
        setShowForm(false)
        setFormUuid('')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


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
                setAllForms(response.data.forms)
                    (response.data.forms)
            }

        } catch (e) {
            (e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getAllFillForms()
    }, [])


    const permitForm = [...allforms].filter(form => form.type === "permit")
    const accidentForm = [...allforms].filter(form => form.type === "accident")

    return (
        <>
            {
                showForm ? (
                    <>
                        <PlaceForm
                            back={backHandler}
                            title={title}
                            description={description}
                            fields={fields}
                            formUuid={formUuid}
                            getAllFillForms={getAllFillForms}
                        />
                    </>) : (

                    <>
                        <Header />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                                    <Tab style={{ color: "#45ABE5" }} label="Permit Form" {...a11yProps(0)} />
                                    <Tab style={{ color: "#45ABE5" }} label="Accident Form" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                {
                                    permitForm.length ?
                                        (

                                            permitForm.slice().reverse().map((form, i) => (
                                                <ConditionFormBox
                                                    key={i}
                                                    title={"Permit Form"}
                                                    openFormHandler={openFormHandler}
                                                    dec={form.descriptions}
                                                    setTitle={setTitle}
                                                    setDescription={setDescription}
                                                    form={form}
                                                    setFields={setFields}
                                                    setFormUuid={setFormUuid}
                                                    accept={form.accept}
                                                    styleCalss={'bluedot'}
                                                />
                                            ))

                                        ) :
                                        (
                                            <>
                                                <div className='noform'>There is no permit form</div>
                                            </>
                                        )
                                }
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>
                                {

                                    accidentForm.length ?
                                        (
                                            accidentForm.slice().reverse().filter(form => form.type === "accident").map((form, i) => (
                                                <ConditionFormBox
                                                    key={i}
                                                    title={"Accident Form"}
                                                    openFormHandler={openFormHandler}
                                                    dec={form.descriptions}
                                                    setTitle={setTitle}
                                                    setDescription={setDescription}
                                                    form={form}
                                                    setFields={setFields}
                                                    styleCalss={'greendot'}
                                                />
                                            ))
                                        ) :
                                        <>
                                            <div className='noform'>There is no accident form</div>
                                        </>
                                }
                            </CustomTabPanel>

                        </Box>
                    </>)
            }

        </>

    );
}