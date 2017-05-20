import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.white,
        paddingBottom: 56
    },
});

export default styles;
