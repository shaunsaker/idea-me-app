import React from 'react';
import {
    Platform
} from 'react-native';
import { 
    Actions, 
    ActionConst, 
    Scene 
} from 'react-native-router-flux';

import RequireAuth from './components/RequireAuth';

import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import Ideas from './pages/Ideas';
import AddIdea from './pages/AddIdea';
import EditIdea from './pages/EditIdea';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';

const Scenes = Actions.create(
	<Scene key='root' hideNavBar={true}>
        <Scene key='splash' title='Splash' component={RequireAuth(Splash)} initial={true} />
		<Scene key='ideas' title='Ideas' component={Ideas} />
        <Scene key='addIdea' title='Add Idea' component={AddIdea} />
        <Scene key='editIdea' title='Edit Idea' component={EditIdea} />
        <Scene key='categories' title='Categories' component={Categories} />
        <Scene key='addCategory' title='Add Category' component={AddCategory} />
		<Scene key='signIn' title='Sign In' component={SignIn} />
	</Scene>
)

export default Scenes;