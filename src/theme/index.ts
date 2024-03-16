import { StyleSheet } from "react-native"

export const theme = {
    backGround: "#eab308",
    text : "#eab308"
}

export const customStyles = StyleSheet.create ( {
    text: {
        color: theme.text,
    },
    backGround: {
        backgroundColor : theme.backGround
    }
})