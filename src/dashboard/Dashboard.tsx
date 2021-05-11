import React, {
    useState,
    useEffect,
    useCallback,
    FC,
    CSSProperties,
} from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';

// import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';

import NewCustomers from './NewCustomers';

import { Customer, Order, Tracking, Transport_order,ProformaInvoice } from '../types';

interface OrderStats {
    revenue: number;
    nbNewOrders: number;
    pendingOrders: Order[];
}
interface TransportStatus {
    shippingStatus: Transport[];
}
interface CustomerData {
    [key: string]: Customer;
}

interface State {
    nbNewOrders?: number;
    nbTrackingStatus?: number;
    nbTransportInitiate?: number;
    nbTransportComplete?: number;
    nbTransportOnloading?: number;
    pendingOrders?: Order[];
    pendingOrdersCustomers?: CustomerData;
    transportStatusInitiate?: Transport_order[];
    transportStatusComplete?: Transport_order[];
    transportStatusOnloading?: Transport_order[];
    proformainvoiceStatus?: ProformaInvoice[];

    proforma_invoice?: Transport_order[];
    trackingStatus?: Tracking[];
    pendingReviewsCustomers?: CustomerData;
    revenue?: number;
}

const styles = {
    // flex: { display: 'flex' ,width: '100%'},
    // flexColumn: { display: 'flex', flexDirection: 'column' },
    // leftCol: {  marginRight: '1em' },
    // rightCol: {  marginLeft: '1em' },
    // singleCol: { marginTop: '2em', marginBottom: '2em' },
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em', display:'inline-block' }} />;

const Dashboard: FC = () => {
    const [state, setState] = useState<State>({});
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );

    // const fetchOrders = useCallback(async () => {
    //     const aMonthAgo = new Date();
    //     aMonthAgo.setDate(aMonthAgo.getDate() - 30);
    //     const { data: recentOrders } = await dataProvider.getList('commands', {
    //         filter: { date_gte: aMonthAgo.toISOString() },
    //         sort: { field: 'date', order: 'DESC' },
    //         pagination: { page: 1, perPage: 50 },
    //     });
    //     const aggregations = recentOrders
    //         .filter((order: Order) => order.status !== 'cancelled')
    //         .reduce(
    //             (stats: OrderStats, order: Order) => {
    //                 if (order.status !== 'cancelled') {
    //                     stats.revenue += order.total;
    //                     stats.nbNewOrders++;
    //                 }
    //                 if (order.status === 'ordered') {
    //                     stats.pendingOrders.push(order);
    //                 }
    //                 return stats;
    //             },
    //             {
    //                 revenue: 0,
    //                 nbNewOrders: 0,
    //                 pendingOrders: [],
    //             }
    //         );
    //     setState(state => ({
    //         ...state,
    //         revenue: aggregations.revenue.toLocaleString(undefined, {
    //             style: 'currency',
    //             currency: 'USD',
    //             minimumFractionDigits: 0,
    //             maximumFractionDigits: 0,
    //         }),
    //         nbNewOrders: aggregations.nbNewOrders,
    //         pendingOrders: aggregations.pendingOrders,
    //     }));
    //     const { data: customers } = await dataProvider.getMany('customers', {
    //         ids: aggregations.pendingOrders.map(
    //             (order: Order) => order.customer_id
    //         ),
    //     });
    //     setState(state => ({
    //         ...state,
    //         pendingOrdersCustomers: customers.reduce(
    //             (prev: CustomerData, customer: Customer) => {
    //                 prev[customer.id] = customer; // eslint-disable-line no-param-reassign
    //                 return prev;
    //             },
    //             {}
    //         ),
    //     }));
    // }, [dataProvider]);
    const fetchReviews = useCallback(async () => {
        if('token' in sessionStorage){
        const { data: shipment_status } = await dataProvider.getList('reference/dashboard/Tracking', {
            filter: { shipment_status: '2' },
            sort: { field: 'bl_number', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        });
        const nbTrackingStatus = shipment_status.reduce((nb: number) => ++nb, 0);
        const trackingStatus = shipment_status.slice(0, Math.min(3, shipment_status.length));
        setState(state => ({ ...state, trackingStatus, nbTrackingStatus }));
        // const { data: customers } = await dataProvider.getMany('customers', {
        //     ids: trackingStatus.map((status: Tracking) => review.customer_id),
        // });
        setState(state => ({
            ...state,
            // pendingReviewsCustomers: customers.reduce(
            //     (prev: CustomerData, customer: Customer) => {
            //         prev[customer.id] = customer; // eslint-disable-line no-param-reassign
            //         return prev;
            //     },
            //     {}
            // ),
        }));
    }}, [dataProvider]);

    const fetchStatus1 = useCallback(async () => {
        if('token' in sessionStorage){
        const { data: shipment_status } = await dataProvider.getList('reference/dashboard/transport_order', {
            filter: { shipment_status: '0' },
            sort: { field: 'invoice_number', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        });
        // const aggregations = shipment_status
        // .filter((transport: Transport) => transport.status !== '0')
        const nbTransportInitiate = shipment_status.reduce((nb: number) => ++nb, 0);
        const transportStatusInitiate = shipment_status.slice(0, Math.min(3, shipment_status.length));
        setState(state => ({ ...state, transportStatusInitiate, nbTransportInitiate }));

     } }, [dataProvider]);

    const fetchStatus2 = useCallback(async () => {
        if('token' in sessionStorage){
        const { data: shipment_status } = await dataProvider.getList('reference/dashboard/transport_order', {
            filter: { shipment_status: '6' },
            sort: { field: 'invoice_number', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        });
        const nbTransportComplete = shipment_status.reduce((nb: number) => ++nb, 0);
        const transportStatusComplete = shipment_status.slice(0, Math.min(3, shipment_status.length));
        setState(state => ({ ...state, transportStatusComplete, nbTransportComplete }));

    }}, [dataProvider]);

    const fetchStatus3 = useCallback(async () => {
        if('token' in sessionStorage){
        const { data: shipment_status } = await dataProvider.getList('reference/dashboard/transport_order', {
            filter: { shipment_status:'3' },
            sort: { field: 'invoice_number', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        });
        const nbTransportOnloading = shipment_status.reduce((nb: number) => ++nb, 0);
        const transportStatusOnloading = shipment_status.slice(0, Math.min(3, shipment_status.length));
        setState(state => ({ ...state, transportStatusOnloading, nbTransportOnloading }));

    }}, [dataProvider]);

    const fetchStatus4 = useCallback(async () => {
        if('token' in sessionStorage){
        const { data: invoice_number } = await dataProvider.getList('proforma_invoice/proforma_list', {
            // filter: { shipment_status: '0' },
            sort: { field: 'invoice_number', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        });
        // const aggregations = shipment_status
        // .filter((transport: Transport) => transport.status !== '0')
        // const nbTransportInitiate = shipment_status.reduce((nb: number) => ++nb, 0);
        // const proformainvoiceStatus = shipment_status.slice(0, Math.min(3, shipment_status.length));
        const proformainvoiceStatus = invoice_number;
        setState(state => ({ ...state, proformainvoiceStatus }));

    }}, [dataProvider]);

    const [track, settrack] = React.useState(0);
    const [transport, settransport] = React.useState(0);

    useEffect(() => {
        if('token' in sessionStorage){
            dataProvider.getOne('module', { id: sessionStorage.getItem('userid') })
                .then((response: any) => {
                    if (response) {            
                        if (response.data.Orders) {
                            response.data.Orders.map((transport: any) => (transport.header == "Transport Order" ? settransport(1) : null))
                            response.data.Orders.map((tracking: any) => (tracking.header == "Tracking" ? settrack(1) : null))
                        }
                    } }, [dataProvider]);
        // fetchOrders();
        fetchReviews();
        fetchStatus1();
        fetchStatus2();
        fetchStatus3();
        fetchStatus4();

     } }, [version,]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        nbNewOrders,
        nbTrackingStatus,
        nbTransportComplete,
        nbTransportInitiate,
        nbTransportOnloading,
        transportStatusInitiate,
        transportStatusComplete,
        transportStatusOnloading,
        proformainvoiceStatus,
        pendingOrders,
        pendingOrdersCustomers,
        trackingStatus,
        pendingReviewsCustomers,
        revenue,
    } = state;
    return isXSmall ? (
        <div>
           
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn as CSSProperties}>

         
        </div>
    ) : (
        <div>
            </div>
               
            );
};

export default Dashboard;
