// in src/users.js
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Create,
    Filter,
    SimpleList,
    useRecordContext,
    useCreateController,
    FormDataConsumer,
    useGetOne,
    useDataProvider
} from 'react-admin';


import { useMediaQuery } from '@material-ui/core';
import AuthUserRef from "./create/fields/authorizedPersonId";

export const TechSupportList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={<TechSupportFilter />}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.firstname}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="customerTitle" />
                    <TextField source="authorizedPerson" />
                    <TextField source="serviceStartDate" />
                    <TextField source="serviceEndDate" />
                    <TextField source="duration" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export const TechSupportEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput  source="customerTitle" />
            <TextInput  source="address" />
            <TextInput  source="tel" />
            <TextInput  source="emails" />
            <ReferenceInput label="Authorized Person Id" source="authorizedPersonId" reference="user">
                <SelectInput source="firstname" />
            </ReferenceInput>
            <TextInput  source="authorizedPerson" />
            <TextInput  source="requestDate" />
            <TextInput  source="serviceStartDate" />
            <TextInput  source="serviceEndDate" />
            <TextInput  source="serviceType" />
            <TextInput  source="scope" />
            <TextInput  source="serviceDefinition" />
            <TextInput  source="usedMaterial" />
            <TextInput  source="contracted" />
            <TextInput  source="serviceDescription" />
            <TextInput  source="duration" />
            <TextInput  source="pricing" />
        </SimpleForm>
    </Edit>
);



export const TechSupportCreate = props => {
    const controllerProps = useCreateController(props);
    

    return <Create {...props} {...controllerProps}>
        <SimpleForm>
            <TextInput source="customerTitle" />
            <TextInput source="address" />
            <TextInput source="tel" />
            <TextInput source="emails" />
            <AuthUserRef source="authorizedPersonId" {...props} {...controllerProps} />
            
            <TextInput source="authorizedPerson" />
            <TextInput source="requestDate" />
            <TextInput source="serviceStartDate" />
            <TextInput source="serviceEndDate" />
            <TextInput source="serviceType" />
            <TextInput source="scope" />
            <TextInput source="serviceDefinition" />
            <TextInput source="usedMaterial" />
            <TextInput source="contracted" />
            <TextInput source="serviceDescription" />
            <TextInput source="duration" />
            <TextInput source="pricing" />
        </SimpleForm>
    </Create>
};

const TechSupportFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Customer Title" source="customerTitle" allowEmpty />
        <TextInput label="Address" source="address" allowEmpty />
        <TextInput label="Tel" source="tel" allowEmpty />
        <TextInput label="E-mails" source="emails" allowEmpty />
        <TextInput label="Authorized Person Id" source="authorizedPersonId" allowEmpty />
        <TextInput label="Authorized Person" source="authorizedPerson" allowEmpty />
        <TextInput label="Request Date" source="requestDate" allowEmpty />
        <TextInput label="Service Start Date" source="serviceStartDate" allowEmpty />
        <TextInput label="Service End Date" source="serviceEndDate" allowEmpty />
        <TextInput label="Service Type" source="serviceType" allowEmpty />
        <TextInput label="Scope" source="scope" allowEmpty />
        <TextInput label="Service Definition" source="serviceDefinition" allowEmpty />
        <TextInput label="Used Material" source="usedMaterial" allowEmpty />
        <TextInput label="Contracted" source="contracted" allowEmpty />
        <TextInput label="Service Description" source="serviceDescription" allowEmpty />
        <TextInput label="Duration" source="duration" allowEmpty />
        <TextInput label="Pricing" source="pricing" allowEmpty />
    </Filter>
);