import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function Button(props) {

    const id = props.id;
    const content = props.content;
    const color = props.color;

    const containerStyle = id === "=" ? styles.equalContainer : styles.container;
    const underlayColor = id === "=" ? "#997d0f" : "#052b05";

    const handlePress = (e) => {
        props.handlePress(e);
    }

    return (
        <TouchableHighlight
            style={[containerStyle, styles.shadowsProp]}
            activeOpacity={1}
            underlayColor={underlayColor}
            onPress={() => handlePress(id)}
        >
            <Text style={[styles.content, color && { color }]}>{content}</Text>
        </TouchableHighlight>
    );
}

const mainColor = "#063906";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        width: 65,
        backgroundColor: mainColor,
        borderRadius: 50,

    },
    equalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 140,
        width: 65,
        backgroundColor: "#c6a00d",
        borderRadius: 50,
    },
    content: {
        color: "#fff",
        fontSize: 24
    },
    shadowsProp: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
});
