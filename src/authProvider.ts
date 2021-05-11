import decodeJwt from 'jwt-decode';
import { AuthProvider } from 'ra-core';
import { apiURL } from './dataProvider/rest'

const authProvider: AuthProvider = {
    login: ({ username, password}) => {
        const email = username;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('permissions');
        sessionStorage.removeItem('invoices_permission');
        sessionStorage.removeItem('po_permission');
        sessionStorage.removeItem('firstname');
        sessionStorage.removeItem('acctype');
        sessionStorage.removeItem('notification');
        sessionStorage.removeItem('insurance');
        sessionStorage.removeItem('userEmail');
        const request = new Request(apiURL + '/login/authenticate', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    return response.json().then((value:any)=>{
                        throw new Error(value.message);
                    })  
                }
                return response.json();
            })
            .then(({user,token }) => {
                //let decodedToken = { permissions : ''};
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('permissions', decodeJwt(token));
                sessionStorage.setItem('userid',user.id);
                sessionStorage.setItem('companyid',user.company_id);
                sessionStorage.setItem('firsttime_user',user.first_timeuser);
                sessionStorage.setItem('invoices_permission',user.invoices_permission);
                sessionStorage.setItem('po_permission',user.purchase_order_permission);
                sessionStorage.setItem('notification',"false");
                sessionStorage.setItem('userEmail',user.email);
                sessionStorage.setItem('insurance',user.insurance);
            });
    },
    logout: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('permissions');
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('companyid');
        sessionStorage.removeItem('firsttime_user');
        sessionStorage.removeItem('invoices_permission');
        sessionStorage.removeItem('po_permission');
        sessionStorage.removeItem('firstname');
        sessionStorage.removeItem('acctype');
        sessionStorage.removeItem('notification');
        sessionStorage.removeItem('insurance');
        return Promise.resolve();
    },
    checkError: error => {
        const status = error.status;
        if (status === 408) {
            sessionStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return sessionStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const role = sessionStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;