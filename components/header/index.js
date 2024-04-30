import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

 const Header = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Perfil */}
        <View style={styles.profile}>
          {/* Adicione aqui a imagem do perfil */}
        </View>
        {/* Título */}
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>
    </View>
  );
};



export default Header
