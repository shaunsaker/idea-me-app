import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.white
    },
    categoriesContainer: {
        flex: 1,
        marginTop: 16,
    },
    categoryItem: {   
        width: 280,     
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexWrap: 'wrap',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: styleConstants.grey,
        backgroundColor: styleConstants.white,
    },
    categoryText: {
        fontSize: 16,
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
    }
});

export default styles;
