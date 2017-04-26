import styleConstants from '../styleConstants'; 

const styles = {
    button: {        
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        borderRadius: 40,
        backgroundColor: styleConstants.primary,
        width: 280,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        height: 68,
    },
    buttonText: {
        fontSize: 24,
        color: styleConstants.white,
        paddingHorizontal: 4,
    }
};

export default styles;
