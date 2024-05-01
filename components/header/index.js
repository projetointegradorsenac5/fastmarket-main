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

      </View>
    </View>
  );
};



export default Header
