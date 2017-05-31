import { 
    StyleSheet,
    Dimensions,
} from 'react-native';
import styleConstants from '../styleConstants';

const windowWidth = Dimensions.get('window').width; 

const styles = StyleSheet.create({
    categoriesWrapper: {
        flex: 1,
        paddingVertical: 16,
        marginBottom: 16,
    },
    categoriesContainer: {
        paddingBottom: 16,
    },
    categoryItem: {   
        width: windowWidth - 32,     
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 8,
        paddingHorizontal: 16,
        flexWrap: 'wrap',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: styleConstants.grey,
        backgroundColor: styleConstants.white,
    },
    categoryText: {
        fontSize: 18,
        color: styleConstants.primary,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: styleConstants.white,
        backgroundColor: styleConstants.grey,
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
});

export default styles;
