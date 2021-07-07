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
    useDataProvider,
    AutocompleteInput
} from 'react-admin';

import { useForm } from 'react-final-form'

import { useFormState } from 'react-final-form';

const AuthUserRef = props => {
    const form = useForm();
    const dataProvider = useDataProvider();

    return (
        <ReferenceInput {...props} label="Authorized Person Id" source="authorizedPersonId" reference="user" perPage={100} 
            // filterToQuery={searchText => ({$or: [{firstname: {$regex: ".*" + searchText + ".*"}}, {lastname: {$regex: ".*" + searchText + ".*"}}] })} 
                onChange={(e) => {
                    // const { values } = useFormState();
                    e.preventDefault()
                   
                    // values.authorizedPerson=values.authorizedPersonId
                    console.log(e)
                    dataProvider.getOne('user', {id: e.target.value}).then(({data}) => {
                        console.log(data)

                        form.change("authorizedPerson", data.firstname + " " + data.lastname)
                    })

                    
                    return true
            }}
                >
                    {/* <AutocompleteInput optionValue="uid" optionText={ r => r.firstname +  " " + r.lastname} /> */}
                <SelectInput 
                {...props}
                 optionText={record=> record.firstname + " " + record.lastname}
                     />
            </ReferenceInput>
    )
}

export default AuthUserRef