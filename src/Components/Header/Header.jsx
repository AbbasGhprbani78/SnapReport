import React, { useState } from 'react'
import "./Header.css"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logoColor from '../../Images/logoColor.svg'
import SeniorOffCanvas from '../OffCanvas/SeniorOffCanvas';
import { useMyContext } from '../RoleContext';
import ManualOffcanvas from '../OffCanvas/ManualOffcanvas'
import OrdinaryOffcanvs from '../OffCanvas/OrdinaryOffcanvas'
export default function Header() {

    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleToggleOffCanvas = () => {
        setShowOffCanvas(!showOffCanvas);
    };
    const { sharedData } = useMyContext();
    const { type } = useMyContext()


    return (
        <div className="d-lg-none mb-4 mb-md-2 headerContainer">
            {
                (sharedData || type) === "S" ?
                    <SeniorOffCanvas
                        show={showOffCanvas}
                        onHide={() => setShowOffCanvas(false)}
                    />
                    :
                    (sharedData || type) === "M" ?
                        <ManualOffcanvas
                            show={showOffCanvas}
                            onHide={() => setShowOffCanvas(false)}
                        />
                        :
                        (sharedData || type) === "O" ?
                            <OrdinaryOffcanvs
                                show={showOffCanvas}
                                onHide={() => setShowOffCanvas(false)}
                            /> :
                            null
            }


            <div className="header-wrapper d-flex">
                <IconButton
                    style={{ color: "#45ABE5", marginLeft: "5px" }}
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleToggleOffCanvas}
                >
                    <MenuIcon />
                </IconButton>
                <div className="logoHeader_wrapper">
                    <img src={logoColor} alt="logoHeader" />
                </div>
            </div>
        </div>
    )
}
