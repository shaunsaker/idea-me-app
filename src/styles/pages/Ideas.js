import styleConstants from '../styleConstants'; 

const styles = {
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 92,
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: 720
    },
    ideasContainer: {
        flex: 1,
        width: '100%',
        overflow: 'auto',
        maxWidth: 720,
    },
    ideaItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        marginBottom: 8,
        padding: 16,
        flexWrap: 'wrap',
        backgroundColor: styleConstants.white,
        borderRadius: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },
    textContainer: {
        display: 'flex',
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
        backgroundColor: styleConstants.blue,
        color: styleConstants.white,
        borderRadius: 32,
        marginLeft: 16,
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24)',
    },
    priority: {
        fontWeight: 700,
        display: 'flex',
        justifyContent: 'center',
        width: 41,
        height: 41,
        backgroundColor: styleConstants.white,
        color: styleConstants.blue
    },
    labelsContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    editIcon: {
        color: styleConstants.blue,
        backgroundColor: styleConstants.white,
        padding: 8,
        borderRadius: '50%',
        fontSize: 41,
        marginLeft: 16,
        minWidth: 41,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer'
    },
    deleteIcon: {
        color: styleConstants.grey,
        backgroundColor: styleConstants.white,
        padding: 8,
        borderRadius: '50%',
        fontSize: 41,
        marginLeft: 16,
        minWidth: 41,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer'
    },
    footer: {
        position: 'absolute',
        bottom: 0
    }
};

export default styles;
