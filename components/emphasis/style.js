import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343333',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  blocos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  produtosEmDestaques: {
    width: '48%', // Largura ajustada para permitir uma pequena folga entre os produtos
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10, // Adicionado um pequeno preenchimento interno para melhor visualização
    alignItems: 'center',
    overflow: 'hidden', // Garante que os produtos não ultrapassem seus contêineres
  },
  descricao: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  preco: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

