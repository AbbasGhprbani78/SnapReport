import React, { useState } from 'react';

export default function Form2() {
    const [inputType, setInputType] = useState('text');
    const [inputFields, setInputFields] = useState([]);

    const handleSelectChange = (e) => {
        setInputType(e.target.value);
    };

    const handleCreateInput = () => {
        const newInput = {
            type: inputType,
            value: '',
            checkboxLabel: '',
            radioValue: '',
            radioLabel: ''
        };
        setInputFields([...inputFields, newInput]);
    };

    const handleInputChange = (index, value) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].value = value;
        setInputFields(updatedInputFields);
    };

    const handleCheckboxChange = (index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].value = !updatedInputFields[index].value;
        setInputFields(updatedInputFields);
    };

    const handleCheckboxLabelChange = (index, label) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].checkboxLabel = label;
        setInputFields(updatedInputFields);
    };

    const handleRadioChange = (index, radioValue) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].value = radioValue;
        setInputFields(updatedInputFields);
    };

    const handleRadioLabelChange = (index, label) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].radioLabel = label;
        setInputFields(updatedInputFields);
    };

    const renderInputFields = () => {
        return inputFields.map((field, index) => (
            <div key={index}>
                {field.type === 'text' && (
                    <input
                        type={field.type}
                        placeholder={`Enter ${field.type}`}
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                )}

                {field.type === 'number' && (
                    <input
                        type={field.type}
                        placeholder={`Enter ${field.type}`}
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                )}

                {field.type === 'date' && (
                    <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                )}

                {field.type === 'radio' && (
                    <div>
                        <input
                            type="radio"
                            value={field.value}
                            checked={field.value === field.radioValue}
                            onChange={() => handleRadioChange(index, field.radioValue)}
                        />
                        <label>
                            {field.radioLabel}
                            <input
                                type="text"
                                placeholder="Radio Label"
                                value={field.radioLabel}
                                onChange={(e) => handleRadioLabelChange(index, e.target.value)}
                            />
                        </label>
                    </div>
                )}

                {field.type === 'checkbox' && (
                    <div>
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label>
                            {field.checkboxLabel}
                            <input
                                type="text"
                                placeholder="Checkbox Label"
                                value={field.checkboxLabel}
                                onChange={(e) => handleCheckboxLabelChange(index, e.target.value)}
                            />
                        </label>
                    </div>
                )}

                {field.type === 'dropdown' && (
                    <select
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                )}
            </div>
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a FormData object to store form data
        const formData = new FormData();

        // Append each input field to the FormData object
        inputFields.forEach((field, index) => {
            formData.append(`input-${index}`, JSON.stringify(field));
        });

        // Log the FormData object to the console (you can replace this with your logic)
        console.log('Form Data:', formData);
        // You can also submit the form data to a server or perform other actions here
    };

    return (
        <div>
            <label htmlFor="inputType">Select Input Type:</label>
            <select id="inputType" value={inputType} onChange={handleSelectChange}>
                <option value="text">Text Input</option>
                <option value="number">Number Input</option>
                <option value="date">Date Input</option>
                <option value="radio">Radio Buttons</option>
                <option value="checkbox">Checkbox</option>
                <option value="dropdown">Dropdown</option>
            </select>

            <button type="button" onClick={handleCreateInput}>
                Create Input
            </button>

            <form onSubmit={handleSubmit}>
                <div id="inputFieldsContainer">
                    {renderInputFields()}
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};





// const [inputFields, setInputFields] = useState([
//     { name: '', age: '', gender: '', subscribed: false, status: 'active', checkboxes: [] },
// ]);

// const handleChange = (i, e) => {
//     let data = [...inputFields];
//     if (e.target.type === 'checkbox') {
//         data[i][e.target.name] = e.target.checked;
//     } else {
//         data[i][e.target.name] = e.target.value;
//     }

//     setInputFields(data);
// };

// const addField = () => {
//     const newField = { name: '', age: '', gender: '', subscribed: false, status: 'active', checkboxes: [] };
//     setInputFields([...inputFields, newField]);
// };

// const removeField = (i) => {
//     let data = [...inputFields];
//     data.splice(i, 1);
//     setInputFields(data);
// };

// const addCheckbox = (i) => {
//     let data = [...inputFields];
//     const newCheckbox = { value: '' };
//     data[i].checkboxes.push(newCheckbox);
//     setInputFields(data);
// };

// const removeCheckbox = (i, checkboxIndex) => {
//     let data = [...inputFields];
//     data[i].checkboxes.splice(checkboxIndex, 1);
//     setInputFields(data);
// };

// const submit = (e) => {
//     e.preventDefault();
//     console.log(inputFields);
// };


{/* <form onSubmit={submit}>
                {inputFields.map((field, i) => (
                    <div key={i}>
                        <input
                            name="name"
                            value={field.name}
                            placeholder="name"
                            onChange={(e) => handleChange(i, e)}
                        />
                        <input
                            name="age"
                            value={field.age}
                            placeholder="age"
                            onChange={(e) => handleChange(i, e)}
                        />
                        <select name="gender" value={field.gender} onChange={(e) => handleChange(i, e)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label>
                            <input
                                type="checkbox"
                                name="subscribed"
                                checked={field.subscribed}
                                onChange={(e) => handleChange(i, e)}
                            />
                            Subscribe
                        </label>
                        <div>
                            <label>
                                <input
                                    id="active"
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={field.status === 'active'}
                                    onChange={(e) => handleChange(i, e)}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    id="inactive"
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={field.status === 'inactive'}
                                    onChange={(e) => handleChange(i, e)}
                                />
                                Inactive
                            </label>
                        </div>
                        {field.checkboxes &&
                            field.checkboxes.map((checkbox, checkboxIndex) => (
                                <div key={checkboxIndex}>
                                    <input
                                        type="checkbox"
                                        checked={checkbox.value}
                                        onChange={(e) => {
                                            let data = [...inputFields];
                                            data[i].checkboxes[checkboxIndex].value = e.target.checked;
                                            setInputFields(data);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCheckbox(i, checkboxIndex)}
                                    >
                                        Remove Checkbox
                                    </button>
                                </div>
                            ))}
                        <button type="button" onClick={() => addCheckbox(i)}>
                            Add Checkbox
                        </button>
                        <button onClick={() => removeField(i)}>Remove</button>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>

            <button onClick={addField}>Add More</button> */}