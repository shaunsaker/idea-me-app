import Firestack from 'react-native-firestack';

const firestack = new Firestack();

firestack.database.setPersistence(true);

export default firestack;
