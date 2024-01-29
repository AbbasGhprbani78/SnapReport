import React, { useEffect, useState } from 'react'
import '../Style/AddForm.css'
import { Row, Col } from 'react-bootstrap'
import InputCreateForm from '../Components/InputCreateForm/InputCreateForm'
import Button from '../Components/Button/Button'
import AddInput from '../Components/AddCheckBox/AddInput'
import BoxInput from '../Components/BoxInput/BoxInput'
export default function AddForm() {

    const [typeInput, setTypeInput] = useState(null)
    const [numberTypeInput, setNumberTypeInput] = useState([])
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
        type: "",
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

    // create box for option of question
    const createBox = () => {

        const newBox = {
            uuid: crypto.randomUUID(),
            content: typeInput
        }
        setNumberTypeInput(prevState => {
            return [...prevState, newBox];
        })

    }


    const deleteBox = (uuid) => {
        const NewNumberTypeInput = numberTypeInput.filter(input => {
            return input.uuid !== uuid
        })
        setNumberTypeInput(NewNumberTypeInput)
    }

    return (
        <>
            <Row className='addFormContainer d-flex align-items-start w-100'>
                <Col md={9} className='form-display-container'>
                    <div className="form-display">

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
                        <InputCreateForm
                            lable={"Questions"}
                            title={"Add Questions"}
                            value={fields.question}
                            name="question"
                            onChange={handleChangeQuetion}
                        />

                        <div className='dropDown-wrapper'
                            style={{ width: "225.2px", fontSize: "13px", height: "45px", lineHeight: "37px" }}>
                            <select
                                onChange={(e) => {
                                    setTypeInput(e.target.value)
                                    fields.type = e.target.value
                                }
                                }
                                className='dropDwon'>
                                <option defaultValue={"Add Answer"}>Add Answer</option>
                                <option value="radio">Radio Button</option>
                                <option value="checkbox">Check Box</option>
                                <option value="text">Dropdown</option>
                                <option value="Short Answer">Short Answer</option>
                                <option value="textarea" >Text Area</option>
                                <option value="date">Date</option>
                                <option value="time">Time</option>
                            </select>
                        </div>

                        {
                            (typeInput === "radio" || typeInput === "checkbox" || typeInput === "text") &&
                            <AddInput
                                createBox={createBox}
                                textAdd={typeInput}
                            />
                        }
                        {

                            numberTypeInput.map((input, i) => (
                                <BoxInput
                                    key={i}
                                    type={input.content}
                                    deleteBox={deleteBox}
                                    uuid={input.uuid}
                                />
                            ))
                        }

                        <Button
                            btnCalss={"button-component addFormBtn"}
                            content={"Add"}

                        />
                        <Button
                            btnCalss={"button-component"}
                            content={"Create"} />
                    </div>
                </Col>

            </Row>
        </>
    )
}



