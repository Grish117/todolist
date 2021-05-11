import simpleRestProvider from '../apiCalls';
import { fetchUtils } from 'ra-core';
// import { cacheDataProviderProxy } from 'react-admin';
export const apiURL = "https://fdpapi.fdpconnect.com";

const httpHeaders = (url, options = {}) => {
    const token = sessionStorage.getItem('token');
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
        if (token) options.headers = new Headers({ Authorization: 'Bearer ' + token });
    }

    options.headers.set('X-Custom-Header', 'FDPConnectAPI V1');
    return fetchUtils.fetchJson(url, options);
}

const restProvider = simpleRestProvider(apiURL, httpHeaders);
// const mydataProvider = {
//     ...restProvider,
//     create: (resource, params) => {
//         if (resource !== "documents" || !params.data.files) {
//             return restProvider.create(resource, params);
//         }
//         const newfiles = params.data.files.filter(
//             p => p.rawFile instanceof File
//         );
//         const newfiles = params.data.files;
//         return Promise.all(newfiles.map(
//             (files, ind) => {
//                 let arr = [];
//                return Promise.all(files.file.map((file,index) =>(convertFileToBase64(file)).then(
//                         (file64) => {
//                             arr.push(
//                                 {
//                                     src: file64,
//                                     title: `${params.data.files[ind].file[index].title}`
//                                 });
//                             }
//                         )
//                 )).then(()=>

//                     ({
//                         document_type: files.document_type,
//                         file: arr
//                     })
//                 )
//             }

//         )) 
//         .then(transformedNewfiles => {
//                 // restProvider.create(resource, {
//                 //     ...params,
//                 //     data: {
//                 //         ...params.data,
//                 //         files:[ ...transformedNewfiles]
//                 //     },
//                 // })
//             }
//             ).catch(e=>
//                 console.log(e)
//             );
//     }
// }
// const convertFileToBase64 = file =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;

//         reader.readAsDataURL(file.rawFile);
//     });

const delayedDataProvider = new Proxy(restProvider, {
    get: (target, name, self) =>
        name === 'then'
            ? self
            : (resource, params) =>
                new Promise(resolve =>
                    setTimeout(
                        () => resolve(restProvider[name](resource, params)),
                        500
                    )
                ),
});

export default delayedDataProvider;
//export default cacheDataProviderProxy(mydataProvider);
