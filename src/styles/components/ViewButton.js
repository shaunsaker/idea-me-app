import styleConstants from '../styleConstants'; 

const styles = {
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
        width: 96,
        height: 96
    },
    icon: {
        color: styleConstants.white,
    }
};

export default styles;
