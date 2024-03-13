import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';;
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';;
import CottageIcon from '@mui/icons-material/Cottage';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddIcon from '@mui/icons-material/Add';
import './SideBar.css'
import logoColor from '../../Images/logoColor.svg'
import user from '../../Images/user.jpg'
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IP } from '../../App'
import '../../Style/Main.css'


const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SeniorsideBar({ toggleTheme }) {

    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    const currentRoute = location.pathname;

    //all icons in side bar
    const drawerIcons = [<CottageIcon />, <AddIcon />, <FormatListNumberedIcon />, <ChatBubbleOutlineIcon />, <ContentPasteIcon />, <LogoutIcon />,];
    //slelect route
    const [selectedRoute, setSelectedRoute] = React.useState('/');
    const navigate = useNavigate();


    const logOutHandler = async () => {

        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')

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
            logOutHandler()
        } else {
            navigate(route);
        }
        setSelectedRoute(route);
    };

    const [numberNotif, setNumberNotif] = useState('')

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
            console.log(e)
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        numberChat()
    }, [])




    return (
        <>
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
                                borderBottom: "1px solid  lightgrey",
                            }}
                            className='DrawerHeader'
                        >
                            <div className='sideBar-img-wrapper'>
                                <img className='sideBar-img' src={logoColor} alt="logo" />
                            </div>
                            <div className="sideBar-userInfo-wrapper">
                                <div className="sideBar-imgUser-wrapper">
                                    <img className='sideBar-imgUser' src={user} />
                                </div>
                                <div className="sideBar-userInfo">
                                    <span className='sideBar-user-text' >Abbas Ghorbani</span>
                                    <span className='sideBar-user-job'>Front End Developer</span>
                                    <span></span>
                                </div>
                                <div className="sideBar-notif-wrapper">
                                    <span className="notif-number">{numberNotif ? numberNotif : 0}</span>
                                    <MailOutlineIcon />
                                </div>
                            </div>
                        </DrawerHeader>

                        <List>
                            {['Home', 'Add New Form', 'All form', "chat", "Reports", "Log out"].map((text, index) => (
                                <CSSTransition key={text} timeout={300} classNames="fade">
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => handleItemClick(text === 'Home' ? '/' : `/${text.toLowerCase().replace(/\s/g, '')}`)}
                                            sx={{
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
            </div>

        </>
    );
}