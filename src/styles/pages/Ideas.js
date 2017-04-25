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
        paddingTop: 72,
        backgroundColor: styleConstants.primary
    },
    infoContainer: {
        
    },
    ideasContainer: {
        flex: 1,
    },
    ideaItem: {        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        marginBottom: 8,
        padding: 16,
        flexWrap: 'wrap',
        backgroundColor: styleConstants.white,
        // borderRadius: 32,
        // boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },
    textContainer: {
        
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1
    },
    ideaTextTitle: {
        fontSize: 18,
        flex: 1
    },
    ideaTextDescription: {
        fontSize: 16,
        color: styleConstants.grey,
        flex: 2
    },
    ideaChip: {
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: styleConstants.primary,
        color: styleConstants.white,
        // borderRadius: 32,
        marginLeft: 16,
        // boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24)',
    },
    priority: {
        fontWeight: 700,        
        flexDirection: 'row',
        justifyContent: 'center',
        width: 41,
        height: 41,
        backgroundColor: styleConstants.white,
        color: styleConstants.primary
    },
    labelsContainer: {        
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    editIcon: {
        color: styleConstants.primary,
        backgroundColor: styleConstants.white,
        padding: 8,
        // borderRadius: '50%',
        fontSize: 41,
        marginLeft: 16,
        minWidth: 41,
        // boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    deleteIcon: {
        color: styleConstants.grey,
        backgroundColor: styleConstants.white,
        padding: 8,
        // borderRadius: '50%',
        fontSize: 41,
        marginLeft: 16,
        minWidth: 41,
        // boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    footer: {
        position: 'absolute',
        bottom: 0
    }
};

export default styles;
