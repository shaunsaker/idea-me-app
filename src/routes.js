import React from 'react';
import {
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { 
    Actions, 
    ActionConst, 
    Scene,
    Modal,
} from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import RequireAuth from './components/RequireAuth';

import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import Ideas from './pages/Ideas';
import AddIdea from './pages/AddIdea';
import EditIdea from './pages/EditIdea';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';

import tabBarStyles from './styles/components/TabBar';
import navBarStyles from './styles/components/NavBar';

import styleConstants from './styles/styleConstants';

const navBarContainerStyles = Platform.OS === 'ios' ?
	navBarStyles.containerIOS
	:
	navBarStyles.container;

const backIcon =
	<TouchableOpacity
		onPress={() => Actions.pop()}>
		<MaterialIcon
			name='chevron-left'
			color={styleConstants.white}
			size={36}
			style={{ marginTop: -6, marginLeft: -6 }} />
	</TouchableOpacity>;

const closeIcon =
	<TouchableOpacity
		onPress={() => Actions.pop()}>
		<MaterialIcon
			name='close'
			color={styleConstants.white}
			size={28}
			style={{ marginTop: -2}} />
	</TouchableOpacity>;

const Scenes = Actions.create(
	<Scene key='root'>
        <Scene 
            key='splash' 
            title='Splash' 
            component={RequireAuth(Splash)} 
            initial={true} 
            hideNavBar={true} />
		<Scene
			key='signIn'
			title='Sign In with Email'
			component={SignIn}
			navigationBarStyle={navBarContainerStyles}
			titleStyle={[navBarStyles.text, styleConstants.ranga]}
			leftButtonIconStyle={{ tintColor: styleConstants.white }} 
			hideNavBar={false} 
			type={ActionConst.RESET} 
			renderBackButton={() => backIcon} />
		<Scene key='app' component={Modal} type={ActionConst.REPLACE}>
			<Scene
				key="tabbar"
				tabs={false}
				tabBarStyle={tabBarStyles.container}
				tabBarIconContainerStyle={tabBarStyles.iconContainer}>
				<Scene key="ideasTab" title="IdeasTab">
					<Scene
						key='ideas'
						title='Idea Me'
						component={Ideas}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]}
						renderBackButton={() => null} />
				</Scene>
				<Scene key="addIdeaTab" title="AddIdeaTab">
					<Scene
						key='addIdea'
						title='Add Your Idea'
						component={AddIdea}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]} 
						type={ActionConst.PUSH} 
						renderBackButton={() => null} 
						renderRightButton={() => closeIcon}/>
				</Scene>
				<Scene key="editIdeaTab" title="EditIdeaTab">
					<Scene
						key='editIdea'
						title='Edit Your Idea'
						component={EditIdea}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]} 
						type={ActionConst.PUSH} 
						renderBackButton={() => null} 
						renderRightButton={() => closeIcon}/>
				</Scene>
				<Scene key="categoriesTab" title="CategoriesTab">
					<Scene
						key='categories'
						title='Categories'
						component={Categories}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]} 
						type={ActionConst.PUSH} 
						renderBackButton={() => backIcon} />
				</Scene>
				<Scene key="addCategoryTab" title="AddCategoryTab">
					<Scene
						key='addCategory'
						title='Add a Category'
						component={AddCategory}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]} 
						type={ActionConst.PUSH} 
						renderBackButton={() => null} 
						renderRightButton={() => closeIcon}/>
				</Scene>
			</Scene>
        </Scene>
	</Scene>
)

export default Scenes;