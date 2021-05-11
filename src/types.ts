import { ReduxState, Record, Identifier, useListController, } from 'ra-core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { ListControllerProps } from 'ra-core/esm/controller/useListController';
import { ReactChildren } from 'react';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Category extends Record {
    name: string;
}

export interface Product extends Record {
    category_id: Identifier;
    description: string;
    height: number;
    image: string;
    price: number;
    reference: string;
    stock: number;
    thumbnail: string;
    width: number;
}

export interface Customer extends Record {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    zipcode: string;
    avatar: string;
    birthday: string;
    first_seen: string;
    last_seen: string;
    has_ordered: boolean;
    latest_purchase: string;
    has_newsletter: boolean;
    groups: string[];
    nb_commands: number;
    total_spent: number;
}

export interface Company extends Record {
    company_name: string;
    company_phone: number;
    country:string;
}

export interface Country extends Record {
    country: string;
    
}

export interface Branch extends Record {
    name: string;
    
}

export interface Transport_order extends Record {
    po_number: string;
    container_number:string;
    shipment_status: number;
}

export interface Tracking extends Record {
    bl_number: string;
    shipment_status: number;
}

export interface Purchase_order extends Record {
    exporter_id: string;
    
}

export interface Insurance extends Record {
    seal_number: number;
    
}

export interface Documents extends Record {
    file_name: string;
    po_code:string;
    table_name:string;
    id:number;
}

export interface Containers extends Record {
    container_number: string;
    seal_number:string;
}

export interface Shipping_items extends Record {
    container_number: string;
    bl_number: string   
}

export interface Contact extends Record {
    first_name: string;
    last_name: string;
    
}

export interface Invites extends Record {
   to_email_address:string;
    
}

export interface Roles extends Record {
    role_id:number;
     
 }

 export interface Users extends Record {
    email:string;
     
 }

 export interface Po_orders extends Record {
    created_by:string;
    updated_by:string;
    po_code:string;

 }

export interface Order extends Record {
    basket: BasketItem[];
}
export interface Country extends Record {
    country_id: string;
    country: string;
}
export interface BasketItem {
    product_id: string;
    quantity: number;
}

/**
 * Types to eventually add in react-admin
 */
export interface FieldProps<T extends Record = Record> {
    addLabel?: boolean;
    label?: string;
    record?: T;
    source?: string;
}

export interface Review extends Record {
    customer_id: string;
}

type FilterClassKey = 'button' | 'form';

export interface FilterProps<Params = {}> {
    classes?: ClassNameMap<FilterClassKey>;
    context?: 'form' | 'button';
    displayedFilters?: { [K in keyof Params]?: boolean };
    filterValues?: Params;
    hideFilter?: ReturnType<typeof useListController>['hideFilter'];
    setFilters?: ReturnType<typeof useListController>['setFilters'];
    showFilter?: ReturnType<typeof useListController>['showFilter'];
    resource?: string;
}

export interface ReferenceFieldProps<T extends Record = Record>
    extends FieldProps<T> {
    reference: string;
    children: ReactChildren;
    link?: string | false;
    sortBy?: string;
}

export interface ProformaInvoice extends Record {
    product_code: number;
    exporter_id: number;
    buyer_id: number;
    status:number;
    invoice_number: string;
    products:string[];
    taxes:string[];
}

export interface CommercialInvoice extends Record {
    product_code: number;
    exporter_id: number;
    buyer_id: number;
    buyer: number;
    status:number;
    invoice_number: string;
    products:string[];
    taxes:string[];
}

export interface PurchaseOrderform extends Record {
    product_code: number;
    exporter_id: number;
    buyer_id: number;
    status:number;
    invoice_number: string;
    products:string[];
    taxes:string[];
}

export interface PackingList extends Record {
    product_code: number;
    exporter_id: number;
    buyer_id: number;
    buyer: number;
    status:number;
    invoice_number: string;
    products:string[];
    products_line:string[];
    taxes:string[];
}

export interface CertificateOrigin extends Record {
    products: [];
    
}


export interface Notification extends Record {
    invoice_number: string;
    receiver_email: string;
    invoice_doc: string;
    record_id: Number;
    created_date: string;
    comments: string;
    table_name: string;
}