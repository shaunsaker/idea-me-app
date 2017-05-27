import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,       
        justifyContent: 'space-between', 
        backgroundColor: styleConstants.lightGrey,
    },
    buttonContainer: {
        marginTop: 16,
        marginBottom: 8,
        alignItems: 'center',
    },
    ideasContainer: {
        flex: 1,
        width: windowWidth,
    },
});

export default styles;
