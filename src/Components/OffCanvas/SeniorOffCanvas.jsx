import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './OffCanvas.css'
import logoColor from '../../Images/logoColor.svg'
import avatar from '../../Images/avatar.png'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';;
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';;
import CottageIcon from '@mui/icons-material/Cottage';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { IP } from '../../App';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const drawerWidth = 280;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SeniorOffCanvas({ show, onHide }) {
    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    const currentRoute = location.pathname;
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [userInfo, setUserInfo] = useState("")
    const [imgSrc, setImgSrc] = useState();
    const [defaultImg, setDefaultImg] = useState();
    const [numberNotif, setNumberNotif] = useState('');
    const [showm, setShow] = useState(false);


    //all icons in side bar
    const drawerIcons = [
        <CottageIcon />,
        <AddIcon />,
        <FormatListNumberedIcon />,
        <ChecklistIcon />,
        <ContentPasteIcon />,
        <ChatBubbleOutlineIcon />,
        <LogoutIcon />
    ];
    //slelect route
    const [selectedRoute, setSelectedRoute] = React.useState('/');
    const navigate = useNavigate();

    const logOutHandler = async () => {

        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        localStorage.clear()
        navigate('/login')
        const headers = {
            Authorization: `Bearer ${access}`,

        };
        const body = {
            refresh: refresh
        }
        try {
            const response = await axios.post(`${IP}/user/logout/`, body, {
                headers
            })

            if (response.status === 200) {
                localStorage.clear()
                navigate('/login')
            }
        } catch (e) {
            console.log(e)
        }
    }

    //change route
    const handleItemClick = (route) => {
        onHide(false)
        if (route === '/logout') {
            swal({
                title: "Are you sure you want to exit?",
                icon: "warning",
                buttons: ["No", "Yes"]
            }).then(result => {
                if (result) {
                    logOutHandler()
                }
            })

        } else {
            navigate(route);
        }
        setSelectedRoute(route);
    };

    const numberChat = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/chat/get-unread-chat/`, {
                headers,
            })

            if (response.status === 200) {
                setNumberNotif(response.data.unread_chats_count)
            }

        } catch (e) {

            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    const closehandler = (event) => {
        event.preventDefault()
        handleClose()
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setShowEditModalHandler = () => {
        onHide()
        handleShow()
    }

    useEffect(() => {
        numberChat()
    }, [currentRoute])


    const showInfoHnadler = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/user/user-profile//`, {
                headers,
            })

            if (response.status === 200) {
                setUserInfo(response.data)
                setFname(response.data[0].first_name)
                setLname(response.data[0].last_name)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        showInfoHnadler()
    }, [])


    const sendEditProfile = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        if (imgSrc) {
            formData.append("avatar", imgSrc);
        }
        formData.append("first_name", fname)
        formData.append("last_name", lname)
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        if (fname.trim() && lname.trim()) {
            try {
                const response = await axios.put(`${IP}/user/edit-user-profile/`, formData, {
                    headers,
                })

                if (response.status === 200) {
                    handleClose()
                    swal({
                        title: "Changes applied successfully",
                        icon: "success",
                        button: "Ok"
                    })

                    showInfoHnadler()
                }

            } catch (e) {
                console.log(e)
                if (e.response.status === 401) {
                    localStorage.clear()
                    navigate("/login")
                }
            }
        }
    }

    return (
        <>


            <Modal
                centered
                show={showm}
                onHide={handleClose}
            >
                <div className="editModal-off">
                    <p className="title-prof">
                        Personal Info
                    </p>
                    <form className="editUserInfo">
                        <div className="img-profile-wrapper">
                            <label htmlFor="aaa" className='lable-img-p'>
                                <img
                                    src={defaultImg ? defaultImg : (userInfo[0]?.avatar ? `${IP}${userInfo[0]?.avatar}` : avatar)}
                                    className='img-profile'
                                />
                            </label>
                            <input
                                type="file"
                                className='img-info'
                                id="aaa"
                                onChange={(e) => {
                                    setImgSrc(e.target.files[0]);
                                    setDefaultImg(URL.createObjectURL(e.target.files[0]))
                                }}
                            />
                        </div>
                        <p className="prof-job-position">
                            <p className="prof-job-position">
                                {userInfo && userInfo[0]?.user_type === "S" ? "Senior Officer" : ""}
                            </p>
                        </p>
                        <div className='inputs-prof-wrapper'>
                            <div className='input-wrapper-prof fname-prof-wrapper'>
                                <input
                                    type="text"
                                    className='input-prof fname-prof'
                                    placeholder='First Name'
                                    value={fname}
                                    onChange={e => setFname(e.target.value)}
                                />
                                <PermIdentityIcon style={{ color: "#15616d" }} />
                            </div>
                            <div className='input-wrapper-prof lname-prof-wrapper'>
                                <input
                                    type="text"
                                    className='input-prof lname-prof'
                                    placeholder='Last Name'
                                    value={lname}
                                    onChange={e => setLname(e.target.value)}
                                />
                                <PermIdentityIcon style={{ color: "#15616d" }} />
                            </div>
                        </div>
                        <div className='btns-actions'>
                            <button className='btn-prof save-pro' onClick={sendEditProfile}>save</button>
                            <button className='btn-prof cansle-pro' onClick={closehandler}>cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Offcanvas
                className="custom-offcanvas "
                show={show}
                onHide={onHide}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingBottom: "10%",
                                borderBottom: "1px solid  lightgrey",
                            }}
                            className='DrawerHeader'
                        >
                            <div className='sideBar-img-wrapper'>
                                <img className='sideBar-img' src={logoColor} alt="logo" />
                            </div>
                            <div className="sideBar-userInfo-wrapper">
                                <div className="sideBar-imgUser-wrapper" onClick={setShowEditModalHandler}>
                                    <img className='sideBar-imgUser' src={(userInfo && userInfo[0]?.avatar ? `${IP}${userInfo[0]?.avatar}` : avatar)} />
                                </div>
                                <div className="sideBar-userInfo">
                                    <span className='sideBar-user-text' >
                                        {userInfo && userInfo[0]?.first_name}  {userInfo && userInfo[0]?.last_name}
                                    </span>
                                    <span className='sideBar-user-job'>{userInfo && userInfo[0]?.user_type === "S" ? "Senior Officer" : ""}</span>
                                </div>
                                <div className="sideBar-notif-wrapper">
                                    <span className="notif-number">{numberNotif ? numberNotif : 0}</span>
                                    <Link style={{ all: "unset", cursor: "pointer" }} to={'/chat'}> <MailOutlineIcon /></Link>
                                </div>
                            </div>
                        </DrawerHeader>

                        <List>
                            {['Home', 'Add New Form', 'Generated Forms', "Filled Forms", "Ai Reports", "Chat", "Log out"].map((text, index) => (
                                <CSSTransition key={text} timeout={300} classNames="fade">
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => handleItemClick(text === 'Home' ? '/' : text === "Filled Forms" ? "/filledforms/0" : `/${text.toLowerCase().replace(/\s/g, '')}`)}
                                            sx={{
                                                mt: text === "Log out" ? 10 : 0,
                                                '&:hover': { backgroundColor: '#DDF0FA' },
                                                backgroundColor: currentRoute === (text === 'Home' ? '/' : `/${text.toLowerCase().replace(/\s/g, '')}`) ? '#DDF0FA' : 'inherit',

                                            }}
                                        >
                                            <ListItemIcon style={{ color: "#000" }}>
                                                {drawerIcons[index]}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                </CSSTransition>
                            ))}
                        </List>

                    </Drawer>
                </Box>
            </Offcanvas>
        </>
    )
}
