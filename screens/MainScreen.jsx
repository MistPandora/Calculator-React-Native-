import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Keyboard } from 'react-native';
import { Button } from '../components';
import { buttons } from '../data/padContent';
import { useRef, useState } from 'react';
import getResult from '../modules/getResult';


export default function MainScreen() {

    const [entries, setEntries] = useState("");
    const [result, setResult] = useState("");
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
    const inputRef = useRef(null);

    Keyboard.isVisible = false;
    inputRef.current && inputRef.current.focus();

    const handlePress = (e) => {

        switch (e) {
            case "=":
                setEntries(entries => getResult(entries));
                break;
            case "delete":
                setEntries(entries => entries.substring(0, cursorPosition.start - 1) + entries.substring(cursorPosition.end));
                setCursorPosition(position => {
                    const { start, end } = position;
                    return { start: start > 0 ? start - 1 : 0, end: end > 0 ? end - 1 : 0 }
                })
                break;

            case "C":
                setEntries("");
                setCursorPosition(() => {
                    return { start: 0, end: 0 }
                })
                break;

            default:
                setEntries(entries => {
                    const newEntries = entries.slice(0, cursorPosition.start) + e + entries.slice(cursorPosition.end);
                    setResult(getResult(newEntries));
                    return newEntries
                });
                setCursorPosition(position => {
                    const { start, end } = position;
                    return { start: start + 1, end: end + 1 }
                })
        };
    }

    const buttonsElements = buttons.map(button => <Button key={button.id} id={button.id} content={button.content} color={button.color} handlePress={handlePress} />)

    const handleSelectionChange = ({ nativeEvent: { selection } }) => {
        setCursorPosition(selection);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={mainColor}
            />
            <View style={styles.screen}>
                <TextInput
                    ref={inputRef}
                    style={styles.entries}
                    onChangeText={setEntries}
                    value={entries}
                    cursorColor="#eec523"
                    autoFocus={true}
                    showSoftInputOnFocus={false}
                    selection={cursorPosition}
                    onSelectionChange={handleSelectionChange}
                />
                <Text style={styles.result}>
                    {result}
                </Text>

            </View>
            <View style={styles.keypad}>
                <View style={styles.keysBlock}>
                    {buttonsElements}
                </View>
            </View>
        </SafeAreaView>
    );
}

const mainColor = "#063906";
const keypadColor = "#0a530a";
const textColor = "#fff";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 10,
        backgroundColor: mainColor,
    },
    screen: {
        justifyContent: "center",
        rowGap: 30,
        width: "100%",
        height: "30%",
        paddingHorizontal: 20,
    },
    keypad: {
        alignItems: "center",
        justifyContent: "center",
        height: "70%",
        padding: 15,
        backgroundColor: keypadColor,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    keysBlock: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        gap: 10,
        height: "100%",
        width: "100%",
    },
    text: {
        color: textColor
    },
    entries: {
        textAlign: "right",
        color: textColor,
        fontSize: 36
    },
    result: {
        textAlign: "right",
        color: "grey",
        fontSize: 26
    }
});
