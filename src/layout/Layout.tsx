import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Sidebar,setSidebarVisibility } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { darkTheme, lightTheme } from './themes';
import { AppState } from '../types';
import { useEffect } from 'react';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
    const theme = useSelector((state: AppState) =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setSidebarVisibility(false));
    // });
    
    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={CustomSidebar}
            menu={Menu}
            theme={theme}
        />
    );
};
