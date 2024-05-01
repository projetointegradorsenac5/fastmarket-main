import { StyleSheet } from "react-native";

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
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },

    blocos: {
        flexDirection: 'row', // Organiza os produtos em linha
        flexWrap: 'wrap', // Permite que os produtos quebrem para a próxima linha quando não houver espaço suficiente
        justifyContent: 'space-between', // Distribui os produtos uniformemente na linha
    
    },
    produtosEmDestaques: {
        width: '49%', // Define a largura de cada produto como 48% do contêiner pai para criar uma grade
        marginBottom: 10, // Adiciona margem inferior entre os produtos
        backgroundColor: '#f0f0f0', // Cor de fundo para destacar os produtos
        borderRadius: 10, // Adiciona cantos arredondados aos produtos
        padding: 0, // Adiciona preenchimento interno aos produtos
        alignItems: 'center', // Centraliza o conteúdo dos produtos horizontalmente
        overflow: 'hidden'
    
    
    },

    descricao:{
backgroundColor: 'purple',
width: 170,
height: 50,
    },

text: {
    padding: 2,
    fontSize: 11,
    alignItems: 'center',
    color: 'white',
},

preco:{
padding: 1,
position: 'relative',
bottom: 4,
color: 'white',
}

});
