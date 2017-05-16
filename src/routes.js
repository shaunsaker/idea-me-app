import React from 'react';
import {
	Actions,
	ActionConst,
	Scene,
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
		<Scene
			key='splash'
			title='Splash'
			component={RequireAuth(Splash)}
			initial={true} />
		<Scene
			key='signIn'
			title='Sign In with Email'
			component={SignIn}
			type={ActionConst.RESET} />
		<Scene
			key='ideas'
			title='Idea Me'
			component={Ideas}
			type={ActionConst.REPLACE} />
		<Scene
			key='addIdea'
			title='Add Your Idea'
			component={AddIdea} />
		<Scene
			key='editIdea'
			title='Edit Your Idea'
			component={EditIdea} />
		<Scene
			key='categories'
			title='Categories'
			component={Categories} />
		<Scene
			key='addCategory'
			title='Add a Category'
			component={AddCategory} />
	</Scene>
)

export default Scenes;