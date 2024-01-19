import React, { useState } from 'react';

export default function Form2() {
    const [inputFields, setInputFields] = useState([
        { name: "", age: "", gender: "", subscribed: false, status: "active" }
    ]);

    const handleChange = (i, e) => {
        let data = [...inputFields];
        if (e.target.type === 'checkbox') {
            data[i][e.target.name] = e.target.checked;
        } else {
            data[i][e.target.name] = e.target.value;
        }
        setInputFields(data);
    }

    const addField = () => {
        const newField = { name: "", age: "", gender: "", subscribed: false, status: "active" };
        setInputFields([...inputFields, newField]);
    }

    const removeField = (i) => {
        let data = [...inputFields];
        data.splice(i, 1);
        setInputFields(data);
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields);

    }

    return (
        <>
            <form onSubmit={submit}>
                {
                    inputFields.map((field, i) => (
                        <div key={i}>
                            <input
                                name='name'
                                value={field.name}
                                placeholder={"name"}
                                onChange={e => handleChange(i, e)}
                            />
                            <input
                                name='age'
                                value={field.age}
                                placeholder={"age"}
                                onChange={e => handleChange(i, e)}
                            />
                            <select
                                name='gender'
                                value={field.gender}
                                onChange={e => handleChange(i, e)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label>
                                <input
                                    type='checkbox'
                                    name='subscribed'
                                    checked={field.subscribed}
                                    onChange={e => handleChange(i, e)}
                                />
                                Subscribe
                            </label>
                            <div>
                                <label>
                                    <input
                                        id='active'
                                        type='radio'
                                        name={"status"}
                                        value='active'
                                        checked={field.status === 'active'}
                                        onChange={e => handleChange(i, e)}
                                    />
                                    Active
                                </label>
                                <label>
                                    <input
                                        id='inactive'
                                        type='radio'
                                        name={"status"}
                                        value='inactive'
                                        checked={field.status === 'inactive'}
                                        onChange={e => handleChange(i, e)}
                                    />
                                    Inactive
                                </label>
                            </div>
                            <button onClick={() => removeField(i)}>Remove</button>
                        </div>
                    ))
                }
                <button type='submit'>Submit</button>
            </form>

            <button onClick={addField}>Add More</button>
        </>
    );
}
