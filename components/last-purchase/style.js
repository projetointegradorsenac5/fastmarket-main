import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#27272a',
        padding: 20,
        borderRadius: 10,
        borderColor: '#27272a', // Adicionando borda preta
        borderWidth: 1, // Definindo largura da borda
    },

    ultimaCompra: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
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
        color: '#fff',
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
