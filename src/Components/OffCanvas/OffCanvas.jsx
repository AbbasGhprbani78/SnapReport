import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './OffCanvas.css'
export default function OffCanvas({ show, onHide }) {

    return (
        <>
            <Offcanvas
                className="custom-offcanvas "
                show={show}
                onHide={onHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
