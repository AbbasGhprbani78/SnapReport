import React from 'react'
import './FailHomeItem.css'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default function FailHomeItem({
    id,
    dec,
    title,
    type,
    form,
    accept,
    setFormUuid,
    setFields,
    setTitle,
    setDescription,
    openFormFailHandler
}) {

    const acceptForm = form.fields[0].checks[0].accept
    return (
        <>
            <div className="FailHomeItem">
                <p className='kind-form mb-2'>{title}</p>
                <div className='d-flex justify-content-between'>
                    <p
                        className='viewmore'
                        style={{ fontSize: ".9rem" }}

                        onClick={() => {
                            openFormFailHandler()
                            setTitle(form.title)
                            setDescription(form.descriptions)
                            setFields(form.fields)
                            setFormUuid(form.uuid)
                        }}
                    >view More</p>
                    {
                        accept &&
                        <p className='condition-request-text home-condition-text'>{acceptForm === "2" ?
                            (<>
                                Accepted <span style={{ marginLeft: "7px" }} ><DoneIcon className='condition-request-done icon-condition' /></span>
                            </>) :
                            acceptForm === "1" ?
                                (<>
                                    Reject <span style={{ marginLeft: "7px" }} ><CloseIcon className='condition-request-reject icon-condition' /></span>
                                </>) :
                                <>pending <span style={{ marginLeft: "7px" }}><ReportGmailerrorredIcon className='condition-request-pending icon-condition' /></span></>}
                        </p>
                    }
                </div>
                <p className='FailHomeItem-dec'>
                    {dec}
                </p>
            </div>
        </>
    )
}
