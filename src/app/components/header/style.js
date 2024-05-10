import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    alignItems: "center",
  },
  photo: {
    width: 60,
    aspectRatio: 1, // Mantém a proporção da imagem (largura / altura)
    borderRadius: 30, // Metade da largura da imagem
    marginRight: 10,
  },
  greeting: {
    fontSize: 20,
    marginLeft: 10,
    color: 'white', // Cor do texto
  },
});

export default styles;
