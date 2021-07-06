// in src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { UserList, UserEdit, UserCreate } from './user/user';
import { TechSupportList, TechSupportEdit, TechSupportCreate } from './techsupport/techsupport';

import { PostList, PostEdit, PostCreate } from './posts';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import customDataProvider from './customDataProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
  <Admin dashboard={Dashboard} dataProvider={customDataProvider} authProvider={authProvider}>
    {/* <Resource name="posts" list={PostList}  edit={PostEdit} create={PostCreate} icon={PostIcon} /> */}
    <Resource match={{id: "uid"}} 
      name="user" 
      list={UserList} 
      edit={UserEdit} 
      create={UserCreate} 
      icon={UserIcon} />

    <Resource match={{id: "uid"}} 
      name="techsupport" 
      list={TechSupportList} 
      edit={TechSupportEdit} 
      create={TechSupportCreate} 
      icon={ComputerIcon} />
  </Admin>
);
export default App;