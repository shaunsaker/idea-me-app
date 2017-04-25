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
        borderWidth: 1,
        borderColor: styleConstants.grey,
        backgroundColor: styleConstants.white,
    },
    categoryTextContainer: {

    },
    categoryText: {
        fontSize: 16,
        color: styleConstants.secondary,
    },
};

export default styles;
