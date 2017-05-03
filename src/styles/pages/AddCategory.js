import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 56,
        backgroundColor: styleConstants.white
    },
    inputArea: {     
        flex: 1,   
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
