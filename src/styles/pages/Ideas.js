import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

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
    infoContainer: {
        marginTop: 16,
        marginBottom: 8
    },
    ideasContainer: {
        flex: 1,
        width: windowWidth,
    },
    ideaItem: {   
        position: 'relative',
        width: windowWidth - 32,
        flex: 1,
        backgroundColor: styleConstants.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        marginTop: 8,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },  
    textContainer: {
        flex: 4,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 66,
    },
    ideaTextTitle: {
        fontSize: 28,
        color: styleConstants.primary,
        marginRight: 36,
    },
    ideaTextDescription: {
        fontSize: 16,
        color: styleConstants.grey,
        paddingTop: 8
    },
    labelsContainer: {      
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8
    },
    categoryChip: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.grey,
        borderRadius: 32,
        marginRight: 8
    },
    priorityChip: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.grey,
        borderRadius: 32,
    },
    text: {
        fontSize: 16,
        color: styleConstants.primary
    },
    footerButtonsContainer: {
        flexDirection: 'row',
    },
    shareIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.secondary,
        borderBottomLeftRadius: 16,
        height: 50,
    },
    editIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.primary,
        borderBottomRightRadius: 16,
        height: 50,
    },
    deleteIconContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
});

export default styles;
