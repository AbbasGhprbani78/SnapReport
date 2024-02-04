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



export default function AddNewForm() {

    const [personName, setPersonName] = React.useState([]);

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
    const [isCreate, setIsCreate] = useState(false)
    const [fromInfom, setFormInfom] = useState(

        {
            personType: [],
            type: "",
            title: "",
            descriptions: "",
            fields: [

            ]
        }
    )
    useEffect(() => {

        setFormInfom((prevInfo) => ({
            ...prevInfo,
            personType: personName,
        }));
    }, [personName]);

    const [fields, setFields] = useState({
        fields_type: "radio",
        questions: "",
        options: [
        ]
    })

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormInfom((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleChangeQuetion = (e) => {
        const { name, value } = e.target;
        setFields((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };


    const createBox = () => {

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
                    choice: updatedContent,
                };
                return updatedBoxes;
            });

            setFields((prevFields) => {
                const updatedOptions = [...prevFields.options];
                updatedOptions[boxIndex] = {
                    choice: updatedContent,
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
            fields: [...prevInfo.fields, { ...fields, options: optionsWithUuid }],
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
            fields_type: fields.fields_type,
            questions: "",
            options: [],
        });

        setNumberTypeInput([])
        setIsCreate(true)
        setShowDeleteIcon(false)
    }

    const sendFormHandler = async () => {

        if (!fromInfom.fields.length > 0 || !fromInfom.personType.length > 0) {
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

            const body = {
                ...fromInfom,
                creator: localStorage.getItem("uuid"),
            };
            console

            const access = localStorage.getItem("access")

            const headers = {
                Authorization: `Bearer ${access}`
            };
            try {
                const response = await axios.post(`${IP}/form/create-fields/`, body, {
                    headers
                });

                if (response.status === 201) {
                    console.log(response)
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

            }
        }

    }

    const selectElement = (question, content) => {
        setMainDeleteQuestion(question)
        fields.options = content.options
        fields.questions = question
        fields.fields_type = content.fields_type
        setTypeInput(content.fields_type)
        setShowDeleteIcon(prevState => !prevState)


        if (!showDeleteIcon) {
            setNumberTypeInput(content.options)
        } else {
            setNumberTypeInput([])
            setFields({
                fields_type: fields.fields_type,
                questions: "",
                options: [],
            });
        }
    }

    const deleteQuestion = () => {
        const questionIndex = fromInfom.fields.findIndex(question => question.question === MainDeleteQuestion);

        if (questionIndex !== -1) {
            const updatedFields = [...fromInfom.fields];
            updatedFields.splice(questionIndex, 1);
            setFormInfom(prevInfo => ({
                ...prevInfo,
                fields: updatedFields,
            }));
        }

        setShowDeleteIcon(false);
        setMainDeleteQuestion(null);
        setNumberTypeInput([])
        setFields({
            fields_type: fields.fields_type,
            questions: "",
            options: [],
        });
    }

    return (
        <>
            <Row className='addFormContainer d-flex align-items-start w-100'>
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
                            <FormControl sx={{
                                width: "100% "
                            }}>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={personName}
                                    onChange={handleSelectType}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={personName.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <InputCreateForm
                            lable={"Permit"}
                            title={"Form Type"}
                            value={fromInfom.type}
                            onChange={handleChange}
                            name="type"
                        />
                        <InputCreateForm
                            lable={"Title"}
                            title={"Header"}
                            value={fromInfom.title}
                            onChange={handleChange}
                            name="title"
                        />
                        <InputCreateForm
                            lable={"Description"}
                            title={"Description"}
                            value={fromInfom.descriptions}
                            name="descriptions"
                            onChange={handleChange}
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
                                />
                            </div>
                            {
                                showDeleteIcon &&
                                <DeleteIcon
                                    onClick={deleteQuestion}
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
                            numberTypeInput.map((input, i) => (
                                showDeleteIcon ? (
                                    <BoxInput
                                        key={i}
                                        type={input.content}
                                        deleteBox={deleteBox}
                                        uuid={input.uuid}
                                        name='content'
                                        onChange={handleChangeContent}
                                        value={input.content}
                                    />
                                ) : (
                                    <BoxInput
                                        key={i}
                                        type={input.content}
                                        deleteBox={deleteBox}
                                        uuid={input.uuid}
                                        name='content'
                                        onChange={handleChangeContent}

                                    />
                                )
                            ))
                        }

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
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </>
    )
}




