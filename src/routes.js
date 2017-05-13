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
import OctIcon from 'react-native-vector-icons/Octicons';
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

const TabIcon = ({ selected, title }) => {
    if (title === 'IdeasTab') {
        return (
            <View style={tabBarStyles.iconContainer}>
                <OctIcon
                    name='light-bulb'
                    size={24}
                    color={selected ? styleConstants.secondary : styleConstants.primary} />
            </View>
        );
    }
    else if (title === 'AddIdeaTab') {
        return (
            <View style={tabBarStyles.iconContainer}>
                <MaterialIcon
                    name='add'
                    size={28}
                    color={selected ? styleConstants.secondary : styleConstants.primary} />
            </View>
        );  
    }
}

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
				tabs={true}
				tabBarStyle={tabBarStyles.container}
				tabBarIconContainerStyle={tabBarStyles.iconContainer}>
				<Scene key="ideasTab" title="IdeasTab" icon={TabIcon}>
					<Scene
						key='ideas'
						title='Idea Me'
						component={Ideas}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]}
						renderBackButton={() => null} />
				</Scene>
				<Scene key="addIdeaTab" title="AddIdeaTab" icon={TabIcon}>
					<Scene
						key='addIdea'
						title='Add Your Idea'
						component={AddIdea}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]} />
				</Scene>
				{/*<Scene key="profileTab" title="ProfileTab" icon={TabIcon} initial={true}>
					<Scene
						key='profile'
						title='Profile'
						component={Profile}
						navigationBarStyle={navBarContainerStyles}
						titleStyle={[navBarStyles.text, styleConstants.ranga]}
						renderRightButton={() => menuIcon} />
				</Scene>*/}
			</Scene>
        </Scene>
        {/*<Scene key='editIdea' title='Edit Idea' component={EditIdea} />
        <Scene key='categories' title='Categories' component={Categories} />
        <Scene key='addCategory' title='Add Category' component={AddCategory} />*/}
	</Scene>
)

export default Scenes;