import styleConstants from '../styleConstants'; 

const styles = {
    container: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    button: {
        padding: 16,
        margin: 16,
        borderRadius: '50%',
        borderWidth: 8,
        borderColor: styleConstants.white,
        backgroundColor: 'transparent',
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    icon: {
        fontSize: 48,
        color: styleConstants.white,
    },
};

export default styles;
