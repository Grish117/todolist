import React, { FC, useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Theme,Typography } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useTranslate, DashboardMenuItem, MenuItemLink, useDataProvider } from 'react-admin';
import Badge from '@material-ui/core/Badge';

import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import GroupIcon from '@material-ui/icons/Group';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ClassIcon from '@material-ui/icons/Class';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ReceiptIcon from '@material-ui/icons/Receipt';

import SubMenu from './SubMenu';
import { AppState } from '../types';
import { branch } from 'recompose';
import { withStyles, makeStyles  } from '@material-ui/core/styles';
import ArchiveIcon from '@material-ui/icons/Archive';
import ListAltIcon from '@material-ui/icons/ListAlt';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers' | 'menuInvoice' | 'menuUsers'| 'menuInsurance' | 'menuPacking';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}
interface Ilinks {
    company: any;
    insurance:any;
    orders: any;
    invoices: any;
    miscellaneous: any;
    users: any;
    roles: any;
    new_users:any;
    packing:any;
}

const StyledBadge = withStyles((theme:any) => ({
    badge: {
      right: -12,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    // root: {
    //   '& > *': {
    //     margin: theme.spacing(1),
    //   },
    // },
    a: {
        '&:hover':{
            backgroundColor:'#757ce8',
            borderRadius:'2em'
        },
        backgroundColor:'white',
      
        }
  }));

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const classes = useStyles();
    const dataProvider = useDataProvider();
    const [state, setState] = useState({
        menuCatalog: false,
        menuSales: false,
        menuCustomers: false,
        menuInvoice: false,
        menuUsers: false,
        menuInsurance:false,
        menuPacking:false
    });
    const [links, setlinks] = useState<Ilinks>({
        company: [],
        insurance: [],
        orders: [],
        invoices: [],
        miscellaneous: [],
        users: [],
        roles: [],  
        new_users: [], 
        packing:[]      
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };
    useEffect(() => {
        if('token' in sessionStorage){
        dataProvider.getOne('module', { id: sessionStorage.getItem('userid') })
            .then((response:any) => response?response.data?setlinks({ company: response.data.Company,insurance: response.data.Insurance, orders: response.data.Orders, invoices: response.data.Invoices,packing: response.data.Packing, miscellaneous: response.data.Miscellaneous, new_users: response.data.Register_Users, users: response.data.Admin_Users, roles: response.data.Roles }):null:null);
    }}, []);
    return (
        <div style={{borderRadius:'1em'}}>
            {' '}

            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu>
               
                {/* <MenuItemLink
                    to={`/company`}
                    primaryText={"Company"}
                    leftIcon={<company.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/branches`}
                    primaryText={"Branches"}
                    leftIcon = {<branches.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/contact`}
                    primaryText={"Contacts"}
                    leftIcon={<contacts.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                /> */}
            </SubMenu> 
         
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                   
                />
            )}
         {/* {isXSmall && {logout } } */}
        </div>
    );
};

export default Menu;
