import React from 'react';
import {
	Actions,
	ActionConst,
	Scene,
} from 'react-native-router-flux';

import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
import SignInOptions from './pages/SignInOptions';
import SignInWithEmail from './pages/SignInWithEmail';
import ForgotPassword from './pages/ForgotPassword';
import Ideas from './pages/Ideas';
import AddIdea from './pages/AddIdea';
import EditIdea from './pages/EditIdea';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';

const Scenes = Actions.create(
	<Scene key='root' hideNavBar={true}>
		<Scene
			key='splash'
			component={Splash}
			initial={false} />
		<Scene
			key='welcome'
			component={Welcome}
			type={ActionConst.RESET} />
		<Scene
			key='signInOptions'
			component={SignInOptions} />
		<Scene
			key='signInWithEmail'
			component={SignInWithEmail} />
		<Scene
			key='forgotPassword'
			component={ForgotPassword} />
		<Scene
			key='ideas'
			component={Ideas}
			initial={true}
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