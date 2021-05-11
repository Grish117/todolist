import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';


// Hari - Start your Customized Folders here
// Procedure : 
//     Step 1: Copy invoices folder into a new name (eg: contacts)
//     Step 2: Rename the folder to contacts (our example is to create - contacts)
//     Step 3: Rename InvoiceList.tsx to ContatList.tsx and InvoiceShow.tsx to ContactShow.tsx
//     Step 4: Open  index.ts , ContactShow.tsx and ContantList.tsx and change all Invoice to Contact (Case sensitve, please use Case)
//             While Replacing it, and be cautious
//     Step 5: Change the fields in ContactList and ContactShow to what ever the Field names are in the table.
//     Step 6: Open this file and add the import and Resources
//     Step 7: Open Menu.tsx and route.tsx and update the Route there (if needed).


/

const i18nProvider = polyglotI18nProvider((locale:any) => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

const App = () => {
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        let restoreFetch;

        const fetchDataProvider = async () => {
            const dataProviderInstance = await dataProviderFactory(
                process.env.REACT_APP_DATA_PROVIDER
            );
            setDataProvider(
                // GOTCHA: dataProviderInstance can be a function
                () => dataProviderInstance
            );
        };

        fetchDataProvider();

        return restoreFetch;
    }, []);

    if (!dataProvider) {
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <Admin
            title=""
            dataProvider={dataProvider}
            customReducers={{ theme: themeReducer }}
            customRoutes={customRoutes}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
        >
            

        </Admin>
    );
};

export default App;
