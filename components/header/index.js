import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import { AuthenticatedUserContext } from '../../providers';

const Header = () => {
  const { user } = useContext(AuthenticatedUserContext); // Assumindo que o contexto fornece informações sobre o usuário, incluindo o nome e a foto

  return (
    <View style={styles.container}>
      <Image source={{uri: user.photo_url}} style={styles.photo} />
      <Text style={styles.greeting}>Olá, {user.name}</Text>
    </View>
  );
};

export default Header;
