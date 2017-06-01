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
            paddingBottom: props.removeBottomPadding ? 0 : props.fauxFooter ? 0 : 16,
        }

    const fauxFooter = props.fauxFooter ? <View style={{height: 50}} /> : null;

    return (
        <View style={[styles.container, pageStyles]} >
            {props.children}
            {fauxFooter}
        </View>
    );
}