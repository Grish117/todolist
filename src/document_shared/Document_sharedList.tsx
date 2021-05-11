import React, { cloneElement } from 'react';
import { CreateButton, Datagrid, ExportButton, Filter, List,DateInput, sanitizeListRestProps,DateField, SearchInput, TextField, TextInput, TopToolbar, useDataProvider, useListContext } from 'react-admin';
import { RowPagination } from '../company/CompanyList';

const ListFilters = (props: any) => (
    <Filter {...props}>
        <SearchInput  source="q" alwaysOn />
        <TextInput source="to_email_address" label="SENT EMAIL ADDRESS"/> 
        <DateInput source="sent_date" label="SENT DATE"/>
        <TextInput source="file_name" label="DOCUMENT NAME"/>
    </Filter>
);

const ListActions = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const dataProvider = useDataProvider();
    // React.useEffect(() => {
    //     dataProvider.getOne('profile', { id: sessionStorage.getItem('companyid') })
    //         .then((response: any) => {

    //             if(response.data.account_type ==='SuperAdmin') {
    //                 setOpen(true);
    //             }
    //             else{
    //                 setOpen(false);
    //             }
    //         })
    //     },[sessionStorage.getItem('companyid')]);
    const { className, exporter, filters, maxResults, ...rest } = props;
    const { currentSort, resource, displayedFilters, filterValues, basePath, showFilter, total } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button', })}
            {/* {open ? <CreateButton label="CREATE REF" basePath={basePath} /> : null} */}
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} filterValues={filterValues} maxResults={maxResults} />
        </TopToolbar>
    );
};
const RowStyle = (record: any, index: any) => ({
    backgroundColor: index%2===0 ? 'white' : 'rgba(0,0,0,.05)',
});
const Document_sharedList = (props: any) => (
    <List {...props} filters={<ListFilters />} title="Shared Documents" pagination={<RowPagination />} perPage={25} bulkActionButtons={false} actions={<ListActions />}>
        <Datagrid rowStyle={RowStyle}>
            <TextField source="file_name" label="DOCUMENT NAME"/>
            <DateField  source="sent_date" showTime  options={{ day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric',second: 'numeric' , hour12: true }} label="SENT DATE"/>
            <TextField source="to_email_address" label="SENT EMAIL ADDRESS"/> 
        </Datagrid>
    </List>
);

export default Document_sharedList;
