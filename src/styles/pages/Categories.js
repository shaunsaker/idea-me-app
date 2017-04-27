import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 56,
        backgroundColor: styleConstants.white
    },
    categoriesContainer: {
        flex: 1,
        marginBottom: 16,
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
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: styleConstants.white,
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
    }
});

export default styles;
