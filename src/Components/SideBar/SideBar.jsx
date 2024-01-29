import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';;
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';;
import MailIcon from '@mui/icons-material/Mail';
import CottageIcon from '@mui/icons-material/Cottage';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import { Badge } from '@mui/material';
import './SideBar.css'
import logoColor from '../../Images/logoColor.svg'
import user from '../../Images/user.jpg'
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function sideBar() {

    const [open, setOpen] = React.useState(true);
    //all icons in side bar
    const drawerIcons = [<CottageIcon />, <MailIcon />, <NotificationsNoneIcon />, <AddIcon />];
    //slelect route
    const [selectedRoute, setSelectedRoute] = React.useState('/home');
    const navigate = useNavigate();

    //change route

    const handleItemClick = (route) => {
        navigate(route);
        setSelectedRoute(route);
    };

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
                                borderBottom: "1px solid  lightgrey"
                            }}
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
                                    <Badge badgeContent={1} color="success">
                                        <NotificationsNoneIcon />
                                    </Badge>
                                </div>
                            </div>
                        </DrawerHeader>

                        <List>
                            {['Home', 'Starred', 'Send email', 'Add New Form'].map((text, index) => (
                                <CSSTransition key={text} timeout={300} classNames="fade">
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => handleItemClick(`/${text.toLowerCase().replace(/\s/g, '')}`)}
                                            sx={{
                                                '&:hover': { backgroundColor: '#DDF0FA' },
                                                backgroundColor: selectedRoute === `/${text.toLowerCase().replace(/\s/g, '')}` ? '#DDF0FA' : 'inherit'
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