import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
    },
    filho: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 26
    },

    button: {
        backgroundColor: '#00FF00',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'flex-end',
    },
    
    buttonText: {
        color: 'white',
        fontSize: 14,
    },

    description: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 30
    },

    image: {
        borderRadius: 5,
    },
});
