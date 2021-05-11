import { Badge, ListItem, ListItemIcon, SvgIcon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { forwardRef, Fragment, useEffect } from 'react';
import { AppBar, MenuItemLink, useDataProvider, useRedirect, UserMenu, useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Notification } from '../types';
import Logo from './Logo';

const client = new W3CWebSocket('wss://socket.fdpconnect.com');

// const client = new W3CWebSocket('ws://127.0.0.7:8000');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flex: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    spacer: {
      flex: 1,
    },
    root: {
      width: '100%',
      // maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      // maxHeight: 300,
      // paddingTop: '40px'
    },

    inline: {
      display: 'inline',
    },
    ResponNotifi: {
      width: '50%',
      top: '20%',
      height: '80%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
        top: '20%',
      },
    },
    drawerPaper: {
      zIndex: 100,
      width: '25%',
      top: '6%',
      right: '0',

      // marginTop:'5vmin',
      //   '&::after': {
      //     content: "",
      //     width: 0,
      //     height: 0,
      //     display: 'block',
      //     position: 'absolute',
      //     zIndex: 10,
      //     border: '0',
      //     borderLeft: '10px solid red',
      //     borderRight: '10px solid red',
      //     marginLeft: '-10px',
      //     left: '50%',
      //     borderBottom: '10px solid #587b7f',
      //     top: '-10px',
      // },
    },
    card: {
      // top:'4%',
      content: "",
      width: 0,
      height: 0,
      display: 'block',
      position: 'absolute',
      zIndex: 10,
      border: '0',
      borderLeft: '10px solid red',
      borderRight: '10px solid red',
      marginLeft: '-10px',
      left: '50%',
      borderBottom: '10px solid #587b7f',
      top: '-10px',
    }
  }),
);

// const Settings = forwardRef<any, any>((props, ref) => {
//   const translate = useTranslate();
//   return (
//     <MenuItemLink
//       ref={ref}
//       to={"/changepassword/create"}
//       primaryText={translate('pos.settings')}
//       leftIcon={<SettingsIcon />}
//       onClick={props.onClick}
//     />
//   );
// });

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
  const translate = useTranslate();
  return (
    <MenuItemLink
      ref={ref}
      to={`/profile/${sessionStorage.getItem('companyid')}`}
      primaryText={translate('pos.profile')}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
    />
  );
});

const CustomUserMenu = (props: any) => {
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();
  React.useEffect(() => {
    if('token' in sessionStorage){
    dataProvider.getOne('profile', { id: sessionStorage.getItem('companyid') })
      .then((response: any) => {
        if (response.data == null) {
          redirect('/login');
        }
        else {
          setValue(response.data.first_name)
          setValue1(response.data.account_type)
        }
      })}
  }, []);


  return (
    <Fragment>
      <div> <span> {sessionStorage.getItem('firstname') == null ? value : sessionStorage.getItem('firstname')}
            ({sessionStorage.getItem('acctype') == null ? value1 : sessionStorage.getItem('acctype')}) </span></div>
      <UserMenu label={sessionStorage.getItem('firstname') == null ? value : sessionStorage.getItem('firstname')}  {...props}>
        <ConfigurationMenu />
        {/* <Settings /> */}
      </UserMenu>
    </Fragment>
  );
};

const CustomAppBar = (props: any) => {
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const [state, setState] = React.useState(false);
  const [temp,settemp] = React.useState(false);
  const [notifi,setnotifi]:any = React.useState('');
  
    

  return (
    <div>
      <AppBar {...props} userMenu={<CustomUserMenu />}>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
          id="react-admin-title"
        />
        <Logo />
        <span className={classes.spacer} />

       

      </AppBar>

    </div>
  );
};

export default CustomAppBar;
