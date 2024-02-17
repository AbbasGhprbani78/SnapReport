import React from 'react'
import './BoxForm.css'
export default function BoxtForm({
    styleCalss,
    title,
    openForm,
    des,
    setMainTitle,
    setMainDes,
    setuuid,
    setMainFields,
    titleForm,
    uuid,
    fields }) {
    return (
        <>
            <div className='BoxForm-Container'>
                <div className="BoxForm-top">
                    <div className="BoxForm-content">
                        <div className={`BoxForm ${styleCalss}`}></div>
                        <p className='boxForm-text text-muted'>{title}</p>
                    </div>
                    <div className='BoxForm-Link'>
                        <div
                            onClick={() => {
                                setMainTitle(titleForm)
                                setMainDes(des)
                                setuuid(uuid)
                                setMainFields(fields)
                                openForm()
                            }}
                            style={{ all: "unset", color: "#45ABE5", fontWeight: "bold", cursor: "pointer" }}
                        >completion form</div>
                    </div>
                </div>
                <div className='BoxForm-des'>{des}</div>
            </div>
        </>

    )
}
