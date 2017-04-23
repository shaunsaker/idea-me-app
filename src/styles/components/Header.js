import styleConstants from '../styleConstants'; 

const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        margin: 'auto',
        marginTop: 16,
        width: '100%',
    },
    leftIcon: {
        color: styleConstants.white,
        fontSize: 36,
        position: 'absolute',
        left: 0
    },
    rightIcon: {
        color: styleConstants.white,
        fontSize: 36,
        position: 'absolute',
        right: 0,
        top: 0
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginRight: 12,
        marginBottom: 8
    },
    title: {
        fontSize: 36
    },
    subtitle: {
        fontSize: 24
    },
};

export default styles;
