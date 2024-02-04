import React, { useState } from 'react'
import "./Header.css"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logoColor from '../../Images/logoColor.svg'
import OffCanvas from '../OffCanvas/OffCanvas';
export default function Header() {

    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleToggleOffCanvas = () => {
        setShowOffCanvas(!showOffCanvas);
    };

    return (
        <div className="d-lg-none mb-2">
            <OffCanvas
                show={showOffCanvas}
                onHide={() => setShowOffCanvas(false)}
            />
            <div className="header-wrapper d-flex">
                <IconButton
                    onHide={() => setShowOffCanvas(false)}
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
