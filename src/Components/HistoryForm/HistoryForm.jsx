import React from 'react'
import './HistoryForm.css'
import CloseIcon from '@mui/icons-material/Close';
export default function HistoryForm({ isActive, toggleAudianceActive, AllForms, setGroup }) {
    return (
        <div className={`historyform-container ${isActive ? "activeAudiance" : ""}`}>
            <div className="history-container-header d-flex justify-content-between align-items-center">
                <CloseIcon
                    onClick={toggleAudianceActive}
                    style={{ cursor: "pointer" }} />
                <p style={{ color: "#89CCE5" }}>History Chat</p>
            </div>
            <div className='history-content mt-3'>
                {
                    AllForms.length > 0 && AllForms.map(form => (
                        <div
                            key={form.group}
                            className="history-item d-flex justify-content-between"
                            onClick={() => setGroup(form.group)}
                        >
                            <p>Form Number : {form.group}</p>
                            <p>{form.date}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
