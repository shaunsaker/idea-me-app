import React from 'react';
import {
	Actions,
	ActionConst,
	Scene,
} from 'react-native-router-flux';

import RequireAuth from './components/RequireAuth';

import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
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
			component={RequireAuth(Splash)}
			initial={true} />
		<Scene
			key='welcome'
			component={Welcome}
			initial={false}
			type={ActionConst.RESET} />
		<Scene
			key='signIn'
			component={SignIn} />
		<Scene
			key='ideas'
			component={Ideas}
			type={ActionConst.REPLACE} />
		<Scene
			key='addIdea'
			component={AddIdea} />
		<Scene
			key='editIdea'
			component={EditIdea} />
		<Scene
			key='categories'
			component={Categories} />
		<Scene
			key='addCategory'
			component={AddCategory} />
	</Scene>
)

export default Scenes;