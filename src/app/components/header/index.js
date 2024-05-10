import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUserProvider';
import { Title } from '../../styled-components/text';

const Header = () => {
  const { user } = useContext(AuthenticatedUserContext); // Assumindo que o contexto fornece informações sobre o usuário, incluindo o nome e a foto

  return (
    <View style={styles.container}>
      <Image source={{uri: user.photo_url}} style={styles.photo} />
      <Title style={{ paddingBottom: 12 }}>Olá, {user.name}</Title>
    </View>
  );
};

export default Header;
