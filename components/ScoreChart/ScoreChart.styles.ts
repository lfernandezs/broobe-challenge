import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    chartContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },

    score: {
        fontSize: 16,
        position: 'absolute',
        alignSelf: 'center',
    }
});

export default styles;