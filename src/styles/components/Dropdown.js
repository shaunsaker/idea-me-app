import styleConstants from '../styleConstants'; 

const styles = {
    dropdownButton: {
        width: 200,
        fontSize: 18,
        borderRadius: 32,
        marginBottom: 16,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        width: 280
    },
    dropdownItem: {
        fontSize: 18,
        textAlign: 'center',
        width: 280
    },
    dropdownItemAdd: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: styleConstants.blue
    },
    editIcon: {
        marginRight: 16,
        marginBottom: 4,
    }
};

export default styles;
