import styleConstants from '../styleConstants'; 

const styles = {
    errorMessageWrapper: {
        
        flexDirection: 'row',
        justifyContent: 'center'
    },
    errorMessageContainer: {
        position: 'absolute',
        bottom: 16,
        minWidth: 280,
        backgroundColor: styleConstants.clearBlack,
        paddingTop: 22,
        paddingBottom: 22,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 32,
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessageText: {
        fontSize: 18,
        textAlign: 'center',
        color: styleConstants.white
    },
    icon: {
        color: styleConstants.red,
        fontSize: 18,
        marginRight: 8
    }
};

export default styles;
