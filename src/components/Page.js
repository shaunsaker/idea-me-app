import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    }
});

export default Page = (props) => {
    const pageStyles = 
        {
            backgroundColor: props.backgroundColor ? props.backgroundColor : '#ffffff',
            justifyContent: props.justifyContent ? props.justifyContent : 'space-between',
            paddingBottom: props.fauxFooter ? 50 : props.removeBottomPadding ? 0 : 16,
        }

    return (
        <View style={[styles.container, pageStyles]} >
            {props.children}
        </View>
    );
}