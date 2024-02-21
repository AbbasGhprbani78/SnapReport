import React, { useState, useEffect } from 'react'
import '../Style/AddNewForm.css'
import { Row, Col } from 'react-bootstrap'
import InputCreateForm from '../Components/InputCreateForm/InputCreateForm'
import Button from '../Components/Button/Button'
import AddInput from '../Components/AddInput/AddInput'
import BoxInput from '../Components/BoxInput/BoxInput'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormDisplay from '../Components/FormDisplay/FormDisplay'
import DeleteIcon from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { IP } from '../App'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../Components/Loading/Loading'
import Header from '../Components/Header/Header'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Senior Officer",
    "Ordinary Officer",
    "Manual Worker"
];

export default function AddNewForm({ showForm, back, mainForm, isDelete, getAllForm }) {

    console.log(mainForm)
    const [personName, setPersonName] = React.useState(mainForm ? mainForm.person_type : []);


    const handleSelectType = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(

            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const navigate = useNavigate()
    const [typeInput, setTypeInput] = useState("radio")
    const [numberTypeInput, setNumberTypeInput] = useState([])
    const [showDeleteIcon, setShowDeleteIcon] = useState(false)
    const [MainDeleteQuestion, setMainDeleteQuestion] = useState(null)
    const [isCreate, setIsCreate] = useState(mainForm ? true : false)
    const [loading, setLoading] = useState(false)
    const [questionUuid, setQuestionUuid] = useState()
    const [fromInfom, setFormInfom] = useState(

        {
            person_type: [...personName],
            type: mainForm ? mainForm.type : "",
            title: mainForm ? mainForm.title : "",
            descriptions: mainForm ? mainForm.descriptions : "",
            fields: []
        }
    )

    useEffect(() => {

        if (mainForm && mainForm.fields && mainForm.fields.length > 0) {

            setFormInfom((prevInfo) => ({
                ...prevInfo,
                fields: [...mainForm.fields],
            }));

        }
    }, [mainForm]);
    useEffect(() => {

        setFormInfom((prevInfo) => ({
            ...prevInfo,
            person_type: personName,
        }));
    }, [personName]);

    const [fields, setFields] = useState({
        uuid: uuidv4(),
        fields_type: "radio",
        questions: "",
        options: [
        ]
    })


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormInfom((prevInfo) => ({
            ...prevInfo,
            [name]: value.trimStart(),
        }));
    };

    const handleChangeQuetion = (e) => {
        const { name, value } = e.target;
        setFields((prevInfo) => ({
            ...prevInfo,
            [name]: value.trimStart(),
        }));
    };

    const createBox = () => {
        if (isDelete) {
            return
        }

        if ((typeInput === "shortanswer" || typeInput === "textarea" || typeInput === "date" || typeInput === "time")) {
            toast.warning("You can Add option to these radio ,checkbox and dropdown", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return false
        } else {
            const newBox = {
                uuid: uuidv4(),
                choice: ""
            }
            setNumberTypeInput(prevState => {
                return [...prevState, newBox];
            })
            setFields((prevFields) => ({
                ...prevFields,
                options: [...prevFields.options, { choice: "" }],
            }));
        }
    }

    const handleChangeContent = (uuid, updatedContent) => {
        const boxIndex = numberTypeInput.findIndex((input) => input.uuid === uuid);

        if (boxIndex !== -1) {
            setNumberTypeInput((prevState) => {
                const updatedBoxes = [...prevState];
                updatedBoxes[boxIndex] = {
                    ...updatedBoxes[boxIndex],
                    choice: updatedContent.trimStart(),
                };
                return updatedBoxes;
            });

            setFields((prevFields) => {
                const updatedOptions = [...prevFields.options];
                updatedOptions[boxIndex] = {
                    ...updatedOptions[boxIndex],
                    choice: updatedContent.trimStart(),
                };
                return {
                    ...prevFields,
                    options: updatedOptions,
                };
            });
        }
    };


    // delete box for option of question

    const deleteBox = (uuid) => {

        const NewNumberTypeInput = numberTypeInput.filter(input => {
            return input.uuid !== uuid
        })

        setNumberTypeInput(NewNumberTypeInput)

        const boxIndexInFields = fields.options.findIndex(option => option.uuid === uuid);

        setFields(prevFields => {
            const updatedOptions = [...prevFields.options];
            updatedOptions.splice(boxIndexInFields, 1);
            return {
                ...prevFields,
                options: updatedOptions
            };
        });
    }

    const addToForm = () => {

        if (!fromInfom.type || !fromInfom.title || !fromInfom.descriptions || !fields.questions || !typeInput) {
            toast.warning("Please fill in all the required fields (Form Type, Title, Description, Question, Answer Type)", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }


        if (!fields.fields_type || !fields.questions || fields.options.some(options => !options.choice)) {
            toast.warning("Please fill in all the options for the question.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if ((typeInput === "radio" || typeInput === "checkbox" || typeInput === "dropdown")) {
            if (fields.options.length === 0) {
                toast.warning("Please add a option", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                return
            }
        }

        const optionsWithUuid = fields.options.map(option => ({
            ...option,
            uuid: uuidv4(),
        }));

        setFormInfom((prevInfo) => ({
            ...prevInfo,
            fields: [...prevInfo.fields, { ...fields, options: [...optionsWithUuid] }],
        }));


        if (showDeleteIcon) {

            const updatedFields = fromInfom.fields.map(question => {
                if (question.questions === MainDeleteQuestion) {
                    return { ...fields, options: optionsWithUuid };
                }
                return question;
            });

            setFormInfom(prevInfo => ({
                ...prevInfo,
                fields: updatedFields,
            }));
        }


        setFields({
            uuid: uuidv4(),
            fields_type: fields.fields_type,
            questions: "",
            options: [],
        });

        setNumberTypeInput([])
        setIsCreate(true)
        setShowDeleteIcon(false)
    }

    const sendFormHandler = async () => {

        if (!fromInfom.fields.length > 0 || !fromInfom.person_type.length > 0) {
            toast.warning("Please create form ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return

        } else {
            if (mainForm) {

                setLoading(true)
                const body = {
                    ...fromInfom,
                    creator: localStorage.getItem("uuid"),
                    form_uuid: mainForm.uuid
                };
                const updatedFields = body.fields.map(({ uuid, ...rest }) => rest);

                const updatedBody = {
                    ...body,
                    fields: updatedFields
                };


                const jsonString = JSON.stringify(updatedBody)
                console.log(jsonString)

                const access = localStorage.getItem("access")

                const headers = {
                    Authorization: `Bearer ${access}`
                };
                try {
                    const response = await axios.put(`${IP}/form/create-fields/`, updatedBody, {
                        headers
                    });

                    if (response.status === 200) {
                        console.log(response)
                        setLoading(false)
                        toast.success(`The form was edited successfully`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        setTimeout(() => {
                            getAllForm()
                            back()
                        }, 3000)
                    }

                } catch (error) {

                    toast.error(`${error.response.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(true)

                const body = {
                    ...fromInfom,
                    creator: localStorage.getItem("uuid"),
                };

                console.log(body)
                // const jsonString = JSON.stringify(body);
                // console.log(jsonString);

                const access = localStorage.getItem("access")

                const headers = {
                    Authorization: `Bearer ${access}`
                };
                try {
                    const response = await axios.post(`${IP}/form/create-fields/`, body, {
                        headers
                    });

                    if (response.status === 201) {

                        setLoading(false)
                        toast.success(`The form was created successfully`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                    }

                } catch (error) {

                    toast.error(`${error.response.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                } finally {
                    setLoading(false)
                }
            }
        }

    }


    const selectElement = (question, content) => {

        setQuestionUuid(content.uuid)

        if (isDelete) {
            return false

        }
        setMainDeleteQuestion(question);

        const copiedOptions = content.options.map(option => ({ ...option }));

        const newFields = {
            uuid: content.uuid,
            fields_type: content.fields_type,
            questions: question,
            options: copiedOptions,
        };

        setFields(newFields);
        setTypeInput(content.fields_type);
        setShowDeleteIcon(prevState => !prevState);

        if (!showDeleteIcon) {
            setNumberTypeInput(copiedOptions);
        } else {
            setNumberTypeInput([]);
            setFields({
                uuid: uuidv4(),
                fields_type: content.fields_type,
                questions: "",
                options: [],
            });
        }
    };

    const deleteMainBox = (i) => {
        const NewNumberTypeInput = numberTypeInput.filter((input, index) => {
            return index !== i
        })

        setNumberTypeInput(NewNumberTypeInput)
        const updatedFields = fields.options.filter((field, index) => index !== i);

        setFields(prevFields => {
            const updatedOptions = [...prevFields.options];
            updatedOptions.splice(updatedFields, 1);
            return {
                ...prevFields,
                options: updatedOptions
            };
        });
        console.log(i)

    };

    const deleteQuestion = (uuid) => {
        setFormInfom((prevInfo) => ({
            ...prevInfo,
            fields: prevInfo.fields.filter((field) => field.uuid !== uuid),
        }));

        setShowDeleteIcon(false);
        setMainDeleteQuestion(null);
        setNumberTypeInput([])
        setFields({
            fields_type: fields.fields_type,
            questions: "",
            options: [],
        });
    }

    const deleteFromHandler = async () => {
        const access = localStorage.getItem("access");

        const headers = {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json'
        };

        const body = {
            uuid: mainForm.uuid
        };


        try {
            const response = await fetch(`${IP}/form/create-fields/`, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (response.status === 200) {
                console.log(response);
                setLoading(false);
                toast.success(`The form was deleted successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    back()
                    getAllForm()
                }, 2000);
            }

        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            {
                loading ?
                    <Loading />
                    :
                    <div style={{ width: "100%" }}>
                        <Header />
                        <Row className='addFormContainer d-flex align-items-start w-100'>
                            {
                                showForm &&
                                <div className='mb-2'>
                                    <div
                                        onClick={back}
                                        style={{ all: "unset", display: "block", color: "#45ABE5", cursor: "pointer" }}
                                    >
                                        <ArrowBackIcon
                                            style={{ fontSize: "1rem", cursor: "pointer" }} />back
                                    </div>
                                </div>
                            }
                            <Col md={9} className='form-display-container'>
                                <div className={`form-display ${fromInfom.title ? '' : "fomImg"}`}>
                                    {
                                        fromInfom.title &&
                                        <FormDisplay
                                            selectElement={selectElement}
                                            fromInfom={fromInfom}

                                        />
                                    }

                                </div>
                            </Col>
                            <Col md={3} className='form-create-option-container'>
                                <div className="form-create-option">
                                    <div className='inputWrapper'>
                                        <span className='input-title'>
                                            type of User
                                        </span>
                                        <FormControl sx={{ width: "100%" }}>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={personName}
                                                onChange={handleSelectType}
                                                input={<OutlinedInput label="Tag" />}
                                                renderValue={(selected) => selected.join(',')}
                                                MenuProps={MenuProps}
                                                disabled={isDelete}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name.charAt(0)}>
                                                        <Checkbox checked={personName.indexOf(name.charAt(0)) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>


                                    </div>

                                    <InputCreateForm
                                        lable={"Permit or Accident"}
                                        title={"Form Type"}
                                        value={fromInfom.type}
                                        onChange={handleChange}
                                        name="type"
                                        disabled={isDelete}
                                    />
                                    <InputCreateForm
                                        lable={"Title"}
                                        title={"Header"}
                                        value={fromInfom.title}
                                        onChange={handleChange}
                                        name="title"
                                        disabled={isDelete}

                                    />
                                    <InputCreateForm
                                        lable={"Description"}
                                        title={"Description"}
                                        value={fromInfom.descriptions}
                                        name="descriptions"
                                        onChange={handleChange}
                                        disabled={isDelete}
                                    />

                                    <div className='d-flex align-items-center'>
                                        <div className="inputWrapper">
                                            <span className='input-title'>
                                                Add Question
                                            </span>
                                            <input
                                                value={fields.questions}
                                                type="text"
                                                className='input-form'
                                                placeholder={"Question"}
                                                onChange={handleChangeQuetion}
                                                name={"questions"}
                                                disabled={isDelete}
                                            />
                                        </div>
                                        {
                                            showDeleteIcon &&
                                            <DeleteIcon
                                                onClick={() => deleteQuestion(questionUuid)}
                                                className='Delete-form-Icon'
                                            />
                                        }

                                    </div>
                                    <div>
                                        <span className='input-title'>
                                            Type Of Option
                                        </span>
                                        <div className='dropDwonForm'
                                            style={{ fontSize: "13px", height: "45px", lineHeight: "37px" }}>

                                            <select
                                                onChange={(e) => {
                                                    setTypeInput(e.target.value)
                                                    if (typeInput === "shortanswer" || typeInput === "textarea" || typeInput === "date" || typeInput === "time") {
                                                        setNumberTypeInput([])
                                                        fields.options = []
                                                    }
                                                    fields.fields_type = e.target.value
                                                }
                                                }
                                                className='dropDwon'
                                                value={fields.fields_type}
                                                disabled={isDelete}
                                            >
                                                <option value="radio">Radio Button</option>
                                                <option value="checkbox">Check Box</option>
                                                <option value="dropdown">Dropdown</option>
                                                <option value="shortanswer">Short Answer</option>
                                                <option value="textarea" >Text Area</option>
                                                <option value="date">Date</option>
                                                <option value="time">Time</option>
                                            </select>
                                        </div>
                                    </div>

                                    <AddInput
                                        createBox={createBox}
                                    />

                                    {
                                        numberTypeInput.length > 0 &&
                                        numberTypeInput.map((input, i) => (
                                            showDeleteIcon ? (
                                                <BoxInput
                                                    key={i}
                                                    type={input.choice}
                                                    deleteBox={mainForm ? () => deleteMainBox(i) : deleteBox}
                                                    uuid={input.uuid}
                                                    name='choice'
                                                    onChange={handleChangeContent}
                                                    value={input.choice}
                                                />
                                            ) : (
                                                <BoxInput
                                                    key={i}
                                                    type={input.choice}
                                                    deleteBox={deleteBox}
                                                    uuid={input.uuid}
                                                    name='choice'
                                                    onChange={handleChangeContent}

                                                />
                                            )
                                        ))
                                    }
                                    {
                                        isDelete ?
                                            <Button
                                                btnCalss={"button-component addFormBtn deleteButton"}
                                                content={"Delete"}
                                                onClick={deleteFromHandler}
                                            /> :
                                            <>
                                                <Button
                                                    btnCalss={"button-component addFormBtn"}
                                                    content={showDeleteIcon ? "save" : "Add"}
                                                    onClick={addToForm}
                                                />
                                                <Button
                                                    btnCalss={"button-component"}
                                                    content={"Create"}
                                                    onClick={sendFormHandler}
                                                    disabled={!isCreate}
                                                />
                                            </>
                                    }

                                </div>
                            </Col>
                        </Row>
                    </div>
            }

            <ToastContainer />
        </>
    )
}

// fetch('https://api.example.com/data')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle successful response here
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle error here
//     alert('Error fetching data: ' + error.message);
//   });
