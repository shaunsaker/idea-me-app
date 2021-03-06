import React from 'react';
import { AppRegistry } from 'react-native';
import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';

import { store } from './store';
import Scenes from './routes';

// Connect router to store
const ConnectedRouter = connect()(Router);

export default function Init() {
    class ideaMeApp extends React.Component {
        render() {
            return (
                <Provider store={store}>
                    <ConnectedRouter scenes={Scenes} />
                </Provider>
            );
        }
    }

    AppRegistry.registerComponent('ideaMeApp', () => ideaMeApp);
}
