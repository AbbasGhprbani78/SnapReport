import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CottageIcon from '@mui/icons-material/Cottage';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './SideBar.css'
import logoColor from '../../Images/logoColor.svg'
import avatar from '../../Images/avatar.png'
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { useState, useEffect } from 'react';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import axios from 'axios';
import { IP } from '../../App'
import '../../Style/Main.css'
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';


const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function ManualSideBar() {
    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    const [showEditModal, setShowEditModal] = useState(false)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [userInfo, setUserInfo] = useState("")
    const [imgSrc, setImgSrc] = useState()
    const [defaultImg, setDefaultImg] = useState()
    const [showPasswordInputs, setShowPasswordInputs] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const currentRoute = location.pathname;
    const [numberNotif, setNumberNotif] = useState('')

    //all icons in side bar
    const drawerIcons = [
        <CottageIcon />,
        <ChatBubbleOutlineIcon />,
        <ContentPasteGoIcon />,
        <ContentPasteIcon />,
        <GppBadOutlinedIcon />,
        <ContentPasteSearchOutlinedIcon />,
        <LogoutIcon />,];
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

    useEffect(() => {
        numberChat()
    }, [currentRoute])


    const showInfoHnadler = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/user/user-profile/`, {
                headers,
            })

            if (response.status === 200) {
                setUserInfo(response.data)
                setFname(response.data[0].first_name)
                setLname(response.data[0].last_name)
                setEmail(response.data[0].email)
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
        if (showPasswordInputs) {
            formData.append("password", password)
        }
        formData.append("first_name", fname)
        formData.append("last_name", lname)
        formData.append("email", email)
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        if (showPasswordInputs) {
            if (!fname.trim() || !lname.trim() || !password.trim()) {
                return false
            }
        }

        if (fname.trim() && lname.trim() && email.trim()) {
            try {
                const response = await axios.put(`${IP}/user/edit-user-profile/`, formData, {
                    headers,
                })

                if (response.status === 200) {
                    setShowEditModal(false)
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
            {
                showEditModal
                &&
                <div className={`showEditModal-container ${showEditModal ? "showEditModal-container-active" : ""}`}>
                    <div className="closeform" onClick={() => setShowEditModal(false)}></div>
                    <div className="editModal">
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
                                {userInfo && userInfo[0]?.user_type === "S" ? "Senior Officer" : ""}
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
                            <div className="inputs-prof-wrapper">
                                <div className='input-wrapper-prof-email fname-prof-wrapper mt-4'>
                                    <input
                                        type="email"
                                        className='input-prof-email'
                                        placeholder='Email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <PermIdentityIcon style={{ color: "#15616d" }} />
                                </div>
                            </div>

                            <div style={{ direction: "ltr", width: "83%" }} className='mt-4 d-flex align-items-center'>
                                <input
                                    type='checkbox'
                                    onChange={() => setShowPasswordInputs(!showPasswordInputs)}
                                />
                                <label style={{ fontSize: ".7rem", marginLeft: "5px" }}>do you want to change password ?</label>
                            </div>
                            {
                                showPasswordInputs &&
                                <div className='input-wrapper-prof mt-4'>
                                    <input
                                        type="text"
                                        className='input-prof lname-prof'
                                        placeholder='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <PermIdentityIcon style={{ color: "#15616d" }} />
                                </div>
                            }
                            <div className='btns-actions'>
                                <button className='btn-prof save-pro' onClick={sendEditProfile}>save</button>
                                <button className='btn-prof cansle-pro' onClick={() => setShowEditModal(false)}>cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <div className='sidebarContainer'>
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
                                borderBottom: "1px solid lightgrey",
                            }}
                            className='DrawerHeader'
                        >
                            <div className='sideBar-img-wrapper'>
                                <img className='sideBar-img' src={logoColor} alt="logo" />
                            </div>
                            <div className="sideBar-userInfo-wrapper">
                                <div className="sideBar-imgUser-wrapper" onClick={() => setShowEditModal(true)}>
                                    <img className='sideBar-imgUser' src={(userInfo && userInfo[0]?.avatar ? `${IP}${userInfo[0]?.avatar}` : avatar)} />
                                </div>
                                <div className="sideBar-userInfo">
                                    <span className='sideBar-user-text'>
                                        {userInfo && userInfo[0]?.first_name} {userInfo && userInfo[0]?.last_name}
                                    </span>
                                    <span className='sideBar-user-job'>{userInfo && userInfo[0]?.user_type === "O" ? "Ordinary Officer" : ""}</span>
                                </div>
                                <div className="sideBar-notif-wrapper">
                                    <span className="notif-number">{numberNotif ? numberNotif : 0}</span>
                                    <Link style={{ all: "unset", cursor: "pointer" }} to={'/ordinarychat'}> <MailOutlineIcon /></Link>
                                </div>
                            </div>
                        </DrawerHeader>
                        <List>
                            {/* Home Item */}
                            <CSSTransition in={true} timeout={300} classNames="fade">
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleItemClick('/ordinaryhome')}>
                                        <ListItemIcon style={{ color: "#000" }}>
                                            {drawerIcons[0]} {/* Adjust index for Home icon */}
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                            </CSSTransition>

                            {/* Chat Item */}
                            <CSSTransition in={true} timeout={300} classNames="fade">
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleItemClick('/ordinarychat')}>
                                        <ListItemIcon style={{ color: "#000" }}>
                                            {drawerIcons[1]} {/* Adjust index for Chat icon */}
                                        </ListItemIcon>
                                        <ListItemText primary="Chat" />
                                    </ListItemButton>
                                </ListItem>
                            </CSSTransition>

                            <CSSTransition key="Forms" timeout={300} classNames="fade">
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            setSubmenuOpen(!submenuOpen)
                                        }
                                        }
                                        sx={{
                                            '&:hover': { backgroundColor: '#DDF0FA' },
                                        }}
                                    >
                                        <ListItemIcon style={{ color: "#000" }}>
                                            {drawerIcons[3]}
                                        </ListItemIcon>
                                        <ListItemText primary="Forms" />
                                    </ListItemButton>
                                </ListItem>
                            </CSSTransition>


                            <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                                <CSSTransition key="Permit Forms" timeout={300} classNames="fade">
                                    <ListItem disablePadding sx={{ pl: 4 }}>
                                        <ListItemButton
                                            onClick={() => handleItemClick('/ordinarypermitform')}
                                            sx={{
                                                '&:hover': { backgroundColor: '#DDF0FA' },
                                                backgroundColor: currentRoute === '/ordinarypermitform' ? '#DDF0FA' : 'inherit',
                                            }}
                                        >
                                            <ListItemText primary="Permit Forms" />
                                        </ListItemButton>
                                    </ListItem>
                                </CSSTransition>

                                <CSSTransition key="Accident Form" timeout={300} classNames="fade">
                                    <ListItem disablePadding sx={{ pl: 4 }}>
                                        <ListItemButton
                                            onClick={() => handleItemClick('/ordinaryaccidentform')}
                                            sx={{
                                                '&:hover': { backgroundColor: '#DDF0FA' },
                                                backgroundColor: currentRoute === '/ordinaryaccidentform' ? '#DDF0FA' : 'inherit',
                                            }}
                                        >
                                            <ListItemText primary="Accident Form" />
                                        </ListItemButton>
                                    </ListItem>
                                </CSSTransition>

                                <CSSTransition key="Violation Forms" timeout={300} classNames="fade">
                                    <ListItem disablePadding sx={{ pl: 4 }}>
                                        <ListItemButton
                                            onClick={() => handleItemClick('/ordinaryviolationsform')}
                                            sx={{
                                                '&:hover': { backgroundColor: '#DDF0FA' },
                                                backgroundColor: currentRoute === '/ordinaryviolationsform' ? '#DDF0FA' : 'inherit',
                                            }}
                                        >
                                            <ListItemText primary="Violation Forms" />
                                        </ListItemButton>
                                    </ListItem>
                                </CSSTransition>

                                <CSSTransition key="Inspections Form" timeout={300} classNames="fade">
                                    <ListItem disablePadding sx={{ pl: 4 }}>
                                        <ListItemButton
                                            onClick={() => handleItemClick('/ordinaryinpections')}
                                            sx={{
                                                '&:hover': { backgroundColor: '#DDF0FA' },
                                                backgroundColor: currentRoute === '/ordinaryinpections' ? '#DDF0FA' : 'inherit',
                                            }}
                                        >
                                            <ListItemText primary="Inspections Form" />
                                        </ListItemButton>
                                    </ListItem>
                                </CSSTransition>
                            </Collapse>
                            {/* Log Out Item */}
                            <CSSTransition in={true} timeout={300} classNames="fade">
                                <ListItem disablePadding sx={{
                                }}>
                                    <ListItemButton onClick={() => handleItemClick('/logout')}>
                                        <ListItemIcon style={{ color: "#000" }}>
                                            {drawerIcons[6]}
                                        </ListItemIcon>
                                        <ListItemText primary="Log out" />
                                    </ListItemButton>
                                </ListItem>
                            </CSSTransition>
                        </List>
                    </Drawer>
                </Box>
            </div>

        </>
    );
}

