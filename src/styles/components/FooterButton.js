import styleConstants from '../styleConstants'; 

const styles = {
    button: {
        padding: 16,
        margin: 16,
        borderRadius: 32,
        backgroundColor: styleConstants.yellow,
        width: 280,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        height: 68
    },
    buttonText: {
        fontSize: 24,
    }
};

export default styles;
