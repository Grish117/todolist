import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './configuration/Configuration';
import Segments from './segments/Segments';
import Form from './form/Form';
import Resend from './resend/Resend';
import ForgotPassword from './forgotpassword/ForgotPassword';
import Resetpassword from './resetpassword/Resetpassword';

export default [
    <Route exact path="/configuration" render={() => <Configuration />} />,
    <Route exact path="/segments" render={() => <Segments />} />,
    <Route exact path="/form/create" render={() => <Form />} />,
    <Route exact path="/login/resubmit" render={() => <Resend />} noLayout/>,
    <Route exact path="/login/forgotpassword" render={() => <ForgotPassword />} noLayout/>,
    <Route exact path="/login/passwordupdate" render={() => <Resetpassword />} noLayout/>,

];
