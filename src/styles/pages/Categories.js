import styleConstants from '../styleConstants'; 

const styles = {
    container: {
        flex: 1,
        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 72,
        backgroundColor: styleConstants.primary
    },
    categoriesContainer: {
        flex: 1,
        marginBottom: 16
    },
    categoryItem: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 8,
        padding: 16,
        flexWrap: 'wrap',
        backgroundColor: styleConstants.white,
        borderRadius: 32,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    categoryTextContainer: {

    },
    categoryText: {
        fontSize: 18,
        flex: 1
    },
    deleteIcon: {
        color: styleConstants.grey,
        backgroundColor: styleConstants.white,
        padding: 8,
        // borderRadius: '50%',
        fontSize: 41,
        marginLeft: 16,
        minWidth: 41,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer'
    }
};

export default styles;
