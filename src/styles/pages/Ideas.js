import { Dimensions } from "react-native";
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

const styles = {
    container: {
        flex: 1,        
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 56,
        backgroundColor: styleConstants.white
    },
    infoContainer: {
        marginBottom: 16
    },
    ideasContainer: {
        flex: 1,
        width: windowWidth,
        paddingHorizontal: 14,
    },
    ideaItem: {   
        backgroundColor: styleConstants.white,
        padding: 16,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: styleConstants.primary,
        marginBottom: 16,
        marginHorizontal: 2
    },
    textContainer: {        

    },  
    ideaTextTitle: {
        fontSize: 24,
        color: styleConstants.primary
    },
    ideaTextDescription: {
        fontSize: 16,
        color: styleConstants.grey
    },
    labelsContainer: {        
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8
    },
    ideaChip: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.primary,
        borderRadius: 32,
        height: 50,
        marginRight: 8
    },
    priorityChip: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.primary,
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    text: {
        fontSize: 16,
        color: styleConstants.primary
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: styleConstants.primary,
        marginLeft: 8,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    icon: {

    }
};

export default styles;
