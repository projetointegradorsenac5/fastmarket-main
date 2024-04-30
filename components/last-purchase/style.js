import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    filho: {
        display: 'flex',
        flexDirection: 'row'

    },

    button: {
        marginTop: 10,
        backgroundColor: '#00FF00', // Cor verde
        borderRadius: 5,
        paddingVertical: 6, // Diminui o padding vertical para deixar o botão menor
        width: 100,
        alignItems: 'center',
        justifyContent: 'flex-end', // Alinha o botão à esquerda
    },
    
    
    buttonText: {
        color: '#fff',
        fontSize: 14, // Diminui o tamanho da fonte do texto do botão
    },
    
});
