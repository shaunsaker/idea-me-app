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
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import EditLocation from './pages/EditLocation';

const Scenes = Actions.create(
	<Scene key='root' hideNavBar>
		<Scene
			key='splash'
			component={Splash}
			initial={true} />
		<Scene
			key='welcome'
			component={Welcome}
			type={ActionConst.REPLACE}
			initial={false} />
		<Scene
			key='signInOptions'
			component={SignInOptions}
			initial={false} />
		<Scene
			key='signInWithEmail'
			component={SignInWithEmail}
			initial={false} />
		<Scene
			key='forgotPassword'
			component={ForgotPassword}
			initial={false} />
		<Scene
			key='ideas'
			component={Ideas}
			type={ActionConst.REPLACE}
			initial={false} />
		<Scene
			key='addIdea'
			component={AddIdea}
			initial={false} />
		<Scene
			key='editIdea'
			component={EditIdea}
			initial={false} />
		<Scene
			key='categories'
			component={Categories} 
			initial={false} />
		<Scene
			key='addCategory'
			component={AddCategory}
			initial={false} />
		<Scene
			key='profile'
			component={Profile}
			initial={false}
			type={ActionConst.REPLACE} />
		<Scene
			key='editProfile'
			component={EditProfile}
			initial={false} />
		<Scene
			key='editLocation'
			component={EditLocation}
			initial={false} />
	</Scene>
)

export default Scenes;