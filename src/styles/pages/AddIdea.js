import styleConstants from '../styleConstants'; 

const styles = {
    container: {
        flex: 1,        
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 56,
        backgroundColor: styleConstants.primary
    },
    inputArea: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAreaContainer: {
        position: 'relative',
    },
    deleteContainer: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    delete: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: styleConstants.grey,
    }
};

export default styles;
