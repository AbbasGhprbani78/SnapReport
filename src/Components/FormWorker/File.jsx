import React, { useState } from 'react'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
export default function File({ uuid, onChange, value }) {

    const [file, setFile] = useState("")

    return (
        <div className="option-wrapper">
            <div className='option-wrapper'>
                <label htmlFor={`${uuid}`} className='d-flex align-items-center'>
                    {
                        file ? <img className='image-file' src={URL.createObjectURL(file)} alt="" />
                            :
                            <CloudUploadOutlinedIcon style={{ fontSize: "2rem" }} />
                    }
                    <p className='upload-file'> Upload image</p>
                </label>
                <input
                    style={{ display: "none" }}
                    id={uuid}
                    type="file"
                    value={value}
                    accept="image/*"
                    onChange={e => {
                        onChange(uuid, e)
                        setFile(e.target.files[0])
                    }}
                />
            </div>
        </div>
    )
}
