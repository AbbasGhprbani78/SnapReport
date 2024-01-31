import React, { useState } from 'react'
import '../Style/AddForm.css'
import { Row, Col } from 'react-bootstrap'
import InputCreateForm from '../Components/InputCreateForm/InputCreateForm'
import Button from '../Components/Button/Button'
import AddInput from '../Components/AddCheckBox/AddInput'
import BoxInput from '../Components/BoxInput/BoxInput'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormDisplay from '../Components/FormDisplay/FormDisplay'
import DeleteIcon from '@mui/icons-material/Delete';

export default function AddForm() {
    const [showBorder, setShowBorder] = useState(false)
    const [typeInput, setTypeInput] = useState("radio")
    const [numberTypeInput, setNumberTypeInput] = useState([])
    const [showDeleteIcon, setShowDeleteIcon] = useState(false)
    const [hasFunctionRun, setHasFunctionRun] = useState(false);
    const [addButtonContent, setAddButtonContent] = useState("Add");
    const [MainDeleteQuestion, setMainDeleteQuestion] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    const [fromInfom, setFormInfom] = useState(

        {
            type: "",
            title: "",
            description: "",
            fields: [

            ]
        }
    )

    const [fields, setFields] = useState({
        type: "radio",
        question: "",
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

    console.log(fromInfom)
    console.log(fields)
    // create box for option of question
    const createBox = () => {

        if ((typeInput === "Short Answer" || typeInput === "textarea" || typeInput === "date" || typeInput === "time")) {
            if (!hasFunctionRun) {
                const newBox = {
                    uuid: crypto.randomUUID(),
                    content: typeInput
                }
                setNumberTypeInput(prevState => {
                    return [...prevState, newBox];
                })
                setFields((prevFields) => ({
                    ...prevFields,
                    options: [...prevFields.options, { content: "" }],
                }));

                setHasFunctionRun(true);
            }
        } else {
            const newBox = {
                uuid: crypto.randomUUID(),
                content: typeInput
            }
            setNumberTypeInput(prevState => {
                return [...prevState, newBox];
            })
            setFields((prevFields) => ({
                ...prevFields,
                options: [...prevFields.options, { content: "" }],
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
                    content: updatedContent,
                };
                return updatedBoxes;
            });

            setFields((prevFields) => {
                const updatedOptions = [...prevFields.options];
                updatedOptions[boxIndex] = {
                    content: updatedContent,
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

        if (!fromInfom.type || !fromInfom.title || !fromInfom.description || !fields.question || !typeInput) {
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

        if (!fields.type || !fields.question || fields.options.some(option => !option.content)) {
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
        const optionsWithUuid = fields.options.map(option => ({
            ...option,
            uuid: crypto.randomUUID(),
        }));

        setFormInfom((prevInfo) => ({
            ...prevInfo,
            fields: [...prevInfo.fields, { ...fields, options: optionsWithUuid }],
        }));

        if (addButtonContent === "Save") {

            const updatedFields = fromInfom.fields.map(question => {
                if (question.question === MainDeleteQuestion) {
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
            type: fields.type,
            question: "",
            options: [],
        });

        setTypeInput(fields.type);
        setNumberTypeInput([])
        setHasFunctionRun(false)
        setIsCreate(true)
        setAddButtonContent("Add");
    }

    const sendFormHandler = () => {

        if (!fromInfom.fields.length > 0) {
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
            console.log("send")
        }

    }


    const selectElement = (question, content) => {
        console.log(content)
        setMainDeleteQuestion(question)
        setShowDeleteIcon(prevState => !prevState)
        setShowBorder(prevState => !prevState)

        if (!showDeleteIcon) {
            setNumberTypeInput(content.options)
        } else {
            setNumberTypeInput([])
        }
        setAddButtonContent("Save");
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
        setShowBorder(false)
        setNumberTypeInput([])
        setAddButtonContent("Add")

    }


    return (
        <>
            <Row className='addFormContainer d-flex align-items-start w-100'>
                <Col md={9} className='form-display-container'>
                    <div className="form-display">
                        {
                            fromInfom.title &&
                            <FormDisplay
                                selectElement={selectElement}
                                fromInfom={fromInfom}
                                showBorder={showBorder}
                            />
                        }

                    </div>
                </Col>
                <Col md={3} className='form-create-option-container'>
                    <div className="form-create-option">
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
                            value={fromInfom.description}
                            name="description"
                            onChange={handleChange}
                        />

                        <div className='d-flex align-items-center'>
                            <div className="inputWrapper">
                                <span className='input-title'>
                                    Add Question
                                </span>
                                <input
                                    value={MainDeleteQuestion ? MainDeleteQuestion : fields.question}
                                    type="text"
                                    className='input-form'
                                    placeholder={"Question"}
                                    onChange={handleChangeQuetion}
                                    name={"question"}
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
                                style={{ width: "225.2px", fontSize: "13px", height: "45px", lineHeight: "37px" }}>

                                <select
                                    onChange={(e) => {
                                        setTypeInput(e.target.value)
                                        fields.type = e.target.value
                                        setNumberTypeInput([])
                                        fields.options = []
                                    }
                                    }
                                    className='dropDwon'>
                                    <option value="radio">Radio Button</option>
                                    <option value="checkbox">Check Box</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="Short Answer">Short Answer</option>
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
                                <BoxInput
                                    key={i}
                                    type={input.content}
                                    deleteBox={deleteBox}
                                    uuid={input.uuid}
                                    name='content'
                                    onChange={handleChangeContent}

                                />
                            ))
                        }

                        <Button
                            btnCalss={"button-component addFormBtn"}
                            content={addButtonContent}
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




