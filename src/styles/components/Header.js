import styleConstants from '../styleConstants'; 

const styles = {
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        paddingTop: 16,
    },
    leftIcon: {
        position: 'absolute',
        left: 0
    },
    rightIcon: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginRight: 12,
        marginBottom: 8,
        width: 36,
        height: 36
    },
    title: {
        fontSize: 24
    },
};

export default styles;
