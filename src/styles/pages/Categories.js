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
        backgroundColor: styleConstants.white,
        elevation: 2,
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
        fontSize: 16,
        color: styleConstants.secondary
    },
};

export default styles;
